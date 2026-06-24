import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const HEADING_WORDS = ['Got', 'a', 'project', 'in', 'mind?']

export default function AboutCollaborate() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [ctaHov, setCtaHov] = useState(false)
  const [emailHov, setEmailHov] = useState(false)

  return (
    <section
      ref={ref}
      style={{
        background: '#0A0A0A',
        padding: 'clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gold glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,163,95,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 32 }}
        >
          • Work Together
        </motion.p>

        {/* Word-by-word heading */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', justifyContent: 'center', marginBottom: 32 }}>
          {HEADING_WORDS.map((word, i) => (
            <div key={word + i} style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 5.5vw, 64px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.55, ease: EASE }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 480,
            margin: '0 auto 40px',
          }}
        >
          Architecture commissions, fashion campaigns, event coverage, product shoots —
          or if you've got an idea that doesn't fit a category, even better.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
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
              fontSize: 13,
              letterSpacing: '0.08em',
              color: '#1A1A1A',
              background: ctaHov ? 'rgba(255,255,255,0.9)' : '#ffffff',
              padding: '14px 36px',
              borderRadius: 40,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Get in Touch →
          </a>

          <a
            href="mailto:eleven25studios@gmail.com"
            onMouseEnter={() => setEmailHov(true)}
            onMouseLeave={() => setEmailHov(false)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: GOLD,
              textDecoration: emailHov ? 'underline' : 'none',
              transition: 'text-decoration 0.2s',
            }}
          >
            eleven25studios@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
