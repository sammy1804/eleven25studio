import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile'

const GOLD = '#C9A35F'

export default function ArchContactStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()

  return (
    <section style={{ background: '#F5F4F1', padding: isMobile ? '60px 20px' : '80px clamp(40px, 6vw, 100px)' }}>
      <div
        ref={ref}
        style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 'clamp(40px, 6vw, 80px)', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 20 }}
          >
            • WORK WITH US
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 'clamp(28px, 4vw, 52px)', color: '#1A1A1A', letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 20px' }}
          >
            "Let's document your next project."
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: '#888888', lineHeight: 1.8, maxWidth: 400 }}
          >
            We work with architects, developers, and interior designers across India and internationally.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: isMobile ? 'flex-start' : 'flex-end' }}
        >
          <a href="mailto:hello@eleven25studios.com?subject=Book a Shoot"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: '0.06em', color: '#ffffff', background: '#1A1A1A', padding: '14px 32px', borderRadius: 40, textDecoration: 'none', transition: 'background 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2e2e2e')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}>
            Book a Shoot →
          </a>
          <a href="mailto:hello@eleven25studios.com?subject=Request Portfolio"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.06em', color: '#1A1A1A', background: 'transparent', border: '1px solid rgba(26,26,26,0.3)', padding: '13px 32px', borderRadius: 40, textDecoration: 'none', transition: 'border-color 0.25s, color 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,26,0.3)'; e.currentTarget.style.color = '#1A1A1A' }}>
            Request Portfolio
          </a>
          <Link to="/contact"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 12, color: '#888888', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = '#888888')}>
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
