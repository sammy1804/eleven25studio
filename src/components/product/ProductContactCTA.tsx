import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const LOGOS = [
  'Meridian Co.', 'Kiln Studio', 'AthleteCore', 'Maison Dix',
  'Carry Co.', 'Earth & Fire', 'Frame House', 'Brew Lab',
  'Bare Studio', 'Raw Collective', 'Edge & Co.', 'SoundOne',
]

export default function ProductContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [cta1Hov, setCta1Hov] = useState(false)
  const [cta2Hov, setCta2Hov] = useState(false)

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }} ref={ref}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 24 }}
        >
          • Book a Shoot
        </motion.p>

        {/* Heading */}
        <div style={{ marginBottom: 36 }}>
          {["Ready to make your product", "impossible to ignore?"].map((line, i) => (
            <div key={line} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(32px, 4.5vw, 58px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#1A1A1A',
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(4rem, 8vh, 6rem)' }}
        >
          <a
            href="/contact"
            onMouseEnter={() => setCta1Hov(true)}
            onMouseLeave={() => setCta1Hov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.08em',
              color: '#ffffff',
              background: cta1Hov ? '#222222' : '#1A1A1A',
              padding: '14px 32px',
              borderRadius: 40,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Book a Shoot →
          </a>
          <a
            href="/contact"
            onMouseEnter={() => setCta2Hov(true)}
            onMouseLeave={() => setCta2Hov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: '0.08em',
              color: cta2Hov ? '#1A1A1A' : '#555555',
              border: `1px solid ${cta2Hov ? '#1A1A1A' : '#CCCCCC'}`,
              padding: '14px 32px',
              borderRadius: 40,
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            Request a Quote
          </a>
        </motion.div>

        {/* Client logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 20 }}>
            Brands we've worked with
          </p>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            {/* Fade edges */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to right, #ffffff, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to left, #ffffff, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
              style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content' }}
            >
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span
                  key={`${logo}-${i}`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 12,
                    color: '#CCCCCC',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    filter: 'grayscale(1)',
                  }}
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
