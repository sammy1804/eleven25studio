import { useState } from 'react'
import { motion } from 'framer-motion'

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
}

const MARQUEE_TEXT = 'Architecture Photography · Architecture Films · Fashion · Eventing · Product ·'

export default function MarqueeServicesCard() {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#161616' : '#0D0D0D',
        border: '1px solid #1c1c1c',
        borderRadius: 16,
        padding: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: 160,
        transition: 'background 0.4s',
        position: 'relative',
      }}
    >
      {/* Watermark + text stack */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Watermark */}
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: hov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            textAlign: 'center',
            userSelect: 'none',
            pointerEvents: 'none',
            transition: 'color 0.4s',
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ELEVEN25
        </div>

        {/* Foreground text */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Four ways to
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 16,
              color: 'rgba(255,255,255,0.50)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            tell your story.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div
        style={{
          overflow: 'hidden',
          marginTop: 16,
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marqueeScroll 20s linear infinite',
          }}
        >
          {[0, 1].map((rep) => (
            <span
              key={rep}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                paddingRight: 40,
                whiteSpace: 'nowrap',
              }}
            >
              {MARQUEE_TEXT.split('·').map((segment, i, arr) => (
                <span key={i}>
                  {segment.trim()}
                  {i < arr.length - 1 && (
                    <span style={{ color: '#0096E6', padding: '0 8px' }}>·</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  )
}
