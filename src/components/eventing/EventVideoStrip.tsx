import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PURPLE = '#A78BFA'

type AspectType = '9/16' | '16/9' | '1/1'

interface VideoCard {
  title: string
  type: string
  duration: string
  aspect: AspectType
  thumb: string
  youtubeId: string
}

const STRIP_HEIGHT = 380

const VIDEOS: VideoCard[] = [
  { title: 'Meridian Summit 2024',  type: 'Corporate Conference', duration: '3:12', aspect: '9/16',  thumb: 'https://picsum.photos/seed/ev_vp1/450/800', youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Design Awards Night',   type: 'Award Ceremony',       duration: '2:44', aspect: '16/9',  thumb: 'https://picsum.photos/seed/ev_v1/800/450',  youtubeId: 'dQw4w9WgXcQ' },
  { title: 'The Creative Lab',      type: 'Cultural Event',        duration: '1:58', aspect: '1/1',   thumb: 'https://picsum.photos/seed/ev_vs1/600/600', youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Founders Forum',        type: 'Networking Night',      duration: '4:02', aspect: '9/16',  thumb: 'https://picsum.photos/seed/ev_vp2/450/800', youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Brand X Launch',        type: 'Product Launch',        duration: '2:15', aspect: '16/9',  thumb: 'https://picsum.photos/seed/ev_v2/800/450',  youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Kala Utsav 2024',       type: 'Cultural Festival',     duration: '5:30', aspect: '9/16',  thumb: 'https://picsum.photos/seed/ev_vp3/450/800', youtubeId: 'dQw4w9WgXcQ' },
]

function aspectWidth(aspect: AspectType): number {
  if (aspect === '9/16') return Math.round(STRIP_HEIGHT * 9 / 16)
  if (aspect === '16/9') return Math.round(STRIP_HEIGHT * 16 / 9)
  return STRIP_HEIGHT
}

function VideoLightbox({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 900, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 28, right: 32, background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}
      >
        Close ×
      </button>
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ width: '80vw', maxWidth: 1100, aspectRatio: '16/9' }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  )
}

function VideoThumb({ video }: { video: VideoCard }) {
  const [hovered, setHovered] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const w = aspectWidth(video.aspect)

  return (
    <>
      <div
        style={{ flex: `0 0 ${w}px`, display: 'flex', flexDirection: 'column', gap: 10 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{ position: 'relative', width: w, height: STRIP_HEIGHT, overflow: 'hidden', cursor: 'pointer' }}
          onClick={() => setLightbox(true)}
        >
          <motion.img
            src={video.thumb}
            alt={video.title}
            loading="lazy"
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Dark overlay */}
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
            animate={{ opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          {/* Play button */}
          <motion.div
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: `2px solid ${PURPLE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M1.5 1.5L16.5 11L1.5 20.5V1.5Z" fill={PURPLE} />
              </svg>
            </div>
          </motion.div>
          {/* Duration */}
          <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: '2px 8px', borderRadius: 2 }}>
            {video.duration}
          </div>
        </div>
        {/* Meta */}
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 13, color: '#1A1A1A', margin: 0 }}>{video.title}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', margin: '3px 0 0' }}>{video.type}</p>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && <VideoLightbox youtubeId={video.youtubeId} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function EventVideoStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const trackRef = useRef<HTMLDivElement>(null)

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

    const onDown = (e: PointerEvent) => {
      isDragging.current = true
      startX.current = e.clientX
      scrollStart.current = el.scrollLeft
      lastX.current = e.clientX
      velX.current = 0
      el.setPointerCapture(e.pointerId)
      el.style.cursor = 'grabbing'
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      el.scrollLeft = scrollStart.current - (e.clientX - startX.current)
      velX.current = e.clientX - lastX.current
      lastX.current = e.clientX
    }
    const onUp = () => {
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

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#F5F4F1', padding: 'clamp(4rem, 8vh, 7rem) 0', overflow: 'hidden' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '0 clamp(1.5rem, 5vw, 5rem)', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: PURPLE, marginBottom: 10 }}>
          • Event Films & Clips
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(26px, 3vw, 42px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
            The energy, not just the photographs.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.p
              animate={{ opacity: showHint ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#888888', margin: 0, whiteSpace: 'nowrap' }}
            >
              ← Drag →
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Scrollable strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15 }}
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
            alignItems: 'flex-start',
          }}
        >
          {VIDEOS.map(v => <VideoThumb key={v.title} video={v} />)}
          <div style={{ flex: '0 0 clamp(1.5rem, 5vw, 5rem)' }} />
        </div>
      </motion.div>
    </section>
  )
}
