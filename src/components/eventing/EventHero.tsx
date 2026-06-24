import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const PURPLE = '#A78BFA'
const BOUNCE = [0.34, 1.56, 0.64, 1] as const

const HERO_IMAGES = [
  'https://picsum.photos/seed/ev_h1/500/700',
  'https://picsum.photos/seed/ev_h2/500/700',
  'https://picsum.photos/seed/ev_h3/500/700',
]

export default function EventHero() {
  const [ctaHov, setCtaHov] = useState(false)
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#ffffff',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vh, 120px) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 4vw, 5rem)' }}>

        {/* Left — text */}
        <div style={{ flex: isMobile ? '1 1 auto' : '0 0 45%', maxWidth: isMobile ? '100%' : '45%' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: PURPLE,
              marginBottom: 24,
            }}
          >
            • EVENTING
          </motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 24 }}>
            {['Every event', 'deserves to be', 'remembered.'].map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.09, ease: BOUNCE }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(44px, 5.5vw, 76px)',
                    lineHeight: 1.0,
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.9,
              color: '#888888',
              maxWidth: 340,
              marginBottom: 36,
            }}
          >
            Corporate conferences, award nights, cultural gatherings,
            and intimate celebrations — we capture the energy
            in the room, not just the moments on stage.
          </motion.p>

          <motion.a
            href="#event-gallery"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
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
            View Event Gallery ↓
          </motion.a>
        </div>

        {/* Right — collage (hidden on mobile) */}
        {!isMobile && <div
          style={{
            flex: '0 0 55%',
            position: 'relative',
            height: 560,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left photo */}
          <motion.div
            initial={{ rotate: -10, opacity: 0, x: -40, y: 20 }}
            animate={{ rotate: -4, opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: BOUNCE }}
            style={{
              position: 'absolute',
              left: '0%',
              top: '50%',
              transform: 'translateY(-50%) rotate(-4deg)',
              width: 300,
              height: 380,
              zIndex: 1,
              border: '3px solid white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
              overflow: 'hidden',
            }}
          >
            <img
              src={HERO_IMAGES[0]}
              alt="Event moment 1"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>

          {/* Center photo */}
          <motion.div
            initial={{ rotate: 6, opacity: 0, y: 40 }}
            animate={{ rotate: 0, opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.55, ease: BOUNCE }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 380,
              height: 520,
              zIndex: 2,
              border: '3px solid white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}
          >
            <img
              src={HERO_IMAGES[1]}
              alt="Event moment 2"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>

          {/* Right photo */}
          <motion.div
            initial={{ rotate: -2, opacity: 0, x: 40, y: 20 }}
            animate={{ rotate: 3, opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: BOUNCE }}
            style={{
              position: 'absolute',
              right: '0%',
              top: '50%',
              transform: 'translateY(-50%) rotate(3deg)',
              width: 260,
              height: 360,
              zIndex: 1,
              border: '3px solid white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
              overflow: 'hidden',
            }}
          >
            <img
              src={HERO_IMAGES[2]}
              alt="Event moment 3"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>

          {/* Ground shadow */}
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 320,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.08)',
              filter: 'blur(16px)',
              zIndex: 0,
            }}
          />
        </div>}

      </div>
    </section>
  )
}
