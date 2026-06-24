import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const FILMS = [
  {
    title: 'Light of the Interval',
    year: '2023',
    logline: 'A short film about the hour before sunset in a village.',
    thumb: 'https://picsum.photos/seed/film_p1/600/400',
  },
  {
    title: 'Concrete Sleep',
    year: '2022',
    logline: 'Documentary portrait of a night watchman.',
    thumb: 'https://picsum.photos/seed/film_p2/600/400',
  },
  {
    title: 'The Unfinished House',
    year: '2021',
    logline: "An incomplete home, its owner's story.",
    thumb: 'https://picsum.photos/seed/film_p3/600/400',
  },
]

function FilmCard({ film, delay }: { film: (typeof FILMS)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/2' }}>
        <motion.img
          src={film.thumb}
          alt={film.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85) saturate(0.85)' }}
          animate={{ scale: hov ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: EASE }}
        />
        {/* Gold bottom line */}
        <motion.div
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: GOLD, transformOrigin: 'left' }}
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 15, color: '#1A1A1A', margin: 0, letterSpacing: '-0.01em' }}>
            {film.title}
          </p>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#AAAAAA' }}>
            {film.year}
          </span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 12, color: '#888888', margin: 0 }}>
          {film.logline}
        </p>
      </div>
    </motion.div>
  )
}

export default function AboutFilms() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const [linkHov, setLinkHov] = useState(false)
  const isMobile = useIsMobile()

  return (
    <section style={{ background: '#F5F4F1', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            • Personal Films
          </p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#1A1A1A', margin: '0 0 14px', letterSpacing: '-0.02em' }}>
            "Stories I needed to tell."
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: '#888888', margin: 0, maxWidth: 520 }}>
            Alongside client work, Sadiq continues to make personal short films.
            Some screened at festivals. Some just for the drawer. All honest.
          </p>
        </motion.div>

        {/* 3-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 'clamp(16px, 3vw, 36px)', marginBottom: 40 }}>
          {FILMS.map((film, i) => (
            <FilmCard key={film.title} film={film} delay={i * 0.12} />
          ))}
        </div>

        {/* Vimeo link */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          onMouseEnter={() => setLinkHov(true)}
          onMouseLeave={() => setLinkHov(false)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: linkHov ? '#1A1A1A' : '#888888',
            textDecoration: linkHov ? 'underline' : 'none',
            transition: 'color 0.25s',
            display: 'inline-block',
          }}
        >
          View all films on Vimeo →
        </motion.a>
      </div>
    </section>
  )
}
