import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const BLUE = '#3D7BFF'

const HERO_IMAGES = [
  'https://picsum.photos/seed/fash_h1/600/800',
  'https://picsum.photos/seed/fash_h2/600/800',
  'https://picsum.photos/seed/fash_h3/600/800',
]

export default function FashionHero() {
  const [hoveredImg, setHoveredImg] = useState<number | null>(null)
  const [ctaHov, setCtaHov] = useState(false)
  const isMobile = useIsMobile()

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden' }}>

      {/* Top — 3 images */}
      <div style={{ height: isMobile ? '45vw' : '60vh', minHeight: isMobile ? 180 : undefined, display: 'flex', gap: 0 }}>
        {HERO_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredImg(i)}
            onMouseLeave={() => setHoveredImg(null)}
            style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
          >
            <motion.img
              src={src}
              alt={`Fashion ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              animate={{
                scale: hoveredImg === i ? 1.03 : 1,
                filter: hoveredImg !== null && hoveredImg !== i
                  ? 'brightness(0.55) saturate(0.6)'
                  : 'brightness(0.9) saturate(1)',
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom — text */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 20 : 40,
        padding: isMobile ? '28px 20px' : 'clamp(32px, 5vh, 56px) clamp(32px, 5vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: BLUE, marginBottom: 20 }}
          >
            • FASHION
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            {['Image is', 'everything.'].map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.45 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(48px, 6.5vw, 88px)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#1A1A1A',
                  }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: '#888888', maxWidth: 340, margin: 0 }}>
            Editorial campaigns, fashion photography, and brand
            collaborations for designers, stylists, and labels
            who understand that image is their primary currency.
          </p>
          <a
            href="#editorial"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: ctaHov ? 12 : 8,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.08em',
              color: '#1A1A1A',
              textDecoration: 'none',
              transition: 'gap 0.3s',
            }}
          >
            Explore Work ↓
          </a>
        </motion.div>
      </div>
    </section>
  )
}
