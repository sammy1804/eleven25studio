import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ── Creative Portfolio items ── */
const CREATIVE = [
  {
    title: 'Maison Verte',
    category: 'Brand Film',
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=90&auto=format&fit=crop',
  },
  {
    title: 'Studio Kaavi Rebrand',
    category: 'Brand Collaboration',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=90&auto=format&fit=crop',
  },
  {
    title: 'Solstice Campaign',
    category: 'Creative Project',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90&auto=format&fit=crop',
  },
  {
    title: 'Meridian x Eleven25',
    category: 'Brand Collaboration',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=90&auto=format&fit=crop',
  },
]

/* ── Original Films ── */
const FILMS = [
  {
    title: 'Before the Light',
    type: 'Short Film',
    year: '2024',
    duration: '12 min',
    src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=90&auto=format&fit=crop',
  },
  {
    title: 'The Concrete Garden',
    type: 'Experimental',
    year: '2024',
    duration: '8 min',
    src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=90&auto=format&fit=crop',
  },
  {
    title: 'Monsoon Raga',
    type: 'Personal Project',
    year: '2023',
    duration: '18 min',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90&auto=format&fit=crop',
  },
  {
    title: 'Voices of the Street',
    type: 'Short Documentary',
    year: '2023',
    duration: '22 min',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90&auto=format&fit=crop',
  },
]

/* ── Scripts & Concepts ── */
const SCRIPTS = [
  { title: 'The Architect\'s Last Draft', status: 'In Development' },
  { title: 'City at 4AM', status: 'Concept' },
  { title: 'Inheritance', status: 'Script Complete' },
  { title: 'The Quiet Machine', status: 'Upcoming' },
]

/* ── Reveal helper ── */
function Reveal({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── Horizontal scroll creative portfolio ── */
function CreativePortfolio() {
  return (
    <section className="overflow-x-auto" style={{ background: '#0A0A0A', paddingBottom: '4rem' }}>
      <div style={{ padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem) 2rem' }}>
        <Reveal>
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: 'rgba(245,241,234,0.35)' }}>
            Creative Portfolio
          </p>
          <h2
            className="font-display font-light italic"
            style={{ fontSize: 'clamp(28px, 4vw, 54px)', color: '#F5F1EA', lineHeight: 1.1, marginBottom: '3rem' }}
          >
            Brand collaborations<br />&amp; creative work.
          </h2>
        </Reveal>
      </div>

      {/* Horizontal scroll strip */}
      <div
        className="flex gap-4 px-6 md:px-10"
        style={{ width: 'max-content', paddingRight: 'clamp(1.5rem, 5vw, 5rem)' }}
      >
        {CREATIVE.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="relative flex-shrink-0 overflow-hidden group cursor-pointer"
            style={{ width: 'clamp(260px, 32vw, 420px)', aspectRatio: '3/4' }}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              style={{ filter: 'brightness(0.65) saturate(0.7)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(184,149,106,0.8)' }}>
                {item.category}
              </p>
              <p className="font-display font-light italic text-[22px]" style={{ color: '#F5F1EA', lineHeight: 1.2 }}>
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function FilmsPage() {
  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.18])
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '12%'])

  /* Intro text spring */
  const smooth = useSpring(heroProgress, { stiffness: 60, damping: 20 })
  const introOpacity = useTransform(smooth, [0.1, 0.35], [0, 1])
  const introY = useTransform(smooth, [0.1, 0.35], [40, 0])

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* ══ CINEMATIC HERO — zoom-in as you scroll ══ */}
      <div ref={heroRef} style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          {/* Letterbox bars */}
          <div className="absolute top-0 left-0 right-0 z-20" style={{ height: 'clamp(48px, 7vh, 80px)', background: '#0A0A0A' }} />
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: 'clamp(48px, 7vh, 80px)', background: '#0A0A0A' }} />

          {/* Cinemascope image — scales as you scroll */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ scale: heroScale }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=2400&q=85&auto=format&fit=crop"
              alt="Films"
              className="w-full h-full object-cover"
              style={{ y: heroY, filter: 'brightness(0.45) saturate(0.6)' }}
            />
          </motion.div>

          {/* Hero text — fades out as you scroll */}
          <motion.div
            className="relative z-10 text-center px-6"
            style={{ opacity: heroOpacity }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 1.6, delay: 0.4 }}
              className="font-sans text-[10px] uppercase mb-8"
              style={{ color: 'rgba(245,241,234,0.4)' }}
            >
              eleven25 studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light italic"
              style={{ fontSize: 'clamp(64px, 14vw, 180px)', color: '#F5F1EA', lineHeight: 0.9, letterSpacing: '-0.02em' }}
            >
              Films
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center justify-center gap-6 mt-8"
            >
              {['Architect', 'Filmmaker', 'Storyteller'].map((word, i) => (
                <span key={word} className="flex items-center gap-6">
                  {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(245,241,234,0.25)', display: 'inline-block' }} />}
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase" style={{ color: 'rgba(245,241,234,0.45)' }}>
                    {word}
                  </span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-24 left-1/2 z-10"
            style={{ x: '-50%', opacity: heroOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-px mx-auto"
              style={{ height: 40, background: 'linear-gradient(to bottom, rgba(245,241,234,0.5), transparent)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ══ ABOUT SADIQ ══ */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem, 6vw, 8rem)', alignItems: 'center' }}>

          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: 'rgba(184,149,106,0.7)' }}>
              The Filmmaker
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Architect.', 'Photographer.', 'Filmmaker.', 'Storyteller.'].map((word, i) => (
                <motion.p
                  key={word}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className="font-display font-light italic"
                  style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: i < 3 ? 'rgba(245,241,234,0.25)' : '#F5F1EA', lineHeight: 1.05 }}
                >
                  {word}
                </motion.p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-sans text-[14px] leading-relaxed mb-5" style={{ color: 'rgba(245,241,234,0.45)' }}>
              Sadiq Patel is the founder of Eleven25 Studios. Trained as an architect, his practice evolved
              into photography and eventually film — drawn by the possibility of capturing space, time,
              and emotion in a single frame.
            </p>
            <p className="font-sans text-[14px] leading-relaxed mb-5" style={{ color: 'rgba(245,241,234,0.45)' }}>
              His films explore architecture, identity, and the quiet narratives that exist in everyday
              spaces. Each project begins with a question and ends with a feeling.
            </p>
            <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'rgba(184,149,106,0.7)', fontStyle: 'italic' }}>
              "I don't just document. I tell stories."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ CREATIVE PORTFOLIO (horizontal scroll) ══ */}
      <CreativePortfolio />

      {/* ══ ORIGINAL FILMS ══ */}
      <section style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
              <div>
                <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(184,149,106,0.7)' }}>
                  Original Films
                </p>
                <h2
                  className="font-display font-light italic"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', color: '#F5F1EA', lineHeight: 1.1 }}
                >
                  Short films &amp;<br />personal work.
                </h2>
              </div>
              <p className="font-sans text-[13px] leading-relaxed md:max-w-xs" style={{ color: 'rgba(245,241,234,0.3)' }}>
                A selection of independent and personal films — each a distinct exploration of story, space, and emotion.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {FILMS.map((film, i) => (
              <motion.div
                key={film.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.1 }}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: '16/10' }}
              >
                <img
                  src={film.src}
                  alt={film.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ filter: 'brightness(0.55) saturate(0.65)' }}
                />
                {/* Scan line overlay — cinematic feel */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-sans text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(184,149,106,0.7)' }}>
                          {film.type}
                        </p>
                        <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'rgba(245,241,234,0.2)', display: 'inline-block' }} />
                        <p className="font-sans text-[10px] tracking-[0.15em]" style={{ color: 'rgba(245,241,234,0.3)' }}>
                          {film.year}
                        </p>
                      </div>
                      <p
                        className="font-display font-light italic"
                        style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', color: '#F5F1EA', lineHeight: 1.2 }}
                      >
                        {film.title}
                      </p>
                    </div>
                    <p
                      className="font-sans text-[11px] tabular-nums flex-shrink-0 ml-4"
                      style={{ color: 'rgba(245,241,234,0.35)', fontFamily: "'Space Mono', monospace" }}
                    >
                      {film.duration}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SCRIPTS & CONCEPTS ══ */}
      <section style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: 'rgba(184,149,106,0.7)' }}>
              Scripts &amp; Concepts
            </p>
          </Reveal>
          <p className="font-display font-light italic mb-10" style={{ fontSize: 'clamp(20px, 3vw, 36px)', color: 'rgba(245,241,234,0.35)', maxWidth: 600 }}>
            A curated space of screenplays, story concepts, and ideas in development.
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {SCRIPTS.map((script, i) => (
              <Reveal key={script.title} delay={i * 0.06}>
                <div
                  className="flex items-center justify-between py-5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p
                    className="font-display font-light italic"
                    style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', color: 'rgba(245,241,234,0.6)' }}
                  >
                    {script.title}
                  </p>
                  <span
                    className="font-sans text-[10px] tracking-[0.2em] uppercase flex-shrink-0 ml-6"
                    style={{
                      color: script.status === 'Script Complete' ? 'rgba(184,149,106,0.8)' : 'rgba(245,241,234,0.2)',
                    }}
                  >
                    {script.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(6rem, 12vh, 11rem) clamp(1.5rem, 5vw, 5rem)', textAlign: 'center' }}>
        <Reveal>
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: 'rgba(184,149,106,0.7)' }}>
            Let's Create
          </p>
          <h2
            className="font-display font-light italic"
            style={{ fontSize: 'clamp(36px, 6vw, 86px)', color: '#F5F1EA', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '3rem' }}
          >
            Every great film<br />starts with a conversation.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase font-medium px-8 py-4 transition-colors duration-200"
              style={{ background: '#F5F1EA', color: '#0A0A0A' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ddd')}
              onMouseLeave={e => (e.currentTarget.style.background = '#F5F1EA')}
            >
              Collaborate <ArrowUpRight size={13} />
            </Link>
            <a
              href="mailto:eleven25studios@gmail.com?subject=Commission a Film"
              className="inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase font-medium px-8 py-4 transition-colors duration-200"
              style={{ border: '1px solid rgba(245,241,234,0.2)', color: '#F5F1EA' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,234,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,234,0.2)')}
            >
              Commission a Film
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase font-medium px-8 py-4 transition-colors duration-200"
              style={{ border: '1px solid rgba(245,241,234,0.2)', color: '#F5F1EA' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,234,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,234,0.2)')}
            >
              <MessageCircle size={13} /> Let's Talk
            </Link>
          </div>
        </Reveal>
      </section>

    </main>
  )
}
