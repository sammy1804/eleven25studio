import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STRIP_IMAGES = [
  'https://picsum.photos/seed/fs1/480/640',
  'https://picsum.photos/seed/fs2/480/640',
  'https://picsum.photos/seed/fs3/480/640',
  'https://picsum.photos/seed/fs4/480/640',
  'https://picsum.photos/seed/fs5/480/640',
  'https://picsum.photos/seed/fs6/480/640',
  'https://picsum.photos/seed/fs7/480/640',
  'https://picsum.photos/seed/fs8/480/640',
]

export default function FashionScrollStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)
  const velX = useRef(0)
  const lastX = useRef(0)
  const rafId = useRef<number | null>(null)

  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true
      startX.current = e.clientX
      scrollStart.current = el.scrollLeft
      lastX.current = e.clientX
      velX.current = 0
      el.setPointerCapture(e.pointerId)
      el.style.cursor = 'grabbing'
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - startX.current
      el.scrollLeft = scrollStart.current - dx
      velX.current = e.clientX - lastX.current
      lastX.current = e.clientX
    }

    const onPointerUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      el.style.cursor = 'grab'
      const inertia = () => {
        if (Math.abs(velX.current) < 0.5) return
        el.scrollLeft -= velX.current
        velX.current *= 0.92
        rafId.current = requestAnimationFrame(inertia)
      }
      rafId.current = requestAnimationFrame(inertia)
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#0A0A0A', padding: 'clamp(3rem, 6vh, 5rem) 0', overflow: 'hidden' }}
    >
      {/* Label row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.5rem, 5vw, 5rem)',
          marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
        }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3D7BFF', margin: 0 }}>
          Behind the Frame
        </p>
        <motion.p
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.05em' }}
        >
          ← Drag →
        </motion.p>
      </motion.div>

      {/* Scrollable track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'scroll',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            cursor: 'grab',
            padding: '0 clamp(1.5rem, 5vw, 5rem)',
            userSelect: 'none',
          }}
        >
          {STRIP_IMAGES.map((src, i) => (
            <div
              key={src}
              style={{
                flex: '0 0 280px',
                height: 380,
                overflow: 'hidden',
                filter: 'grayscale(100%) contrast(1.05)',
              }}
            >
              <img
                src={src}
                alt={`Behind the frame ${i + 1}`}
                draggable={false}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
          {/* trailing spacer */}
          <div style={{ flex: '0 0 clamp(1.5rem, 5vw, 5rem)' }} />
        </div>
      </motion.div>
    </section>
  )
}
