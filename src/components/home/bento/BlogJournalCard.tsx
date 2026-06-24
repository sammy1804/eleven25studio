import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function BlogJournalCard() {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="col-span-2"
      style={{
        background: '#111111',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.12)' : '#1c1c1c'}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        cursor: 'pointer',
      }}
    >
      <Link to="/about" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Top content */}
        <div style={{ padding: '28px 28px 0' }}>
          {/* Tag + date row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                padding: '6px 14px',
                borderRadius: 999,
              }}
            >
              Behind the Frame
            </span>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <span
                style={{
                  background: '#1c1c1c',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 11,
                  padding: '6px 10px',
                  borderRadius: '8px 0 0 8px',
                }}
              >
                JUN
              </span>
              <span
                style={{
                  background: '#ffffff',
                  color: '#0a0a0a',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '6px 10px',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                15
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: '#ffffff',
              lineHeight: 1.2,
              margin: '0 0 10px',
            }}
          >
            Shooting in natural light: what no one tells you
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.8,
              margin: '0 0 20px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            Three years into architectural photography, I still learn something new every golden hour. Here's what the manuals leave out.
          </p>
        </div>

        {/* Full-bleed photo */}
        <div style={{ position: 'relative', marginTop: 'auto', overflow: 'hidden', borderRadius: '0 0 14px 14px' }}>
          <motion.img
            src="https://picsum.photos/seed/journal_cover/800/350"
            alt="Journal cover"
            loading="lazy"
            animate={{ scale: hov ? 1.03 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              aspectRatio: '16/7',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
              borderRadius: '0 0 14px 14px',
            }}
          />

          {/* Location tag */}
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 16,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 6,
            }}
          >
            <MapPin size={12} color="#ffffff" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 13, color: '#ffffff', margin: 0 }}>
                Bangalore, India
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.70)', margin: 0 }}>
                Golden hour, 6:15 PM
              </p>
            </div>
          </div>

          {/* Read more overlay */}
          <AnimatePresence>
            {hov && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: '#ffffff',
                  }}
                >
                  Read more →
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  )
}
