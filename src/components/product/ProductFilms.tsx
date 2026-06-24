import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const FILMS = [
  { title: 'Meridian — The Watch',  sub: 'Product launch film',      duration: '2:12', thumb: 'https://picsum.photos/seed/pfv1/800/450', youtubeId: 'dQw4w9WgXcQ', wide: true },
  { title: 'Bare Studio Skincare',  sub: 'Brand identity film',      duration: '1:44', thumb: 'https://picsum.photos/seed/pfv2/800/450', youtubeId: 'dQw4w9WgXcQ', wide: false },
  { title: "Edge & Co. Knives",     sub: 'Craft & precision short',  duration: '0:58', thumb: 'https://picsum.photos/seed/pfv3/800/450', youtubeId: 'dQw4w9WgXcQ', wide: false },
]

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
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 900, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 28, right: 32, background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}
      >
        Close ×
      </button>
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
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

function FilmCard({ film, delay }: { film: (typeof FILMS)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay, ease: EASE }}
        style={{ flex: film.wide ? '0 0 50%' : '0 0 25%', display: 'flex', flexDirection: 'column', gap: 12 }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div
          style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', cursor: 'pointer', background: '#111111' }}
          onClick={() => setLightbox(true)}
        >
          <motion.img
            src={film.thumb}
            alt={film.title}
            loading="lazy"
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }}
            animate={{ scale: hov ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            animate={{ opacity: hov ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ width: 54, height: 54, borderRadius: '50%', border: `2px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M1.5 1.5L16.5 11L1.5 20.5V1.5Z" fill={GOLD} />
              </svg>
            </div>
          </motion.div>
          <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.65)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: '2px 8px', borderRadius: 2 }}>
            {film.duration}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#1A1A1A', margin: 0, letterSpacing: '-0.01em' }}>{film.title}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', margin: '4px 0 0' }}>{film.sub}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && <VideoLightbox youtubeId={film.youtubeId} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function ProductFilms() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            • Product Films
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(26px, 3vw, 42px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.02em' }}>
              Your product, in motion.
            </h2>
            <div style={{ height: 1, flex: 1, background: '#EBEBEB' }} />
          </div>
        </motion.div>

        <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 24px)', alignItems: 'flex-start' }}>
          {FILMS.map((film, i) => (
            <FilmCard key={film.title} film={film} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
