import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

/* ─── Design tokens ─────────────────────────────────────── */
const C = {
  white:   '#ffffff',
  dark:    '#1A1A1A',
  mid:     '#888888',
  red:     '#E0261A',
  overlay: '#0A0A0A',
  bg:      '#F8F7F4',
  bgDark:  '#111111',
}

/* ─── Data ──────────────────────────────────────────────── */
const STATS = [
  { num: 150, suffix: '+', label: 'Projects Delivered' },
  { num: 8,   suffix: 'yr', label: 'Years of Excellence' },
  { num: 40,  suffix: '+', label: 'Brand Clients' },
  { num: 12,  suffix: '',   label: 'Cities Covered' },
]

const CLIENTS = [
  'Prestige Group', 'Sobha Realty', 'Embassy Office Parks',
  'Tata Consultancy', 'Biocon', 'KPMG India', 'WeWork India',
  'Godrej Properties', 'Phoenix Mills', 'Capgemini',
]

const SERVICES = [
  {
    num: '01', title: 'Architecture', href: '/architecture',
    desc: 'Capturing the soul of spaces — from intimate interiors to grand facades. Every angle tells a story of design and intention.',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&auto=format&fit=crop',
  },
  {
    num: '02', title: 'Fashion', href: '/fashion',
    desc: 'Editorial campaigns and fashion photography that speak to culture, brand identity and the art of the garment.',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85&auto=format&fit=crop',
  },
  {
    num: '03', title: 'Corporate', href: '/corporate',
    desc: 'Brand films, product videos and executive portraits that elevate your professional presence.',
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=85&auto=format&fit=crop',
  },
  {
    num: '04', title: 'Events', href: '/events',
    desc: 'Full coverage for launches, galas and celebrations — every moment documented with artistry.',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85&auto=format&fit=crop',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Eleven25 transformed how we present our spaces. Their architectural photography redefined our entire marketing approach.',
    name: 'Rajan Mehta',
    company: 'Prestige Group, Bangalore',
  },
  {
    quote: 'The cinematic quality of their corporate films is unmatched. Our brand story has never been told so powerfully.',
    name: 'Priya Sharma',
    company: 'Embassy Office Parks',
  },
  {
    quote: 'Working with Eleven25 on our product launch was seamless. Professional, creative, and deeply attentive to detail.',
    name: 'Anil Kapoor',
    company: 'Biocon Ltd.',
  },
]

const HERO_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90&auto=format&fit=crop'

/* ─── Scroll-reveal wrapper ─────────────────────────────── */
function Reveal({ children, delay = 0, y = 28, className = '' }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Count-up stat ─────────────────────────────────────── */
function Stat({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(num, 1.8)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ borderTop: `1px solid rgba(26,26,26,0.12)`, paddingTop: 28 }}>
      <div style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(48px, 5.5vw, 80px)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: C.dark,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: C.mid,
        marginTop: 10,
      }}>
        {label}
      </div>
    </div>
  )
}

/* ─── Service card ──────────────────────────────────────── */
function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid rgba(26,26,26,0.1)`,
        padding: '36px 32px',
        cursor: 'pointer',
        minHeight: 220,
      }}
    >
      {/* Background image on hover */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${svc.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.72)' }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: hov ? 'rgba(255,255,255,0.5)' : C.mid,
          marginBottom: 16,
          transition: 'color 0.3s',
        }}>
          {svc.num}
        </div>

        <h3 style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(22px, 2.5vw, 34px)',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          lineHeight: 1.1,
          color: hov ? C.white : C.dark,
          marginBottom: 16,
          transition: 'color 0.3s',
        }}>
          {svc.title}
        </h3>

        <motion.p
          animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }}
          transition={{ duration: 0.35 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 20px',
            maxWidth: 300,
          }}
        >
          {svc.desc}
        </motion.p>

        <motion.div
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={svc.href}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.red,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Explore
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─── Testimonial row ───────────────────────────────────── */
function TestimonialRow({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        padding: '48px 0',
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: 40,
        alignItems: 'start',
      }}
    >
      <div style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(48px, 5vw, 72px)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: C.red,
        opacity: 0.6,
      }}>
        0{index + 1}
      </div>
      <div>
        <blockquote style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontStyle: 'italic',
          fontSize: 'clamp(17px, 2vw, 24px)',
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.88)',
          margin: '0 0 24px',
          letterSpacing: '-0.01em',
        }}>
          "{t.quote}"
        </blockquote>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
        }}>
          — {t.name} · {t.company}
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════ */
/*  HOME PAGE                                               */
/* ════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ background: C.bg, color: C.dark }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Left 55% — text */}
        <div style={{
          width: '55%',
          padding: 'clamp(100px, 12vh, 160px) clamp(40px, 6vw, 100px) 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
        }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: C.mid,
              marginBottom: 28,
            }}
          >
            Eleven25 Studios · Chennai
          </motion.p>

          {/* Headline */}
          <div style={{ overflow: 'hidden' }}>
            {['Visual', 'Stories', 'That'].map((word, i) => (
              <div key={word} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(56px, 8.5vw, 130px)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    textTransform: 'uppercase',
                    color: C.dark,
                  }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(56px, 8.5vw, 130px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: C.red,
                }}
              >
                Endure.
              </motion.div>
            </div>
          </div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 48 }}
          >
            <Link
              to="/architecture"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: C.white,
                background: C.dark,
                padding: '14px 28px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              View Work
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </Link>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.mid, lineHeight: 1.6, maxWidth: 200, margin: 0 }}>
              Architecture · Fashion · Events · Corporate
            </p>
          </motion.div>
        </div>

        {/* Right 45% — image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '45%', position: 'relative', overflow: 'hidden' }}
        >
          <img
            src={HERO_IMAGE}
            alt="Eleven25 Studios — Architecture Photography"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Subtle overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(248,247,244,0.12) 0%, transparent 30%)' }} />
        </motion.div>
      </section>

      {/* ══ STATS ════════════════════════════════════════ */}
      <section style={{ padding: '100px clamp(40px, 6vw, 100px)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, borderTop: `1px solid rgba(26,26,26,0.08)` }}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <Stat num={s.num} suffix={s.suffix} label={s.label} />
          </Reveal>
        ))}
      </section>

      {/* ══ CLIENTS MARQUEE ══════════════════════════════ */}
      <section style={{ padding: '60px 0', borderTop: `1px solid rgba(26,26,26,0.08)`, overflow: 'hidden' }}>
        <Reveal>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: C.mid,
            textAlign: 'center',
            marginBottom: 32,
          }}>
            Trusted By
          </p>
        </Reveal>
        <div
          style={{ display: 'flex', overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            style={{ display: 'flex', gap: 72, whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(14px, 1.4vw, 18px)',
                  letterSpacing: '-0.01em',
                  color: 'rgba(26,26,26,0.25)',
                  textTransform: 'uppercase',
                }}
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════ */}
      <section style={{ padding: '120px clamp(40px, 6vw, 100px)', borderTop: `1px solid rgba(26,26,26,0.08)` }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 64, alignItems: 'end' }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.mid, marginBottom: 16 }}>
              What We Create
            </p>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 5.5vw, 80px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: C.dark,
              margin: 0,
            }}>
              Our<br />Services.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              lineHeight: 1.75,
              color: C.mid,
              maxWidth: 480,
              margin: 0,
            }}>
              We are a full-service photography and film studio based in Chennai, specialising in architecture, fashion, corporate branding and events. Every project is approached with intention and craft.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 2 }}>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2 }}>
            <ServiceCard svc={SERVICES[0]} index={0} />
            <ServiceCard svc={SERVICES[2]} index={2} />
          </div>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2 }}>
            <ServiceCard svc={SERVICES[1]} index={1} />
            <ServiceCard svc={SERVICES[3]} index={3} />
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════ */}
      <section style={{ background: C.bgDark, padding: '120px clamp(40px, 6vw, 100px)' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              Client Voices
            </p>
            <div style={{ width: 40, height: 1, background: C.red, opacity: 0.6 }} />
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: C.white,
            margin: '0 0 80px',
          }}>
            What Clients<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>Say.</em>
          </h2>
        </Reveal>

        {TESTIMONIALS.map((t, i) => (
          <TestimonialRow key={i} t={t} index={i} />
        ))}
      </section>

      {/* ══ CONTACT CTA ══════════════════════════════════ */}
      <section style={{ padding: '120px clamp(40px, 6vw, 100px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', borderTop: `1px solid rgba(26,26,26,0.08)` }}>
        <Reveal>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.mid, marginBottom: 24 }}>
            Start a Project
          </p>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 5.5vw, 80px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: C.dark,
            margin: '0 0 40px',
          }}>
            Let's Create<br />Something<br /><span style={{ color: C.red }}>Remarkable.</span>
          </h2>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.white,
              background: C.dark,
              padding: '16px 32px',
              textDecoration: 'none',
            }}
          >
            Get In Touch
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Link>
        </Reveal>

        {/* Info tiles */}
        <Reveal delay={0.12}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[
              { label: 'Email', value: 'hello@eleven25studios.com' },
              { label: 'Location', value: 'Chennai, India' },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Hours', value: 'Mon – Sat, 9am – 7pm' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(26,26,26,0.04)',
                  padding: '28px 24px',
                  borderTop: `2px solid ${C.dark}`,
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.mid, marginBottom: 8 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 13, color: C.dark, lineHeight: 1.4 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <footer style={{ background: C.overlay, color: C.white, overflow: 'hidden' }}>
        {/* Big type */}
        <div style={{ padding: '80px clamp(40px, 6vw, 100px) 0', overflow: 'hidden' }}>
          <Reveal y={40}>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(80px, 18vw, 280px)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.06)',
              userSelect: 'none',
            }}>
              ELEVEN
              <span style={{ color: C.red, opacity: 0.5 }}>25</span>
            </div>
          </Reveal>
        </div>

        {/* Utility grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, padding: '60px clamp(40px, 6vw, 100px) 48px', borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {/* Brand col */}
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em', marginBottom: 16 }}>
              ELEVEN<span style={{ color: C.red }}>25</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, margin: 0 }}>
              Photography & Film Studio<br />Chennai, India
            </p>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>Services</p>
            {['Architecture', 'Fashion', 'Corporate', 'Events'].map((s) => (
              <div key={s} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{s}</div>
            ))}
          </div>

          {/* Studio */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>Studio</p>
            {[['About', '/about'], ['Gallery', '/gallery'], ['Services', '/services'], ['Contact', '/contact']].map(([label, href]) => (
              <div key={label} style={{ marginBottom: 8 }}>
                <Link to={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{label}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>Contact</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>hello@eleven25studios.com</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>+91 98765 43210</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['IG', 'LI', 'YT'].map((s) => (
                <span key={s} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ padding: '20px clamp(40px, 6vw, 100px)', borderTop: `1px solid rgba(255,255,255,0.06)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.2)', margin: 0, letterSpacing: '0.08em' }}>
            © 2025 Eleven25 Studios. All rights reserved.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.2)', margin: 0, letterSpacing: '0.08em' }}>
            Chennai · India
          </p>
        </div>
      </footer>
    </div>
  )
}
