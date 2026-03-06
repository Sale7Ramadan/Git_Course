import SectionTitle from './components/SectionTitle';
import { companyInfo, services, stats, team } from './data/content';

function App() {
  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <span className="logo">{companyInfo.name}</span>
          <div className="links">
            <a href="#about">من نحن</a>
            <a href="#services">خدماتنا</a>
            <a href="#team">الفريق</a>
            <a href="#contact">تواصل معنا</a>
          </div>
        </nav>

        <div className="hero-content">
          <h1>{companyInfo.tagline}</h1>
          <p>{companyInfo.description}</p>
          <div className="actions">
            <button>{companyInfo.ctaPrimary}</button>
            <a href="#services" className="secondary-btn">
              {companyInfo.ctaSecondary}
            </a>
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
      </header>

      <main>
        <section id="about" className="section">
          <SectionTitle
            title="من نحن"
            subtitle="فريق مرن يجمع بين التقنية والإبداع لنخدم الشركات الناشئة والمشاريع الصغيرة."
          />
        </section>

        <section id="services" className="section">
          <SectionTitle title="خدماتنا" subtitle="كل ما تحتاجه لبناء حضور رقمي قوي." />
          <div className="cards">
            {services.map((service) => (
              <article className="card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="section">
          <SectionTitle title="فريقنا" subtitle="أشخاص شغوفون بنجاح مشروعك." />
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
        <h2>جاهزين نبدأ؟</h2>
        <p>راسلنا على: hello@nova-team.com | +963 900 000 000</p>
        <small>© {new Date().getFullYear()} {companyInfo.name} - جميع الحقوق محفوظة</small>
      </footer>
    </div>
  );
}

export default App;
