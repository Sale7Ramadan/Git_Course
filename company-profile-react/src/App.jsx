import SectionTitle from './components/SectionTitle';
import { companyInfo, services, stats, team } from './data/content';

const highlights = [
  'تصميم UI/UX واضح وسلس',
  'تسليمات سريعة بمراحل واضحة',
  'جودة تقنية من أول نسخة'
];

const workflow = [
  { title: 'اكتشاف', text: 'نفهم المشروع، الجمهور، والأهداف قبل أي تنفيذ.' },
  { title: 'تصميم', text: 'نصمم تجربة وهوية بصرية منسجمة مع شخصية البراند.' },
  { title: 'تنفيذ', text: 'نطوّر المنتج بجودة عالية مع اختبارات قبل الإطلاق.' },
  { title: 'تحسين', text: 'نراقب الأداء ونحسّن النتائج بعد الإطلاق.' }
];

const testimonials = [
  {
    quote:
      'اشتغلنا مع Rivica على صفحة الهبوط وكان التعاون سريع ومرن والنتيجة أفضل من المتوقع.',
    name: 'Lama Studio',
    title: 'مؤسسة ناشئة'
  },
  {
    quote:
      'أكثر شيء ميّز الفريق هو الوضوح بالتواصل والاهتمام بكل تفاصيل تجربة المستخدم.',
    name: 'NexGen Hub',
    title: 'منصة تعليمية'
  }
];

function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-glow" />
        <nav className="nav container">
          <span className="logo">{companyInfo.name}</span>
          <div className="links">
            <a href="#about">من نحن</a>
            <a href="#services">الخدمات</a>
            <a href="#process">طريقة العمل</a>
            <a href="#team">الفريق</a>
            <a href="#contact">تواصل</a>
          </div>
        </nav>

        <div className="hero-layout container">
          <div className="hero-content">
            <p className="eyebrow">Rivica • Digital Product Team</p>
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

          <aside className="hero-panel">
            <h3>لماذا Rivica؟</h3>
            <p>
              فريق صغير يعني تواصل مباشر، سرعة قرار، وتركيز كامل على مشروعك بدون
              تعقيد.
            </p>
            <div className="stats-grid">
              {stats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section id="about" className="section container">
          <SectionTitle
            title="نبني منتجات رقمية تُفهم بسرعة"
            subtitle="نهتم بالوضوح في الرسالة والتصميم، حتى أول زيارة تتحول إلى انطباع قوي وثقة أعلى."
          />
        </section>

        <section id="services" className="section container">
          <SectionTitle title="خدماتنا" subtitle="حلول عملية مصممة لتناسب فرق ناشئة وشركات صغيرة." />
          <div className="cards services-grid">
            {services.map((service) => (
              <article className="card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section container">
          <SectionTitle title="طريقة عملنا" subtitle="خطوات واضحة من الفكرة إلى الإطلاق والتحسين." />
          <div className="workflow-grid">
            {workflow.map((step, index) => (
              <article className="workflow-card" key={step.title}>
                <span className="step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="section container">
          <SectionTitle title="فريقنا" subtitle="خبرات متكاملة تتعاون كفريق واحد على نجاحك." />
          <div className="cards team-grid">
            {team.map((member) => (
              <article className="card" key={member.name}>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <SectionTitle title="آراء شركاء العمل" subtitle="بعض الانطباعات من فرق اشتغلنا معها." />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <p>“{item.quote}”</p>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.title}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container footer-inner">
          <h2>خلينا نطلق نسختك القادمة بشكل احترافي</h2>
          <p>hello@rivica.io • +963 900 000 000</p>
          <small>© {new Date().getFullYear()} {companyInfo.name} - جميع الحقوق محفوظة</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
