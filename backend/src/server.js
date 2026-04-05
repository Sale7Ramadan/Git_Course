const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || '*';
const ENABLE_HTTPS = String(process.env.ENABLE_HTTPS || 'false').toLowerCase() === 'true';
const HTTPS_KEY_PATH = process.env.HTTPS_KEY_PATH;
const HTTPS_CERT_PATH = process.env.HTTPS_CERT_PATH;
const NODE_ENV = process.env.NODE_ENV || 'development';

const users = new Map();
const resources = new Map();

const auditDir = path.join(__dirname, '..', 'logs');
const auditFile = path.join(auditDir, 'audit.log');

if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

function writeAudit(event, data = {}) {
  const line = JSON.stringify({
    at: new Date().toISOString(),
    event,
    ...data
  });
  fs.appendFileSync(auditFile, `${line}\n`, 'utf8');
}

app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGIN === '*' ? true : ALLOWED_ORIGIN }));
app.use(express.json({ limit: '20kb' }));
app.use(morgan('combined'));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth requests. Please try again later.' }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api', apiLimiter);

function validateRegisterBody(req, res, next) {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email and password are required' });
  }

  if (typeof username !== 'string' || username.length < 3 || username.length > 32) {
    return res.status(400).json({ error: 'username must be 3-32 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'email is invalid' });
  }

  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return res.status(400).json({ error: 'password must be 8-128 characters' });
  }

  return next();
}

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden by role rules' });
    }

    return next();
  };
}

function enforceOwnership(req, res, next) {
  const { id } = req.params;
  const record = resources.get(id);

  if (!record) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  if (record.ownerId !== req.user.sub && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden by ownership policy' });
  }

  req.resource = record;
  return next();
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/register', authLimiter, validateRegisterBody, async (req, res) => {
  const { username, email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  if (users.has(normalizedEmail)) {
    writeAudit('register_failed', { reason: 'duplicate_email', email: normalizedEmail });
    return res.status(409).json({ error: 'email already registered' });
  }

  const userId = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(password, 12);

  const user = {
    id: userId,
    username,
    email: normalizedEmail,
    passwordHash,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  users.set(normalizedEmail, user);

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h', issuer: 'git-course-backend' }
  );

  const resourceId = crypto.randomUUID();
  resources.set(resourceId, {
    id: resourceId,
    ownerId: user.id,
    value: 'example owned resource'
  });

  writeAudit('register_success', { userId: user.id, email: user.email });

  return res.status(201).json({
    message: 'registered',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    sampleResourceId: resourceId
  });
});

app.get('/api/admin/rules-check', authenticateJWT, requireRole(['admin']), (_req, res) => {
  return res.json({ allowed: true, reason: 'admin role satisfied' });
});

app.get('/api/resources/:id', authenticateJWT, enforceOwnership, (req, res) => {
  return res.json({ resource: req.resource });
});

function startServer() {
  if (ENABLE_HTTPS) {
    if (!HTTPS_KEY_PATH || !HTTPS_CERT_PATH) {
      throw new Error('HTTPS enabled but HTTPS_KEY_PATH/HTTPS_CERT_PATH not provided');
    }

    const key = fs.readFileSync(path.resolve(HTTPS_KEY_PATH));
    const cert = fs.readFileSync(path.resolve(HTTPS_CERT_PATH));

    https.createServer({ key, cert }, app).listen(PORT, () => {
      console.log(`HTTPS server running on port ${PORT} (${NODE_ENV})`);
    });

    return;
  }

  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT} (${NODE_ENV})`);
  });
}

startServer();

module.exports = { app };
