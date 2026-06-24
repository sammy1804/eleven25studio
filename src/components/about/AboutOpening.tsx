import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const QUOTE_LINES = [
  '"I became a photographer',
  'because architecture taught me',
  'how to see."',
]

export default function AboutOpening() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vh, 120px) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Portrait — absolute right (hidden on mobile) */}
      {!isMobile && <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: EASE }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '30vw',
          minWidth: 280,
          pointerEvents: 'none',
        }}
      >
        {/* Gradient fade — dark on left, transparent right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.4) 40%, transparent 100%)',
            zIndex: 1,
          }}
        />
        <img
          src="https://picsum.photos/seed/sadiq_p/500/900"
          alt="Sadiq Patel"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            filter: 'brightness(0.7) grayscale(20%)',
          }}
        />
      </motion.div>}

      {/* Centered content */}
      <div ref={ref} style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800 }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: GOLD,
            marginBottom: 36,
          }}
        >
          • Sadiq Patel
        </motion.p>

        <div style={{ marginBottom: 36 }}>
          {QUOTE_LINES.map((line, i) => (
            <div key={line} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: 'clamp(28px, 4.5vw, 60px)',
                  lineHeight: 1.2,
                  color: '#ffffff',
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.05em',
          }}
        >
          Architect. Photographer. Filmmaker. Founder of Eleven25 Studios.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 20,
          lineHeight: 1,
          zIndex: 2,
        }}
      >
        ↓
      </motion.div>
    </section>
  )
}
