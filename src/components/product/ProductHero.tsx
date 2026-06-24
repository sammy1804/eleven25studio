import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const HERO_IMAGES = [
  'https://picsum.photos/seed/prod_h1/400/400',
  'https://picsum.photos/seed/prod_h2/400/400',
  'https://picsum.photos/seed/prod_h3/400/400',
  'https://picsum.photos/seed/prod_h4/400/400',
]

function HeroCell({ src, delay }: { src: string; delay: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        aspectRatio: '1/1',
        overflow: 'hidden',
        cursor: 'pointer',
        outline: hov ? `1.5px solid ${GOLD}` : '1.5px solid transparent',
        transition: 'outline-color 0.3s',
      }}
    >
      <motion.img
        src={src}
        alt="Product"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        animate={{ scale: hov ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </motion.div>
  )
}

export default function ProductHero() {
  const [cta1Hov, setCta1Hov] = useState(false)
  const [cta2Hov, setCta2Hov] = useState(false)

  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        background: '#F5F4F1',
        padding: 'clamp(80px, 10vh, 120px) clamp(1.5rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 4vw, 6rem)' }}>

        {/* Left — 45% */}
        <div style={{ flex: '0 0 45%', maxWidth: '45%' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 22 }}
          >
            • PRODUCT
          </motion.p>

          <div style={{ marginBottom: 24 }}>
            {['Products that', 'sell themselves.'].map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.2 + i * 0.08, ease: EASE }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(44px, 5.5vw, 80px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    color: '#1A1A1A',
                  }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.8, color: '#888888', maxWidth: 340, marginBottom: 36 }}
          >
            Commercial photography and e-commerce content for brands
            that understand a great product image is the difference
            between a scroll and a sale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a
              href="#commercial"
              onMouseEnter={() => setCta1Hov(true)}
              onMouseLeave={() => setCta1Hov(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '0.08em',
                color: '#ffffff',
                background: cta1Hov ? '#222222' : '#1A1A1A',
                padding: '13px 28px',
                borderRadius: 40,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              View All Work →
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
                fontSize: 12,
                letterSpacing: '0.08em',
                color: cta2Hov ? '#1A1A1A' : '#555555',
                border: `1px solid ${cta2Hov ? '#1A1A1A' : '#CCCCCC'}`,
                padding: '13px 28px',
                borderRadius: 40,
                textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              Book a Shoot
            </a>
          </motion.div>
        </div>

        {/* Right — 55% 2×2 grid */}
        <div style={{ flex: '0 0 55%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {HERO_IMAGES.map((src, i) => (
            <HeroCell key={src} src={src} delay={0.15 + i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}
