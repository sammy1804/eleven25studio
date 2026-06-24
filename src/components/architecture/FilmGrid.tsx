import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import VideoLightbox from './VideoLightbox'

const GOLD = '#0096E6'

const FILMS = [
  { title: 'Lattice',        duration: '4:32', desc: 'A journey through light and concrete',          youtubeId: 'YFJHkFrCFGU', thumb: 'https://picsum.photos/seed/film1/800/450' },
  { title: 'The Quiet Form', duration: '6:18', desc: 'Documenting a decade of minimalism',            youtubeId: 'BVfMBzBiLMs', thumb: 'https://picsum.photos/seed/film2/800/450' },
  { title: 'Earth & Glass',  duration: '3:55', desc: 'Rammed earth in contemporary practice',         youtubeId: 'KyBpI5B3fDA', thumb: 'https://picsum.photos/seed/film3/800/450' },
  { title: 'Shadows at 4PM', duration: '5:12', desc: 'One building, twelve hours of light',           youtubeId: 'xhP06L6XDTU', thumb: 'https://picsum.photos/seed/film4/800/450' },
  { title: 'The Threshold',  duration: '8:44', desc: 'Doorways as architectural narrative',           youtubeId: 'YFJHkFrCFGU', thumb: 'https://picsum.photos/seed/film5/800/450' },
  { title: 'White Rooms',    duration: '3:20', desc: 'Interior spaces shot at dusk',                  youtubeId: 'BVfMBzBiLMs', thumb: 'https://picsum.photos/seed/film6/800/450' },
  { title: 'Grain & Steel',  duration: '7:02', desc: 'Industrial renovation in Bangalore',              youtubeId: 'KyBpI5B3fDA', thumb: 'https://picsum.photos/seed/film7/800/450' },
  { title: 'Open House',     duration: '2:58', desc: 'A family home, documented over a year',         youtubeId: 'xhP06L6XDTU', thumb: 'https://picsum.photos/seed/film8/800/450' },
]

function FilmCard({ film, delay }: { film: typeof FILMS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div
        style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', cursor: 'pointer' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <motion.img
          src={film.thumb}
          alt={film.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          animate={{ filter: hov ? 'brightness(0.55)' : 'brightness(0.85)' }}
          transition={{ duration: 0.4 }}
        />
        {/* Play button */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0.7, scale: hov ? 1 : 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="white" style={{ marginLeft: 2 }}>
              <path d="M0 0L14 8L0 16V0Z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Meta */}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 14, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 4 }}>
            {film.title}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: '#888888', lineHeight: 1.5 }}>
            {film.desc}
          </p>
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, color: '#888888', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {film.duration}
        </span>
      </div>
    </motion.div>
  )
}

export default function FilmGrid() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="films" ref={sectionRef} style={{ padding: 'clamp(80px, 10vh, 120px) clamp(40px, 6vw, 100px)', background: '#ffffff' }}>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD }}>
          • ARCHITECTURE FILMS
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', letterSpacing: '0.06em' }}>
          8 Films
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 'clamp(40px, 6vh, 64px)', borderBottom: '1px solid rgba(26,26,26,0.08)', paddingBottom: 24 }}
      >
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 'clamp(22px, 3vw, 32px)', color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          Buildings in motion.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(24px, 3vw, 48px) clamp(20px, 2.5vw, 40px)' }}>
        {FILMS.map((film, i) => (
          <div key={film.title} onClick={() => setActiveId(film.youtubeId)} style={{ cursor: 'pointer' }}>
            <FilmCard film={film} delay={i * 0.1} />
          </div>
        ))}
      </div>

      {/* Channel link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vh, 72px)', fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 16, color: '#888888' }}
      >
        "We also share architecture films on our YouTube channel{' '}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: GOLD, textDecoration: 'none', borderBottom: `1px solid ${GOLD}` }}
        >
          →
        </a>"
      </motion.p>

      {/* Lightbox */}
      {activeId && <VideoLightbox youtubeId={activeId} onClose={() => setActiveId(null)} />}
    </section>
  )
}
