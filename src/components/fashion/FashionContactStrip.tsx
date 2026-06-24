import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const BLUE = '#3D7BFF'

const HEADING_WORDS = ["Let's", 'build', 'your', 'visual', 'identity.']

export default function FashionContactStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [ctaHov, setCtaHov] = useState(false)
  const [secHov, setSecHov] = useState(false)

  return (
    <section
      ref={ref}
      style={{
        background: '#0A0A0A',
        padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle blue glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(61,123,255,0.07) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: BLUE,
            marginBottom: 28,
          }}
        >
          • Work With Us
        </motion.p>

        {/* Word-by-word heading */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
          {HEADING_WORDS.map((word, i) => (
            <div key={word + i} style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(40px, 6vw, 80px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 520,
            marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
          }}
        >
          From editorial shoots to full brand campaigns — we bring the
          aesthetic precision that fashion demands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
        >
          {/* Primary — filled blue */}
          <a
            href="/contact"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: '#ffffff',
              background: ctaHov ? '#2B65E8' : BLUE,
              padding: '14px 28px',
              borderRadius: 2,
              transition: 'background 0.25s',
            }}
          >
            Start a Project ↗
          </a>

          {/* Secondary — outline */}
          <a
            href="/gallery"
            onMouseEnter={() => setSecHov(true)}
            onMouseLeave={() => setSecHov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: secHov ? '#ffffff' : 'rgba(255,255,255,0.55)',
              border: `1px solid ${secHov ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)'}`,
              padding: '14px 28px',
              borderRadius: 2,
              transition: 'color 0.25s, border-color 0.25s',
            }}
          >
            View Full Gallery
          </a>
        </motion.div>
      </div>
    </section>
  )
}
