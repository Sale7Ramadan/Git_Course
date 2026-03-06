import SectionTitle from './components/SectionTitle';
import { companyInfo, services, stats, team } from './data/content';

const highlights = [
  'تصميم واجهات سهلة الاستخدام',
  'تطوير سريع وقابل للتوسع',
  'دعم مستمر بعد الإطلاق'
];

function App() {
  return (
    <div className="page">
      <header className="hero">
        <nav className="nav container">
          <span className="logo">{companyInfo.name}</span>
          <div className="links">
            <a href="#about">من نحن</a>
            <a href="#services">خدماتنا</a>
            <a href="#team">الفريق</a>
            <a href="#contact">تواصل معنا</a>
          </div>
        </nav>

        <div className="hero-layout container">
          <div className="hero-content">
            <p className="eyebrow">Digital Partner for Growing Startups</p>
            <h1>{companyInfo.tagline}</h1>
            <p>{companyInfo.description}</p>
            <div className="actions">
              <button>{companyInfo.ctaPrimary}</button>
              <a href="#services" className="secondary-btn">
                {companyInfo.ctaSecondary}
              </a>
            </div>
            <div className="highlight-list">
              {highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section container">
          <SectionTitle
            title="من نحن"
            subtitle="في Rivica نشتغل بعقلية المنتج، يعني نهتم بالتفاصيل من أول فكرة حتى تجربة المستخدم النهائية."
          />
        </section>

        <section id="services" className="section container">
          <SectionTitle title="خدماتنا" subtitle="حلول متكاملة لبناء حضور رقمي حديث." />
          <div className="cards">
            {services.map((service) => (
              <article className="card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="section container">
          <SectionTitle title="فريقنا" subtitle="فريق صغير، تواصل مباشر، وتنفيذ سريع." />
          <div className="cards">
            {team.map((member) => (
              <article className="card" key={member.name}>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container footer-inner">
          <h2>جاهزين نبدأ؟</h2>
          <p>راسلنا على: hello@rivica.io | +963 900 000 000</p>
          <small>© {new Date().getFullYear()} {companyInfo.name} - جميع الحقوق محفوظة</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
