import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const GOLD = '#0096E6'

const PROJECTS = [
  { name: 'The Cube House',    location: 'Bangalore, Tamil Nadu',      seed: 'ext1' },
  { name: 'Glass Pavilion',    location: 'Kochi, Kerala',            seed: 'ext2' },
  { name: 'Desert Residence',  location: 'Jodhpur, Rajasthan',       seed: 'ext3' },
  { name: 'Riverside Studio',  location: 'Bengaluru, Karnataka',     seed: 'ext4' },
  { name: 'The Black Box',     location: 'Mumbai, Maharashtra',      seed: 'ext5' },
  { name: 'Concrete Garden',   location: 'Auroville, Tamil Nadu',    seed: 'ext6' },
]

function ExteriorCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 30vw, 420px)',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
        <motion.img
          src={`https://picsum.photos/seed/${project.seed}/420/560`}
          alt={project.name}
          loading="lazy"
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          animate={{
            filter: hov ? 'brightness(1)' : 'brightness(0.8)',
            scale: hov ? 1.03 : 1,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gold bottom border slide-in */}
        <motion.div
          initial={false}
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: GOLD,
            transformOrigin: 'left center',
          }}
        />
      </div>

      {/* Label */}
      <div style={{ paddingTop: 14, paddingBottom: 4 }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 4 }}>
          {project.name}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', letterSpacing: '0.04em' }}>
          {project.location}
        </p>
      </div>
    </motion.div>
  )
}

export default function ExteriorScroll() {
  const headerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const [showDragHint, setShowDragHint] = useState(true)

  // Drag-to-scroll state
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const velX = useRef(0)
  const lastX = useRef(0)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setShowDragHint(false), 2200)
    return () => clearTimeout(t)
  }, [])

  const applyInertia = useCallback(() => {
    if (!scrollRef.current) return
    velX.current *= 0.92
    scrollRef.current.scrollLeft += velX.current
    if (Math.abs(velX.current) > 0.5) {
      animRef.current = requestAnimationFrame(applyInertia)
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return
    if (animRef.current) cancelAnimationFrame(animRef.current)
    isDragging.current = true
    startX.current = e.clientX
    lastX.current = e.clientX
    startScrollLeft.current = scrollRef.current.scrollLeft
    velX.current = 0
    scrollRef.current.style.cursor = 'grabbing'
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const dx = e.clientX - startX.current
    velX.current = e.clientX - lastX.current
    lastX.current = e.clientX
    scrollRef.current.scrollLeft = startScrollLeft.current - dx
  }

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    velX.current = -velX.current * 2.5
    animRef.current = requestAnimationFrame(applyInertia)
  }

  return (
    <section id="exterior" style={{ padding: 'clamp(80px, 10vh, 120px) 0', background: '#ffffff', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '0 clamp(40px, 6vw, 100px)', marginBottom: 'clamp(32px, 5vh, 56px)' }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD }}>
            • EXTERIOR
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', letterSpacing: '0.06em' }}>
            12 Projects
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderBottom: '1px solid rgba(26,26,26,0.08)', paddingBottom: 24 }}
        >
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 'clamp(22px, 3vw, 32px)', color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Spaces as they meet the world.
          </p>
        </motion.div>
      </div>

      {/* Drag hint */}
      <AnimatePresence>
        {showDragHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              color: '#aaaaaa',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 16,
              pointerEvents: 'none',
            }}
          >
            ← Drag →
          </motion.p>
        )}
      </AnimatePresence>

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          display: 'flex',
          gap: 3,
          overflowX: 'scroll',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: 'grab',
          paddingLeft: 'clamp(40px, 6vw, 100px)',
          paddingRight: 'clamp(40px, 6vw, 100px)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ExteriorCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
