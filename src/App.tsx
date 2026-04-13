import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const APP_URL = 'https://app.mizaniyti.online';

/* ─── 3D App Mockup Panels ─── */
function AppScreen({ position, rotation, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Phone body */}
      <RoundedBox args={[1.4, 2.4, 0.1]} radius={0.1} smoothness={4} castShadow>
        <meshStandardMaterial color="#0a1f1c" metalness={0.4} roughness={0.3} />
      </RoundedBox>
      {/* Screen */}
      <RoundedBox args={[1.2, 2.1, 0.02]} radius={0.07} smoothness={4} position={[0, 0, 0.055]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </RoundedBox>
      {/* Balance card on screen */}
      <RoundedBox args={[1.0, 0.5, 0.01]} radius={0.05} smoothness={4} position={[0, 0.5, 0.07]}>
        <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.4} />
      </RoundedBox>
      {/* Bar chart elements */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.3 + i * 0.3, -0.3, 0.07]}>
          <boxGeometry args={[0.12, 0.1 + i * 0.15, 0.01]} />
          <meshStandardMaterial color={i === 2 ? '#f97316' : '#14b8a6'} emissive={i === 2 ? '#f97316' : '#14b8a6'} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPhones() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 4, 3]} intensity={2} color="#0d9488" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#f97316" />
      <spotLight position={[0, 6, 4]} intensity={3} color="#14b8a6" angle={0.4} penumbra={0.5} />

      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <AppScreen
          position={[-1.6, 0.2, 0]}
          rotation={[0.05, 0.25, -0.05]}
          color="#0a2622"
        />
      </Float>

      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.8}>
        <AppScreen
          position={[0, 0.1, 0.5]}
          rotation={[0, 0, 0]}
          color="#0a1f1c"
        />
      </Float>

      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
        <AppScreen
          position={[1.6, -0.1, 0]}
          rotation={[0.05, -0.25, 0.05]}
          color="#0a2622"
        />
      </Float>
    </>
  );
}

/* ─── Dashboard Mockup SVG ─── */
function DashboardMockup() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a2622 0%, #061a18 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(13,148,136,0.3)',
      padding: '20px',
      fontFamily: "'Cairo', sans-serif",
      direction: 'rtl',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(13,148,136,0.1)',
      maxWidth: '320px',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#7ab8b3' }}>مرحبا، محمد</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2f8f6' }}>لوحة التحكم</div>
        </div>
        <div style={{
          background: 'rgba(13,148,136,0.2)',
          borderRadius: '50%',
          width: '36px', height: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px'
        }}>🏠</div>
      </div>
      {/* Balance card */}
      <div style={{
        background: 'linear-gradient(135deg, #0d9488, #0f766e)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
      }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>الرصيد المتاح</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>12,450 <span style={{ fontSize: '14px' }}>DH</span></div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>الدخل</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#6ee7e0' }}>+18,000 DH</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>المصاريف</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fca5a5' }}>-5,550 DH</div>
          </div>
        </div>
      </div>
      {/* Recent transactions */}
      <div style={{ fontSize: '12px', color: '#7ab8b3', marginBottom: '10px', fontWeight: 600 }}>آخر المعاملات</div>
      {[
        { icon: '🛒', label: 'الحانوت', amount: '-85 DH', color: '#fca5a5' },
        { icon: '💰', label: 'الراتب', amount: '+18,000 DH', color: '#6ee7e0' },
        { icon: '🚌', label: 'الطرانسبور', amount: '-200 DH', color: '#fca5a5' },
      ].map((tx, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 10px', borderRadius: '8px',
          background: 'rgba(13,148,136,0.08)', marginBottom: '6px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>{tx.icon}</span>
            <span style={{ fontSize: '12px', color: '#e2f8f6' }}>{tx.label}</span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: tx.color }}>{tx.amount}</span>
        </div>
      ))}
    </div>
  );
}

function DebtMockup() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a2622 0%, #061a18 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(13,148,136,0.3)',
      padding: '20px',
      fontFamily: "'Cairo', sans-serif",
      direction: 'rtl',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      maxWidth: '300px',
      width: '100%',
    }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2f8f6', marginBottom: '14px' }}>
        💸 الديون والدروك
      </div>
      {[
        { name: 'سي كريم', type: 'عندو عندي', total: 2000, paid: 1200 },
        { name: 'الدارة', type: 'أدفع', total: 5000, paid: 3500 },
      ].map((d, i) => (
        <div key={i} style={{
          background: 'rgba(13,148,136,0.1)',
          borderRadius: '10px', padding: '12px', marginBottom: '10px',
          border: '1px solid rgba(13,148,136,0.2)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2f8f6' }}>{d.name}</span>
            <span style={{ fontSize: '10px', color: '#7ab8b3', background: 'rgba(13,148,136,0.2)', padding: '2px 8px', borderRadius: '20px' }}>{d.type}</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginBottom: '6px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(d.paid / d.total) * 100}%`, background: 'linear-gradient(90deg, #0d9488, #14b8a6)', borderRadius: '3px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
            <span style={{ color: '#7ab8b3' }}>المدفوع: <strong style={{ color: '#6ee7e0' }}>{d.paid} DH</strong></span>
            <span style={{ color: '#7ab8b3' }}>المتبقي: <strong style={{ color: '#fca5a5' }}>{d.total - d.paid} DH</strong></span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SavingsMockup() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a2622 0%, #061a18 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(13,148,136,0.3)',
      padding: '20px',
      fontFamily: "'Cairo', sans-serif",
      direction: 'rtl',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      maxWidth: '300px',
      width: '100%',
    }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2f8f6', marginBottom: '14px' }}>
        🎯 أهداف الادخار
      </div>
      {[
        { name: 'العمرة', target: 15000, saved: 8750, emoji: '🕌' },
        { name: 'طوموبيل', target: 80000, saved: 22000, emoji: '🚗' },
      ].map((g, i) => (
        <div key={i} style={{
          background: 'rgba(249,115,22,0.08)',
          borderRadius: '10px', padding: '12px', marginBottom: '10px',
          border: '1px solid rgba(249,115,22,0.2)',
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>{g.emoji}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2f8f6' }}>{g.name}</div>
              <div style={{ fontSize: '11px', color: '#7ab8b3' }}>{Math.round((g.saved / g.target) * 100)}% تحقق</div>
            </div>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${(g.saved / g.target) * 100}%`,
              background: 'linear-gradient(90deg, #f97316, #fb923c)', borderRadius: '4px'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px' }}>
            <span style={{ color: '#fb923c', fontWeight: 700 }}>{g.saved.toLocaleString()} DH</span>
            <span style={{ color: '#7ab8b3' }}>من {g.target.toLocaleString()} DH</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Sections ─── */
const S: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '12px 24px',
      background: scrolled ? 'rgba(3,13,12,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(13,148,136,0.2)' : 'none',
      transition: 'all 0.3s',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <img src="/logo.png" alt="Mizaniyti" style={{ height: '36px', width: 'auto' }} />
      <a
        href={APP_URL}
        style={{
          background: 'linear-gradient(135deg, #0d9488, #0f766e)',
          color: 'white', textDecoration: 'none',
          padding: '8px 20px', borderRadius: '24px',
          fontSize: '14px', fontWeight: 600,
          fontFamily: "'Cairo', sans-serif",
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        ابدأ دابا
      </a>
    </nav>
  );
}

function HeroSection() {
  return (
    <section style={{
      ...S,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 24px 60px',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)',
        borderRadius: '24px', padding: '6px 16px',
        fontSize: '13px', color: '#14b8a6',
        marginBottom: '24px',
        fontFamily: "'Cairo', sans-serif",
      }}>
        <span>✨</span>
        <span>التطبيق المغربي الأول لتدبير الميزانية</span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: 'clamp(36px, 7vw, 80px)',
        fontWeight: 900,
        lineHeight: 1.15,
        marginBottom: '20px',
        fontFamily: "'Cairo', sans-serif",
      }}>
        <span style={{ color: '#e2f8f6' }}>دير حساب</span>
        <br />
        <span style={{
          background: 'linear-gradient(135deg, #0d9488, #14b8a6, #f97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>على فلوسك</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(16px, 2.5vw, 20px)',
        color: '#7ab8b3',
        maxWidth: '560px',
        lineHeight: 1.7,
        marginBottom: '40px',
        fontFamily: "'Cairo', sans-serif",
      }}>
        تتبع مدخولك، مصاريفك، ديونك، ومدخراتك — كلو فبلاصة واحدة بالدارجة المغربية.
        <br />
        <span style={{ color: '#14b8a6', fontStyle: 'italic', fontSize: '0.9em' }}>Votre argent, votre contrôle.</span>
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
        <a href={APP_URL} style={{
          background: 'linear-gradient(135deg, #0d9488, #0f766e)',
          color: 'white', textDecoration: 'none',
          padding: '14px 36px', borderRadius: '32px',
          fontSize: '16px', fontWeight: 700,
          fontFamily: "'Cairo', sans-serif",
          boxShadow: '0 8px 32px rgba(13,148,136,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          display: 'inline-block',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(13,148,136,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,148,136,0.4)'; }}
        >
          🚀 ابدأ مجانًا دابا
        </a>
        <a href="#features" style={{
          background: 'transparent',
          color: '#14b8a6', textDecoration: 'none',
          padding: '14px 36px', borderRadius: '32px',
          fontSize: '16px', fontWeight: 600,
          fontFamily: "'Cairo', sans-serif",
          border: '1px solid rgba(13,148,136,0.4)',
          transition: 'background 0.2s',
          display: 'inline-block',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,148,136,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          شوف كيفاش كيخدم
        </a>
      </div>

      {/* 3D Canvas */}
      <div style={{ width: '100%', maxWidth: '700px', height: '350px', position: 'relative' }}>
        <Canvas style={{ borderRadius: '16px' }}>
          <FloatingPhones />
        </Canvas>
        {/* Gradient fade bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
          background: 'linear-gradient(transparent, #030d0c)',
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  );
}

function SocialProofBar() {
  const stats = [
    { num: '+2,000', label: 'مستخدم مغربي' },
    { num: '98%', label: 'راضيين على التطبيق' },
    { num: '+15M DH', label: 'تم تتبعهم' },
    { num: '4.9 ⭐', label: 'تقييم المستخدمين' },
  ];
  return (
    <section style={{
      ...S,
      padding: '40px 24px',
      borderTop: '1px solid rgba(13,148,136,0.15)',
      borderBottom: '1px solid rgba(13,148,136,0.15)',
      background: 'rgba(10,38,34,0.5)',
    }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '32px', textAlign: 'center',
      }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{
              fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#14b8a6',
              fontFamily: "'Cairo', sans-serif",
            }}>{s.num}</div>
            <div style={{ fontSize: '14px', color: '#7ab8b3', fontFamily: "'Cairo', sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppShowcase() {
  const tabs = ['لوحة التحكم', 'الديون', 'الادخار'] as const;
  const [active, setActive] = useState<0 | 1 | 2>(0);

  const mockups = [<DashboardMockup />, <DebtMockup />, <SavingsMockup />];

  return (
    <section id="features" style={{ ...S, padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)',
          borderRadius: '24px', padding: '6px 16px',
          fontSize: '13px', color: '#fb923c',
          marginBottom: '16px',
          fontFamily: "'Cairo', sans-serif",
        }}>
          📱 شوف التطبيق
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900,
          color: '#e2f8f6', lineHeight: 1.2,
          fontFamily: "'Cairo', sans-serif",
        }}>
          كلشي محتاجو فبلاصة واحدة
        </h2>
        <p style={{ color: '#7ab8b3', fontSize: '16px', marginTop: '12px', fontFamily: "'Cairo', sans-serif" }}>
          بلا تعقيد — تطبيق بسيط مصمم للمغاربة
        </p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i as 0 | 1 | 2)} style={{
            padding: '10px 24px', borderRadius: '24px', cursor: 'pointer',
            fontSize: '14px', fontWeight: 600, fontFamily: "'Cairo', sans-serif",
            border: 'none', transition: 'all 0.2s',
            background: active === i ? 'linear-gradient(135deg, #0d9488, #0f766e)' : 'rgba(13,148,136,0.1)',
            color: active === i ? 'white' : '#7ab8b3',
            boxShadow: active === i ? '0 4px 20px rgba(13,148,136,0.4)' : 'none',
          }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {mockups[active]}
      </div>
    </section>
  );
}

function MoroccanToolkit() {
  const tools = [
    {
      icon: '🏪',
      title: 'الحانوت والسوق',
      titleFr: 'Dépenses quotidiennes',
      desc: 'سجل مشترياتك اليومية من الحانوت، الخضرة، والسوق — بعنوان واضح وفئة مغربية.',
      color: '#0d9488',
    },
    {
      icon: '🤝',
      title: 'الدارة',
      titleFr: 'Tontine / Daret',
      desc: 'تتبع دارتك بدقة — شكون أدى، بقاش قداش، وامتا جايتك الدفعة الجاية.',
      color: '#f97316',
    },
    {
      icon: '🌙',
      title: 'الزكاة والصدقة',
      titleFr: 'Zakat & Aumône',
      desc: 'احسب زكاتك تلقائيًا وسجل صدقاتك — كلشي محفوظ وواضح.',
      color: '#8b5cf6',
    },
    {
      icon: '💳',
      title: 'الديون والسلف',
      titleFr: 'Dettes & Prêts',
      desc: 'سي فلان عندو عندك؟ تتبع كل دين بتفصيل وشوف شكون بقا يدفع.',
      color: '#0d9488',
    },
    {
      icon: '🎯',
      title: 'الادخار للحلم',
      titleFr: 'Épargne & Objectifs',
      desc: 'عندك حلم — العمرة، طوموبيل، أو كأس العالم؟ اجعل من حلمك هدفًا وادخر بذكاء.',
      color: '#f97316',
    },
    {
      icon: '📊',
      title: 'التقارير والإحصاء',
      titleFr: 'Rapports & Stats',
      desc: 'شوف فين كتروح فلوسك — تقارير مرئية واضحة كل شهر.',
      color: '#8b5cf6',
    },
  ];

  return (
    <section style={{ ...S, padding: '80px 24px', background: 'rgba(6,26,24,0.6)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)',
            borderRadius: '24px', padding: '6px 16px',
            fontSize: '13px', color: '#14b8a6',
            marginBottom: '16px',
            fontFamily: "'Cairo', sans-serif",
          }}>
            🇲🇦 مصمم للمغاربة
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900,
            color: '#e2f8f6', lineHeight: 1.2,
            fontFamily: "'Cairo', sans-serif",
          }}>
            العدة المغربية الكاملة
          </h2>
          <p style={{ color: '#7ab8b3', fontSize: '16px', marginTop: '12px', fontFamily: "'Cairo', sans-serif" }}>
            مش تطبيق أجنبي مترجم — هو مصمم لك أنت من البداية
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {tools.map((t, i) => (
            <div key={i} style={{
              background: 'rgba(10,38,34,0.6)',
              border: `1px solid ${t.color}30`,
              borderRadius: '16px', padding: '24px',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.borderColor = t.color + '60';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.borderColor = t.color + '30';
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${t.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', marginBottom: '16px',
              }}>{t.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2f8f6', marginBottom: '4px', fontFamily: "'Cairo', sans-serif" }}>
                {t.title}
              </div>
              <div style={{ fontSize: '11px', color: t.color, marginBottom: '10px', fontFamily: "'Inter', sans-serif" }}>
                {t.titleFr}
              </div>
              <p style={{ fontSize: '13px', color: '#7ab8b3', lineHeight: 1.7, fontFamily: "'Cairo', sans-serif" }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      text: 'من غير ميزانيتي كنت نوصل لآخر الشهر بلا فلوس وما عارف فين راحت. دابا خلاص عارف كل سنتيم.',
      name: 'يوسف ب.',
      city: 'الدار البيضاء',
      stars: 5,
    },
    {
      text: 'الدارة ديالي ديما كانت مشكلة — شكون أدى وشكون لا. التطبيق حل هاد المشكلة مرة وإلى الأبد.',
      name: 'فاطمة ز.',
      city: 'الرباط',
      stars: 5,
    },
    {
      text: 'Simple, en darija, et franchement efficace. J\'ai enfin le contrôle sur mes dépenses.',
      name: 'Omar M.',
      city: 'مراكش',
      stars: 5,
    },
  ];

  return (
    <section style={{ ...S, padding: '80px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900,
            color: '#e2f8f6', fontFamily: "'Cairo', sans-serif",
          }}>
            واش قالو المستخدمين؟
          </h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: 'rgba(10,38,34,0.7)',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: '16px', padding: '24px',
            }}>
              <div style={{ marginBottom: '12px', fontSize: '18px' }}>
                {'⭐'.repeat(r.stars)}
              </div>
              <p style={{
                fontSize: '14px', color: '#b2e0db', lineHeight: 1.7,
                fontFamily: "'Cairo', sans-serif", marginBottom: '16px',
              }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0d9488, #f97316)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', color: 'white', fontWeight: 700,
                  fontFamily: "'Cairo', sans-serif",
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2f8f6', fontFamily: "'Cairo', sans-serif" }}>{r.name}</div>
                  <div style={{ fontSize: '11px', color: '#7ab8b3', fontFamily: "'Cairo', sans-serif" }}>{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ ...S, padding: '80px 24px', background: 'rgba(6,26,24,0.6)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)',
          borderRadius: '24px', padding: '6px 16px',
          fontSize: '13px', color: '#fb923c',
          marginBottom: '16px',
          fontFamily: "'Cairo', sans-serif",
        }}>
          💰 الثمن
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900,
          color: '#e2f8f6', marginBottom: '16px',
          fontFamily: "'Cairo', sans-serif",
        }}>
          استثمار صغير، فائدة كبيرة
        </h2>
        <p style={{ color: '#7ab8b3', marginBottom: '48px', fontSize: '16px', fontFamily: "'Cairo', sans-serif" }}>
          تمن قهوة فالشهر باش تدبر ميزانيتك بذكاء
        </p>

        {/* Single card */}
        <div style={{
          background: 'linear-gradient(135deg, #0a2622, #061a18)',
          border: '2px solid rgba(13,148,136,0.4)',
          borderRadius: '24px', padding: '40px 32px',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(13,148,136,0.15)',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
            background: 'radial-gradient(circle at 50% 50%, rgba(13,148,136,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #f97316, #fb923c)',
            color: 'white', borderRadius: '20px', padding: '4px 16px',
            fontSize: '12px', fontWeight: 700, marginBottom: '24px',
            fontFamily: "'Cairo', sans-serif",
          }}>
            ✨ كلشي شامل
          </div>

          <div style={{ marginBottom: '8px' }}>
            <span style={{
              fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 900, color: '#14b8a6',
              fontFamily: "'Cairo', sans-serif",
            }}>29</span>
            <span style={{ fontSize: '20px', color: '#7ab8b3', fontFamily: "'Cairo', sans-serif" }}> DH</span>
          </div>
          <div style={{ fontSize: '14px', color: '#7ab8b3', marginBottom: '32px', fontFamily: "'Cairo', sans-serif" }}>
            فالشهر — أقل من 1 DH فاليوم
          </div>

          <ul style={{ listStyle: 'none', textAlign: 'right', marginBottom: '36px' }}>
            {[
              'تتبع لا محدود للمعاملات',
              'إدارة الديون والسلف',
              'أهداف الادخار',
              'الدارة وتتبع الجماعة',
              'التقارير الشهرية',
              'دعم بالدارجة على WhatsApp',
            ].map((f, i) => (
              <li key={i} style={{
                padding: '10px 0',
                borderBottom: i < 5 ? '1px solid rgba(13,148,136,0.1)' : 'none',
                fontSize: '15px', color: '#b2e0db',
                display: 'flex', alignItems: 'center', gap: '10px',
                fontFamily: "'Cairo', sans-serif",
                flexDirection: 'row-reverse',
              }}>
                <span style={{ color: '#14b8a6', fontSize: '16px' }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a href={APP_URL} style={{
            display: 'block',
            background: 'linear-gradient(135deg, #0d9488, #0f766e)',
            color: 'white', textDecoration: 'none',
            padding: '16px 32px', borderRadius: '32px',
            fontSize: '18px', fontWeight: 700,
            fontFamily: "'Cairo', sans-serif",
            boxShadow: '0 8px 32px rgba(13,148,136,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(13,148,136,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,148,136,0.4)'; }}
          >
            🚀 ابدأ تجربتك الآن
          </a>

          <p style={{
            fontSize: '12px', color: '#7ab8b3', marginTop: '16px',
            fontFamily: "'Cairo', sans-serif",
          }}>
            بلا عقد — يمكنك الإلغاء في أي وقت
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ ...S, padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Large glow */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(13,148,136,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <h2 style={{
          fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 900,
          color: '#e2f8f6', lineHeight: 1.2, marginBottom: '20px',
          fontFamily: "'Cairo', sans-serif",
        }}>
          لا تخلي الشهر ينتهي
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #0d9488, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>قبل الفلوس</span>
        </h2>
        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 18px)', color: '#7ab8b3',
          marginBottom: '40px', lineHeight: 1.7,
          fontFamily: "'Cairo', sans-serif",
        }}>
          انضم لآلاف المغاربة اللي اختاروا يكونوا سيد على فلوسهم.
          <br />
          ابدأ اليوم — مجانًا.
        </p>
        <a href={APP_URL} style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #0d9488, #0f766e)',
          color: 'white', textDecoration: 'none',
          padding: '18px 48px', borderRadius: '40px',
          fontSize: '20px', fontWeight: 700,
          fontFamily: "'Cairo', sans-serif",
          boxShadow: '0 8px 40px rgba(13,148,136,0.5)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(13,148,136,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(13,148,136,0.5)'; }}
        >
          🚀 ابدأ دابا — مجانًا
        </a>

        {/* PWA badge */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          marginTop: '24px', color: '#7ab8b3', fontSize: '13px',
          fontFamily: "'Cairo', sans-serif",
        }}>
          <span>📱</span>
          <span>يشتغل على الموبايل بدون تنزيل — Progressive Web App</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      ...S,
      padding: '40px 24px',
      borderTop: '1px solid rgba(13,148,136,0.15)',
      background: 'rgba(3,13,12,0.9)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <img src="/logo.png" alt="Mizaniyti" style={{ height: '40px', width: 'auto', marginBottom: '20px' }} />
        <p style={{
          fontSize: '14px', color: '#7ab8b3',
          fontFamily: "'Cairo', sans-serif", marginBottom: '16px',
        }}>
          التطبيق المغربي الأول لتدبير الميزانية الشخصية بالدارجة
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {[
            { label: 'ابدأ دابا', href: APP_URL },
            { label: 'الخصوصية', href: '#' },
            { label: 'اتصل بنا', href: '#' },
          ].map((l, i) => (
            <a key={i} href={l.href} style={{
              fontSize: '14px', color: '#14b8a6', textDecoration: 'none',
              fontFamily: "'Cairo', sans-serif",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e2f8f6')}
              onMouseLeave={e => (e.currentTarget.style.color = '#14b8a6')}
            >{l.label}</a>
          ))}
        </div>
        <p style={{
          fontSize: '12px', color: '#4a7572',
          fontFamily: "'Inter', sans-serif",
        }}>
          © 2025 Mizaniyti. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}

/* ─── Page background gradient ─── */
const BG_STYLE: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 0,
  background: 'linear-gradient(180deg, #030d0c 0%, #061a18 40%, #030d0c 100%)',
  pointerEvents: 'none',
};

export default function App() {
  return (
    <>
      <div style={BG_STYLE} />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <SocialProofBar />
        <AppShowcase />
        <MoroccanToolkit />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
