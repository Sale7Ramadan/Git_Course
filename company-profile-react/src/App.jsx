import {
  aboutPoints,
  companyInfo,
  contactItems,
  services,
  team
} from './data/content';

function App() {
  return (
    <div className="page">
      <div className="site-card">
        <header className="topbar" id="home">
          <div className="brand">
            <span className="brand-mark">🛡️</span>
            <strong>{companyInfo.name}</strong>
          </div>

          <nav className="nav-links">
            <a href="#home" className="active">
              Home
            </a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="top-actions">
            <button className="primary-btn">Get Started</button>
            <button className="menu-btn" aria-label="open menu">
              ☰
            </button>
          </div>
        </header>

        <section className="hero section-grid">
          <div className="hero-copy">
            <p className="pre-title">{companyInfo.name}</p>
            <h1>{companyInfo.tagline}</h1>
            <p>{companyInfo.description}</p>
            <div className="hero-buttons">
              <button className="primary-btn">{companyInfo.ctaPrimary} →</button>
              <button className="ghost-btn">{companyInfo.ctaSecondary}</button>
            </div>
          </div>
          <div className="hero-visual" role="img" aria-label="Digital shield hero visual" />
        </section>

        <section className="section-grid content-section" id="about">
          <div className="section-image about-image" />
          <div>
            <h2>About Rivica</h2>
            <p>
              Rivica is a team of developers, designers, and creatives who came together to build
              impactful digital products.
            </p>
            <p>
              Our goal is to transform ideas into scalable software solutions through
              collaboration, creativity, and strong technical foundations.
            </p>
            <div className="feature-list">
              {aboutPoints.map((item) => (
                <article key={item.title} className="feature-item">
                  <span>{item.icon}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="services">
          <h2>Our Services</h2>
          <h3>Turning Ideas Into Impactful Digital Products</h3>
          <p className="section-intro">
            At Rivica, we provide a range of services to bring your digital vision to life.
          </p>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <span>{service.icon}</span>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <button className="ghost-btn center-btn">View All Services</button>
        </section>

        <section className="content-section" id="projects">
          <h2>Meet Our Team</h2>
          <h3>The Minds of Rivica</h3>
          <p className="section-intro">A diverse team of experts working together to build innovative solutions.</p>
          <div className="team-grid">
            {team.map((member) => (
              <article key={member.name} className="team-card">
                <img src={member.image} alt={member.name} loading="lazy" />
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                  <button className="ghost-btn">View Project</button>
                </div>
              </article>
            ))}
          </div>
          <button className="ghost-btn center-btn">View All Projects</button>
        </section>

        <section className="content-section contact-grid" id="contact">
          <div>
            <h2>Get In Touch</h2>
            <h3>Let's Talk About Your Project</h3>
            <p className="section-intro">
              Reach out to Rivica for any inquiries or to start your next digital transformation.
            </p>
            <div className="contact-cards">
              {contactItems.map((item) => (
                <article className="contact-card" key={item.label}>
                  <span>{item.icon}</span>
                  <h4>{item.label}</h4>
                  <p>{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Send a Message</h2>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows={6} />
            <button className="primary-btn" type="submit">
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default App;
