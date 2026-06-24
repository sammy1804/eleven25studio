import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GOLD = '#C9A35F'
const HEADLINE_WORDS = ['Spaces.', 'Designed.', 'Documented.']
const ANCHORS = [
  { label: 'Exterior Photography', href: '#exterior' },
  { label: 'Interior Photography', href: '#interior' },
  { label: 'Architecture Films',   href: '#films' },
]

export default function ArchHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [arrowHov, setArrowHov] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Right image parallax at 0.4x scroll speed
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden' }}
    >
      {/* Main split */}
      <div style={{ flex: 1, display: 'flex', minHeight: '100vh' }}>
        {/* Left 50% */}
        <div style={{
          width: '50%',
          padding: 'clamp(120px, 14vh, 180px) clamp(40px, 6vw, 100px) clamp(60px, 8vh, 100px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 28 }}
          >
            • ARCHITECTURE
          </motion.p>

          {/* Headline — words stagger slide up */}
          <div style={{ marginBottom: 32 }}>
            {HEADLINE_WORDS.map((word, i) => (
              <div key={word} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(56px, 7vw, 100px)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#1A1A1A',
                  }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 14,
              lineHeight: 1.9,
              color: '#888888',
              maxWidth: 360,
              marginBottom: 36,
            }}
          >
            We capture architecture with precision and purpose.
            Every frame is composed with an architect's eye —
            understanding proportion, material, and light.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#exterior"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setArrowHov(true)}
            onMouseLeave={() => setArrowHov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: arrowHov ? 14 : 8,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.1em',
              color: '#1A1A1A',
              textDecoration: 'none',
              transition: 'gap 0.3s ease',
            }}
          >
            Explore Projects
            <motion.span
              animate={{ x: arrowHov ? 6 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'inline-block' }}
            >
              →
            </motion.span>
          </motion.a>
        </div>

        {/* Right 50% — parallax image */}
        <div style={{ width: '50%', position: 'relative', overflow: 'hidden' }}>
          <motion.img
            src="https://picsum.photos/seed/arch_hero_v2/700/900"
            alt="Architecture — Eleven25 Studios"
            style={{
              position: 'absolute',
              top: '-10%',
              left: 0,
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              filter: 'brightness(0.85)',
              y: imgY,
            }}
          />
        </div>
      </div>

      {/* Anchor nav bottom */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          padding: '20px 40px',
          borderTop: '1px solid rgba(26,26,26,0.07)',
          background: '#ffffff',
          flexWrap: 'wrap',
        }}
      >
        {ANCHORS.map((anchor, i) => (
          <span key={anchor.href} style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href={anchor.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#888888',
                textDecoration: 'none',
                padding: '0 20px',
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = '#888888')}
            >
              {anchor.label}
            </a>
            {i < ANCHORS.length - 1 && (
              <span style={{ color: 'rgba(26,26,26,0.2)', fontSize: 11, fontWeight: 300 }}>|</span>
            )}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
