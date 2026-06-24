import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const BLUE = '#3D7BFF'

const CLIPS = [
  {
    title: 'SS24 Campaign Film',
    client: 'Zara India',
    duration: '2:34',
    thumb: 'https://picsum.photos/seed/clip1/450/800',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    title: 'Couture Showreel',
    client: 'Sabyasachi',
    duration: '1:58',
    thumb: 'https://picsum.photos/seed/clip2/450/800',
    youtubeId: 'dQw4w9WgXcQ',
  },
]

function VideoLightbox({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        background: 'rgba(0,0,0,0.93)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 28,
          right: 32,
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          letterSpacing: '0.15em',
          cursor: 'pointer',
          textTransform: 'uppercase',
        }}
      >
        Close ×
      </button>
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ width: '90vw', maxWidth: 500, aspectRatio: '9/16' }}
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

function ClipCard({ clip, delay = 0 }: { clip: (typeof CLIPS)[0]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setLightbox(true)}
      >
        {/* 9:16 thumbnail */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '9/16' }}>
          <motion.img
            src={clip.thumb}
            alt={clip.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Dark overlay */}
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          />
          {/* Play button */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: `2px solid ${BLUE}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M2 2L20 13L2 24V2Z" fill={BLUE} />
              </svg>
            </div>
          </motion.div>
          {/* Duration badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              right: 14,
              background: 'rgba(0,0,0,0.6)',
              color: '#ffffff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: '0.05em',
              padding: '3px 8px',
              borderRadius: 2,
            }}
          >
            {clip.duration}
          </div>
        </div>

        {/* Meta */}
        <div>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: '#1A1A1A', margin: 0, letterSpacing: '-0.01em' }}>
            {clip.title}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: '#888888', margin: '4px 0 0' }}>
            {clip.client}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && <VideoLightbox youtubeId={clip.youtubeId} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function FashionClips() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: BLUE, marginBottom: 12 }}>
            Motion
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
              Campaign Films
            </h2>
            <div style={{ height: 1, flex: 1, background: '#E5E5E5' }} />
          </div>
        </motion.div>

        {/* 2 vertical clips */}
        <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 48px)' }}>
          {CLIPS.map((clip, i) => (
            <ClipCard key={clip.title} clip={clip} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
