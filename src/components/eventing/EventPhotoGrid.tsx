import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const PURPLE = '#A78BFA'
const BOUNCE = [0.34, 1.56, 0.64, 1] as const

type EventType = 'All' | 'Corporate' | 'Award Nights' | 'Launches' | 'Cultural'

const TABS: EventType[] = ['All', 'Corporate', 'Award Nights', 'Launches', 'Cultural']

interface Photo {
  id: number
  src: string
  tag: string
  type: EventType
  height: number
}

const PHOTOS: Photo[] = [
  // Corporate (5)
  { id: 1,  src: 'https://picsum.photos/seed/ev_g1/400/520',  tag: 'Corporate',    type: 'Corporate',     height: 260 },
  { id: 2,  src: 'https://picsum.photos/seed/ev_g2/400/600',  tag: 'Corporate',    type: 'Corporate',     height: 320 },
  { id: 3,  src: 'https://picsum.photos/seed/ev_g3/400/480',  tag: 'Corporate',    type: 'Corporate',     height: 240 },
  { id: 4,  src: 'https://picsum.photos/seed/ev_g4/400/560',  tag: 'Corporate',    type: 'Corporate',     height: 280 },
  { id: 5,  src: 'https://picsum.photos/seed/ev_g5/400/440',  tag: 'Corporate',    type: 'Corporate',     height: 220 },
  // Award Nights (4)
  { id: 6,  src: 'https://picsum.photos/seed/ev_g6/400/600',  tag: 'Award Night',  type: 'Award Nights',  height: 300 },
  { id: 7,  src: 'https://picsum.photos/seed/ev_g7/400/520',  tag: 'Award Night',  type: 'Award Nights',  height: 260 },
  { id: 8,  src: 'https://picsum.photos/seed/ev_g8/400/480',  tag: 'Award Night',  type: 'Award Nights',  height: 240 },
  { id: 9,  src: 'https://picsum.photos/seed/ev_g9/400/560',  tag: 'Award Night',  type: 'Award Nights',  height: 280 },
  // Networking (4 — mapped to Launches for filter)
  { id: 10, src: 'https://picsum.photos/seed/ev_g10/400/440', tag: 'Networking',   type: 'Launches',      height: 220 },
  { id: 11, src: 'https://picsum.photos/seed/ev_g11/400/520', tag: 'Networking',   type: 'Launches',      height: 260 },
  // Launches (4)
  { id: 12, src: 'https://picsum.photos/seed/ev_g12/400/600', tag: 'Launch Event', type: 'Launches',      height: 300 },
  { id: 13, src: 'https://picsum.photos/seed/ev_g13/400/480', tag: 'Launch Event', type: 'Launches',      height: 240 },
  { id: 14, src: 'https://picsum.photos/seed/ev_g14/400/560', tag: 'Launch Event', type: 'Launches',      height: 280 },
  { id: 15, src: 'https://picsum.photos/seed/ev_g15/400/440', tag: 'Launch Event', type: 'Launches',      height: 220 },
  // Cultural (3)
  { id: 16, src: 'https://picsum.photos/seed/ev_g16/400/600', tag: 'Cultural',     type: 'Cultural',      height: 300 },
  { id: 17, src: 'https://picsum.photos/seed/ev_g17/400/520', tag: 'Cultural',     type: 'Cultural',      height: 260 },
  { id: 18, src: 'https://picsum.photos/seed/ev_g18/400/560', tag: 'Cultural',     type: 'Cultural',      height: 280 },
  // Extras
  { id: 19, src: 'https://picsum.photos/seed/ev_g19/400/480', tag: 'Corporate',    type: 'Corporate',     height: 240 },
  { id: 20, src: 'https://picsum.photos/seed/ev_g20/400/440', tag: 'Cultural',     type: 'Cultural',      height: 220 },
]

function PhotoCard({ photo, delay = 0 }: { photo: Photo; delay?: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', height: photo.height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={photo.src}
        alt={photo.tag}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        animate={{
          scale: hovered ? 1.04 : 1,
          filter: hovered ? 'brightness(1.0)' : 'brightness(0.88)',
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Tag pill — always visible at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 40,
          padding: '3px 10px',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 10,
          color: '#1A1A1A',
          letterSpacing: '0.05em',
        }}
      >
        {photo.tag}
      </div>
    </motion.div>
  )
}

export default function EventPhotoGrid() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const [active, setActive] = useState<EventType>('All')
  const isMobile = useIsMobile()

  const filtered = active === 'All' ? PHOTOS : PHOTOS.filter(p => p.type === active)

  // Split into columns: 2 on mobile, 4 on desktop
  const numCols = isMobile ? 2 : 4
  const cols: Photo[][] = Array.from({ length: numCols }, () => [])
  filtered.forEach((p, i) => cols[i % numCols].push(p))

  return (
    <section
      id="event-gallery"
      style={{ background: '#ffffff', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: PURPLE, marginBottom: 10 }}>
            • Event Photography
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(26px, 3vw, 42px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
              Moments that don't repeat.
            </h2>
            <div style={{ height: 1, flex: 1, background: '#EBEBEB' }} />
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #EBEBEB', marginBottom: 20 }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: active === tab ? `2px solid ${PURPLE}` : '2px solid transparent',
                marginBottom: -1,
                padding: '10px 20px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: active === tab ? '#1A1A1A' : '#888888',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4-col masonry */}
        <AnimatePresence mode="popLayout">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 4, alignItems: 'start' }}>
            {cols.map((col, ci) => (
              <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {col.map((photo, pi) => (
                  <PhotoCard key={photo.id} photo={photo} delay={pi * 0.04} />
                ))}
              </div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  )
}
