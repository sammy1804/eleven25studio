import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { useIsMobile } from '../hooks/useIsMobile'
import HomeHeroScroll from '../components/HomeHeroScroll'
import StatsBento from '../components/home/StatsBento'
import ServicesScrollSection from '../components/home/ServicesScrollSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FooterSection from '../components/FooterSection'

/* ─── Design tokens ─────────────────────────────────────── */
const C = {
  white:   '#ffffff',
  dark:    '#1A1A1A',
  mid:     '#888888',
  red:     '#0096E6',
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


/* ════════════════════════════════════════════════════════ */
/*  HOME PAGE                                               */
/* ════════════════════════════════════════════════════════ */
export default function Home() {
  const isMobile = useIsMobile()
  return (
    <div style={{ background: C.bg, color: C.dark }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <HomeHeroScroll />

      {/* ══ STATS BENTO ══════════════════════════════════ */}
      <StatsBento />

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
      <ServicesScrollSection />

      {/* ══ TESTIMONIALS ═════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══ CONTACT CTA ══════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '72px 24px' : '120px clamp(40px, 6vw, 100px)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 48 : 80,
        alignItems: 'center',
        borderTop: `1px solid rgba(26,26,26,0.08)`,
      }}>
        <Reveal>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.mid, marginBottom: 24 }}>
            Start a Project
          </p>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 1.0,
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
              { label: 'Location', value: 'Bangalore, India' },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Hours', value: 'Mon – Sat, 9am – 7pm' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(26,26,26,0.04)',
                  padding: isMobile ? '20px 16px' : '28px 24px',
                  borderTop: `2px solid ${C.dark}`,
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.mid, marginBottom: 8 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: isMobile ? 12 : 13, color: C.dark, lineHeight: 1.4 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <FooterSection />
    </div>
  )
}
