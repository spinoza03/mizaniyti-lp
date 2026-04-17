import { useEffect, useState } from 'react';

const APP_URL = 'https://app.mizaniyti.online';

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

  body {
    background: #fff;
    color: #111827;
    font-family: 'Cairo', sans-serif;
    direction: rtl;
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  #root { width: 100%; min-height: 100vh; }

  ::selection { background: #0d9488; color: white; }

  /* ── Mobile-first responsive helpers ── */

  .section-pad { padding: 64px 20px; }
  @media (min-width: 640px) { .section-pad { padding: 96px 32px; } }

  .h1 {
    font-size: 42px;
    font-weight: 900;
    line-height: 1.15;
    font-family: 'Cairo', sans-serif;
  }
  @media (min-width: 480px) { .h1 { font-size: 52px; } }
  @media (min-width: 768px) { .h1 { font-size: 70px; } }

  .h2 {
    font-size: 28px;
    font-weight: 900;
    line-height: 1.2;
    font-family: 'Cairo', sans-serif;
  }
  @media (min-width: 640px) { .h2 { font-size: 38px; } }

  .body-text {
    font-size: 15px;
    line-height: 1.75;
    font-family: 'Cairo', sans-serif;
  }
  @media (min-width: 640px) { .body-text { font-size: 17px; } }

  /* Stats grid: 2 cols on mobile, 4 on desktop */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (min-width: 640px) {
    .stats-grid { grid-template-columns: repeat(4, 1fr); }
  }

  /* Features grid: 1 col mobile, 2 tablet, 3 desktop */
  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  @media (min-width: 540px) { .features-grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 900px) { .features-grid { grid-template-columns: 1fr 1fr 1fr; } }

  /* Reviews: 1 col mobile, 3 desktop */
  .reviews-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  @media (min-width: 640px) { .reviews-grid { grid-template-columns: repeat(3, 1fr); } }

  /* Hero mockup: stacked on mobile, side-by-side on large */
  .mockup-row {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 100%;
    margin-top: 48px;
  }
  @media (min-width: 860px) {
    .mockup-row {
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
    }
    .mockup-side { transform: translateY(28px) rotate(-3deg); opacity: 0.8; }
    .mockup-side-right { transform: translateY(28px) rotate(3deg); opacity: 0.8; }
  }

  /* Mockup cards: full width on mobile */
  .mockup-card {
    width: 100%;
    max-width: 340px;
  }

  /* CTA buttons: full width on mobile */
  .cta-row {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 340px;
    margin: 0 auto 0;
  }
  @media (min-width: 480px) {
    .cta-row {
      flex-direction: row;
      justify-content: center;
      max-width: none;
    }
  }

  .btn-primary {
    display: block;
    text-align: center;
    text-decoration: none;
    background: #0d9488;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 15px 32px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Cairo', sans-serif;
    box-shadow: 0 2px 16px rgba(13,148,136,0.28);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .btn-primary:active { opacity: 0.85; transform: scale(0.98); }
  @media (hover: hover) {
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  }

  .btn-outline {
    display: block;
    text-align: center;
    text-decoration: none;
    background: transparent;
    color: #0d9488;
    border: 1.5px solid #0d9488;
    border-radius: 12px;
    padding: 14px 32px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Cairo', sans-serif;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .btn-outline:active { background: #f0fdfa; }

  /* Pricing CTA: always full width */
  .pricing-btn {
    display: block;
    width: 100%;
    text-align: center;
    text-decoration: none;
    background: #0d9488;
    color: white;
    border-radius: 12px;
    padding: 16px;
    font-size: 17px;
    font-weight: 700;
    font-family: 'Cairo', sans-serif;
    box-shadow: 0 2px 16px rgba(13,148,136,0.28);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .pricing-btn:active { opacity: 0.85; }

  /* Feature card touch feedback */
  .feature-card { transition: box-shadow 0.2s, border-color 0.2s; }
  @media (hover: hover) {
    .feature-card:hover {
      box-shadow: 0 6px 24px rgba(13,148,136,0.1);
      border-color: #99f6e4 !important;
    }
  }
`;

/* ─── Chip label ─── */
function Chip({ children, color = 'teal' }: { children: React.ReactNode; color?: 'teal' | 'coral' }) {
  return (
    <span style={{
      display: 'inline-block',
      background: color === 'teal' ? '#f0fdfa' : '#fff7ed',
      color: color === 'teal' ? '#0f766e' : '#c2410c',
      borderRadius: '20px', padding: '4px 14px',
      fontSize: '13px', fontWeight: 600,
      fontFamily: "'Cairo', sans-serif",
    }}>{children}</span>
  );
}

/* ─── App mockups ─── */
function DashboardMockup() {
  return (
    <div className="mockup-card" style={{
      background: '#fff', borderRadius: '20px',
      border: '1px solid #e5e7eb', padding: '18px',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#9ca3af' }}>مرحبا يوسف 👋</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>لوحة التحكم</div>
        </div>
        <img src="/logo.png" alt="logo" style={{ height: '26px', width: 'auto' }} />
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
        borderRadius: '14px', padding: '14px', marginBottom: '14px', color: 'white',
      }}>
        <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px' }}>الرصيد المتاح</div>
        <div style={{ fontSize: '26px', fontWeight: 900 }}>12,450 <span style={{ fontSize: '13px', fontWeight: 400 }}>DH</span></div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          {[{ l: 'الدخل', v: '+18,000 DH', c: '#6ee7e0' }, { l: 'المصاريف', v: '-5,550 DH', c: '#fda4a4' }].map((x, i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '7px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>{x.l}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: x.c }}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px', fontWeight: 600 }}>آخر المعاملات</div>
      {[
        { icon: '🛒', label: 'الحانوت', amount: '-85 DH', neg: true },
        { icon: '💰', label: 'الراتب', amount: '+18,000 DH', neg: false },
        { icon: '🚌', label: 'الطرانسبور', amount: '-200 DH', neg: true },
      ].map((t, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '7px 0', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px' }}>{t.icon}</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>{t.label}</span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: t.neg ? '#ef4444' : '#10b981' }}>{t.amount}</span>
        </div>
      ))}
    </div>
  );
}

function DebtMockup() {
  return (
    <div className="mockup-card" style={{
      background: '#fff', borderRadius: '20px',
      border: '1px solid #e5e7eb', padding: '18px',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
    }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '14px' }}>💸 الديون والدروك</div>
      {[
        { name: 'سي كريم', type: 'عندو عندي', total: 2000, paid: 1200 },
        { name: 'القرعة / Daret', type: 'أدفع', total: 5000, paid: 3500 },
      ].map((d, i) => (
        <div key={i} style={{ background: '#f9fafb', borderRadius: '10px', padding: '12px', marginBottom: '10px', border: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{d.name}</span>
            <span style={{ fontSize: '11px', color: '#0d9488', background: '#f0fdfa', padding: '2px 8px', borderRadius: '20px' }}>{d.type}</span>
          </div>
          <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', marginBottom: '6px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(d.paid / d.total) * 100}%`, background: '#0d9488', borderRadius: '3px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280' }}>
            <span>مدفوع: <strong style={{ color: '#0d9488' }}>{d.paid} DH</strong></span>
            <span>متبقي: <strong style={{ color: '#f97316' }}>{d.total - d.paid} DH</strong></span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SavingsMockup() {
  return (
    <div className="mockup-card" style={{
      background: '#fff', borderRadius: '20px',
      border: '1px solid #e5e7eb', padding: '18px',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
    }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '14px' }}>🎯 أهداف الادخار</div>
      {[
        { name: 'العمرة', target: 15000, saved: 8750, emoji: '🕌' },
        { name: 'طوموبيل', target: 80000, saved: 22000, emoji: '🚗' },
      ].map((g, i) => (
        <div key={i} style={{ background: '#fff7ed', borderRadius: '10px', padding: '12px', marginBottom: '10px', border: '1px solid #fed7aa' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>{g.emoji}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{g.name}</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>{Math.round((g.saved / g.target) * 100)}% تحقق</div>
            </div>
          </div>
          <div style={{ height: '7px', background: '#fed7aa', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(g.saved / g.target) * 100}%`, background: '#f97316', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px' }}>
            <span style={{ color: '#f97316', fontWeight: 700 }}>{g.saved.toLocaleString()} DH</span>
            <span style={{ color: '#9ca3af' }}>من {g.target.toLocaleString()} DH</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '12px 20px',
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #e5e7eb' : 'none',
      transition: 'background 0.25s, border-color 0.25s',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <img src="/logo.png" alt="Mizaniyti" style={{ height: '32px', width: 'auto' }} />
      <a href={APP_URL} className="btn-primary" style={{ padding: '9px 22px', fontSize: '14px', borderRadius: '10px' }}>
        ابدأ دابا
      </a>
    </nav>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '100px 20px 60px',
      background: '#fff',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '600px', height: '300px',
        background: 'radial-gradient(ellipse at top, rgba(13,148,136,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ marginBottom: '16px' }}>
        <Chip>✨ التطبيق المغربي الأول لتدبير الميزانية</Chip>
      </div>

      <h1 className="h1" style={{ color: '#111827', marginBottom: '16px' }}>
        دير حساب
        <br />
        <span style={{ color: '#0d9488' }}>على فلوسك</span>
      </h1>

      <p className="body-text" style={{
        color: '#6b7280', maxWidth: '440px',
        marginBottom: '32px',
      }}>
        تتبع مدخولك، مصاريفك، ديونك، ومدخراتك — كلو فبلاصة واحدة بالدارجة المغربية.
      </p>

      <div className="cta-row" style={{ marginBottom: '0' }}>
        <a href={APP_URL} className="btn-primary">🚀 ابدأ مجانًا</a>
        <a href="#features" className="btn-outline">شوف كيفاش كيخدم</a>
      </div>

      <div className="mockup-row">
        <div className="mockup-side"><DebtMockup /></div>
        <div style={{ zIndex: 2 }}><DashboardMockup /></div>
        <div className="mockup-side-right"><SavingsMockup /></div>
      </div>
    </section>
  );
}

/* ─── Social proof ─── */
function SocialProofBar() {
  const stats = [
    { num: '+2,000', label: 'مستخدم مغربي' },
    { num: '98%', label: 'راضيين على التطبيق' },
    { num: '+15M DH', label: 'تم تتبعهم' },
    { num: '4.9 ⭐', label: 'تقييم المستخدمين' },
  ];
  return (
    <section style={{ padding: '36px 20px', background: '#f8fffe', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
      <div className="stats-grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#0d9488', fontFamily: "'Cairo', sans-serif" }}>{s.num}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', fontFamily: "'Cairo', sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const tools = [
    { icon: '🛒', title: 'الحانوت والسوق', titleFr: 'Dépenses quotidiennes', desc: 'سجل مشترياتك اليومية من الحانوت، الخضرة، والسوق بفئة مغربية واضحة.' },
    { icon: '🤝', title: 'القرعة / Daret', titleFr: 'Tontine marocaine', desc: 'تتبع قرعتك — شكون أدى، بقاش قداش، وامتا جايتك الدفعة الجاية.' },
    { icon: '🌙', title: 'الزكاة والصدقة', titleFr: 'Zakat & Aumône', desc: 'احسب زكاتك تلقائيًا وسجل صدقاتك — كلشي محفوظ وواضح.' },
    { icon: '💳', title: 'الديون والسلف', titleFr: 'Dettes & Prêts', desc: 'سي فلان عندو عندك؟ تتبع كل دين وشوف شكون بقا يدفع.' },
    { icon: '🎯', title: 'الادخار للحلم', titleFr: 'Épargne & Objectifs', desc: 'العمرة، طوموبيل؟ اجعل من حلمك هدفًا وادخر بذكاء.' },
    { icon: '📊', title: 'التقارير الشهرية', titleFr: 'Rapports mensuels', desc: 'شوف فين كتروح فلوسك — تقارير مرئية واضحة كل شهر.' },
  ];

  return (
    <section id="features" className="section-pad" style={{ background: '#fff' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ marginBottom: '10px' }}><Chip color="coral">🇲🇦 مصمم للمغاربة</Chip></div>
          <h2 className="h2" style={{ color: '#111827' }}>العدة المغربية الكاملة</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '8px', fontFamily: "'Cairo', sans-serif" }}>
            مش تطبيق أجنبي مترجم — هو مصمم لك أنت من البداية
          </p>
        </div>
        <div className="features-grid">
          {tools.map((t, i) => (
            <div key={i} className="feature-card" style={{
              background: '#fff', border: '1px solid #e5e7eb',
              borderRadius: '14px', padding: '20px',
            }}>
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>{t.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: "'Cairo', sans-serif", marginBottom: '2px' }}>{t.title}</div>
              <div style={{ fontSize: '11px', color: '#0d9488', marginBottom: '8px' }}>{t.titleFr}</div>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.65, fontFamily: "'Cairo', sans-serif" }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const reviews = [
    { text: 'من غير ميزانيتي كنت نوصل لآخر الشهر بلا فلوس وما عارف فين راحت. دابا عارف كل سنتيم.', name: 'يوسف ب.', city: 'الدار البيضاء', stars: 5 },
    { text: 'القرعة ديالي ديما كانت مشكلة. التطبيق حل هاد المشكلة مرة وإلى الأبد.', name: 'فاطمة ز.', city: 'الرباط', stars: 5 },
    { text: 'Simple, en darija, et franchement efficace. J\'ai enfin le contrôle sur mes dépenses.', name: 'Omar M.', city: 'مراكش', stars: 5 },
  ];

  return (
    <section className="section-pad" style={{ background: '#f9fafb' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 className="h2" style={{ color: '#111827' }}>واش قالو المستخدمين؟</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '20px' }}>
              <div style={{ marginBottom: '10px', fontSize: '15px' }}>{'⭐'.repeat(r.stars)}</div>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, fontFamily: "'Cairo', sans-serif", marginBottom: '16px' }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #0d9488, #f97316)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', color: 'white', fontWeight: 700, fontFamily: "'Cairo', sans-serif",
                }}>{r.name[0]}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', fontFamily: "'Cairo', sans-serif" }}>{r.name}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontFamily: "'Cairo', sans-serif" }}>{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  const plans = {
    monthly: { price: '20', period: 'شهر', sub: 'بلا التزام — يمكنك الإلغاء متى شئت', badge: null },
    yearly: { price: '99', period: 'سنة', sub: 'يعني 8.25 DH فالشهر — وفر 141 DH', badge: 'الأفضل قيمة' },
  };
  const p = plans[billing];

  const features = [
    'تتبع لا محدود للمعاملات',
    'القرعة / Daret — تتبع الجماعة',
    'إدارة الديون والسلف',
    'أهداف الادخار',
    'التقارير الشهرية',
    'دعم بالدارجة على WhatsApp',
  ];

  return (
    <section id="pricing" className="section-pad" style={{ background: '#fff' }}>
      <div style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '10px' }}><Chip color="coral">💰 الثمن</Chip></div>
        <h2 className="h2" style={{ color: '#111827', marginBottom: '8px' }}>بسيط وبدون مفاجآت</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '28px', fontFamily: "'Cairo', sans-serif" }}>اختر اللي يناسبك</p>

        {/* Toggle */}
        <div style={{
          display: 'inline-flex', background: '#f3f4f6',
          borderRadius: '10px', padding: '4px', gap: '4px', marginBottom: '32px',
        }}>
          {(['monthly', 'yearly'] as const).map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{
              padding: '9px 18px', borderRadius: '7px', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600, fontFamily: "'Cairo', sans-serif",
              border: 'none', transition: 'all 0.18s',
              background: billing === b ? '#fff' : 'transparent',
              color: billing === b ? '#111827' : '#9ca3af',
              boxShadow: billing === b ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              minWidth: '80px',
              WebkitTapHighlightColor: 'transparent',
            }}>
              {b === 'monthly' ? 'شهري' : (
                <>سنوي <span style={{ marginRight: '4px', fontSize: '10px', background: '#0d9488', color: 'white', borderRadius: '20px', padding: '1px 5px' }}>-59%</span></>
              )}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', border: '2px solid #0d9488',
          borderRadius: '20px', padding: '28px 24px',
          boxShadow: '0 8px 40px rgba(13,148,136,0.1)',
          position: 'relative',
        }}>
          {p.badge && (
            <div style={{
              position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
              background: '#f97316', color: 'white', borderRadius: '20px',
              padding: '3px 16px', fontSize: '12px', fontWeight: 700,
              fontFamily: "'Cairo', sans-serif", whiteSpace: 'nowrap',
            }}>{p.badge} ✨</div>
          )}

          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '60px', fontWeight: 900, color: '#0d9488', fontFamily: "'Cairo', sans-serif", lineHeight: 1 }}>{p.price}</span>
            <span style={{ fontSize: '16px', color: '#9ca3af', fontFamily: "'Cairo', sans-serif" }}> DH / {p.period}</span>
          </div>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px', fontFamily: "'Cairo', sans-serif" }}>{p.sub}</p>

          <ul style={{ listStyle: 'none', textAlign: 'right', marginBottom: '24px' }}>
            {features.map((f, i) => (
              <li key={i} style={{
                padding: '10px 0',
                borderBottom: i < features.length - 1 ? '1px solid #f3f4f6' : 'none',
                fontSize: '14px', color: '#374151',
                display: 'flex', alignItems: 'center', gap: '10px',
                fontFamily: "'Cairo', sans-serif", flexDirection: 'row-reverse',
              }}>
                <span style={{ color: '#0d9488', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a href={APP_URL} className="pricing-btn">🚀 ابدأ تجربتك الآن</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="section-pad" style={{ background: '#f8fffe', textAlign: 'center' }}>
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        <h2 className="h2" style={{ color: '#111827', marginBottom: '14px' }}>
          لا تخلي الشهر ينتهي
          <br />
          <span style={{ color: '#0d9488' }}>قبل الفلوس</span>
        </h2>
        <p className="body-text" style={{ color: '#6b7280', marginBottom: '32px' }}>
          انضم لآلاف المغاربة اللي اختاروا يكونوا سيد على فلوسهم.
        </p>
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <a href={APP_URL} className="pricing-btn">🚀 ابدأ دابا — مجانًا</a>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          marginTop: '16px', color: '#9ca3af', fontSize: '12px', fontFamily: "'Cairo', sans-serif",
        }}>
          <span>📱</span>
          <span>يشتغل على الموبايل بدون تنزيل — PWA</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ padding: '32px 20px', borderTop: '1px solid #e5e7eb', background: '#fff', textAlign: 'center' }}>
      <img src="/logo.png" alt="Mizaniyti" style={{ height: '32px', width: 'auto', marginBottom: '14px' }} />
      <p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: "'Cairo', sans-serif", marginBottom: '14px' }}>
        التطبيق المغربي الأول لتدبير الميزانية الشخصية بالدارجة
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {[{ label: 'ابدأ دابا', href: APP_URL }, { label: 'الأسعار', href: '#pricing' }, { label: 'تواصل معنا', href: '#' }].map((l, i) => (
          <a key={i} href={l.href} style={{ fontSize: '13px', color: '#0d9488', textDecoration: 'none', fontFamily: "'Cairo', sans-serif" }}>{l.label}</a>
        ))}
      </div>
      <p style={{ fontSize: '11px', color: '#d1d5db' }}>© 2025 Mizaniyti. جميع الحقوق محفوظة.</p>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  useEffect(() => {
    const w = window as any;
    if (w.fbq) w.fbq('track', 'ViewContent');
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <Features />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
