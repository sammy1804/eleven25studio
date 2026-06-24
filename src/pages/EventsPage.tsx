import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Gamepad2, Camera, TreePine, Building2, GraduationCap, ArrowUpRight } from 'lucide-react'

const ACCENT = '#E8A838'

const WHAT_WE_DO = [
  {
    icon: Users,
    title: 'House Parties',
    desc: 'Curated social experiences that bring people together in intimate, vibrant settings.',
    color: '#F4A261',
  },
  {
    icon: Gamepad2,
    title: 'Game Nights',
    desc: 'Interactive social gaming events — competitive, fun, and unforgettable.',
    color: '#E76F51',
  },
  {
    icon: Camera,
    title: 'Workshops',
    desc: 'Photography, filmmaking, and skill-based creative sessions for all levels.',
    color: '#2A9D8F',
  },
  {
    icon: TreePine,
    title: 'Community Events',
    desc: 'Outdoor meetups, park events, networking sessions, and creative gatherings.',
    color: '#264653',
  },
  {
    icon: Building2,
    title: 'Corporate Experiences',
    desc: 'Team building, corporate engagement programs, and employee experience events.',
    color: '#457B9D',
  },
  {
    icon: GraduationCap,
    title: 'School & College Programs',
    desc: 'Workshops, talks, and interactive creative development sessions for students.',
    color: '#6D6875',
  },
]

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=90&auto=format&fit=crop',
]

const UPCOMING = [
  { title: 'Photography Walk — Marina Beach', date: 'July 12, 2025', type: 'Workshop', spots: '12 spots left' },
  { title: 'Filmmaker Roundtable', date: 'July 20, 2025', type: 'Community', spots: '8 spots left' },
  { title: 'Brand Storytelling Workshop', date: 'Aug 3, 2025', type: 'Workshop', spots: '15 spots left' },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function EventsPage() {
  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ══ HERO ══ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ background: '#111111', paddingTop: 120 }}
      >
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20">
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" style={{ height: '100%' }} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.85) 100%)' }} />

        <div className="relative z-10 px-6 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ color: ACCENT }}
          >
            eleven25 studio — Events
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light italic leading-none"
            style={{ fontSize: 'clamp(52px, 12vw, 140px)', color: '#FAFAF8', letterSpacing: '-0.02em' }}
          >
            Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-sans text-[14px] leading-relaxed mt-6 mx-auto"
            style={{ color: 'rgba(250,250,248,0.5)', maxWidth: 480 }}
          >
            Community building, workshops, and curated experiences for creators,
            professionals, and curious minds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            <a
              href="mailto:eleven25studios@gmail.com?subject=Host an Event"
              className="font-sans text-[12px] tracking-widest uppercase font-medium px-7 py-3.5 rounded-full transition-all duration-200"
              style={{ background: ACCENT, color: '#111111' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Host an Event
            </a>
            <Link
              to="/contact"
              className="font-sans text-[12px] tracking-widest uppercase font-medium px-7 py-3.5 rounded-full transition-all duration-200"
              style={{ border: '1px solid rgba(250,250,248,0.25)', color: '#FAFAF8' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(250,250,248,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(250,250,248,0.25)')}
            >
              Partner With Us
            </Link>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#FAFAF8" />
          </svg>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section style={{ background: '#FAFAF8', padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: ACCENT }}>
              What We Do
            </p>
            <h2
              className="font-display font-light"
              style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', color: '#111111', lineHeight: 1.1, marginBottom: '3.5rem', letterSpacing: '-0.01em' }}
            >
              Something for<br />everyone.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {WHAT_WE_DO.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={i * 0.07}>
                  <div
                    className="p-6 md:p-8 h-full"
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(17,17,17,0.07)',
                      borderRadius: 12,
                      boxShadow: '0 2px 16px rgba(17,17,17,0.05)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${item.color}18` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <h3 className="font-sans font-semibold text-[17px] mb-2" style={{ color: '#111111' }}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13px] leading-relaxed" style={{ color: '#7A7A72' }}>
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section style={{ background: '#F0EDE8', borderTop: '1px solid rgba(17,17,17,0.07)', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <Reveal>
            <div className="flex items-center gap-6 mb-10 md:mb-12">
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Gallery
              </p>
              <div className="h-px flex-1" style={{ background: 'rgba(17,17,17,0.12)' }} />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className="overflow-hidden group cursor-pointer"
                  style={{ borderRadius: 8, aspectRatio: i % 3 === 0 ? '4/3' : '3/4' }}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    style={{ filter: 'brightness(0.92) saturate(0.9)' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ UPCOMING EVENTS ══ */}
      <section style={{ background: '#FAFAF8', borderTop: '1px solid rgba(17,17,17,0.07)', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: ACCENT }}>
              Upcoming Events
            </p>
            <h2
              className="font-display font-light"
              style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', color: '#111111', lineHeight: 1.15, marginBottom: '2.5rem' }}
            >
              What's coming up.
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {UPCOMING.map((event, i) => (
              <Reveal key={event.title} delay={i * 0.08}>
                <div
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-5"
                  style={{ borderTop: '1px solid rgba(17,17,17,0.08)' }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="font-sans text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                        style={{ background: `${ACCENT}18`, color: ACCENT }}
                      >
                        {event.type}
                      </span>
                    </div>
                    <p className="font-sans font-medium text-[16px] md:text-[18px]" style={{ color: '#111111' }}>
                      {event.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 md:flex-shrink-0">
                    <p className="font-sans text-[13px]" style={{ color: '#7A7A72' }}>{event.date}</p>
                    <span
                      className="font-sans text-[11px] tracking-wide"
                      style={{ color: '#2A9D8F', fontWeight: 600 }}
                    >
                      {event.spots}
                    </span>
                    <a
                      href="mailto:eleven25studios@gmail.com?subject=Event Registration"
                      className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase font-medium transition-colors duration-200"
                      style={{ color: '#111111' }}
                      onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#111111')}
                    >
                      Register <ArrowUpRight size={11} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid rgba(17,17,17,0.08)' }} />
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section
        className="text-center"
        style={{ background: '#111111', padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)' }}
      >
        <Reveal>
          <h2
            className="font-display font-light italic"
            style={{ fontSize: 'clamp(32px, 5.5vw, 72px)', color: '#FAFAF8', lineHeight: 1.1, marginBottom: '2.5rem' }}
          >
            Ready to create<br />an experience?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:eleven25studios@gmail.com?subject=Host an Event"
              className="font-sans text-[12px] tracking-widest uppercase font-medium px-7 py-4 rounded-full transition-all duration-200"
              style={{ background: ACCENT, color: '#111111' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Host an Event
            </a>
            <a
              href="mailto:eleven25studios@gmail.com?subject=Partnership"
              className="font-sans text-[12px] tracking-widest uppercase font-medium px-7 py-4 rounded-full transition-all duration-200"
              style={{ border: '1px solid rgba(250,250,248,0.2)', color: '#FAFAF8' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(250,250,248,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(250,250,248,0.2)')}
            >
              Partner With Us
            </a>
            <a
              href="mailto:eleven25studios@gmail.com?subject=Book a Workshop"
              className="font-sans text-[12px] tracking-widest uppercase font-medium px-7 py-4 rounded-full transition-all duration-200"
              style={{ border: '1px solid rgba(250,250,248,0.2)', color: '#FAFAF8' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(250,250,248,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(250,250,248,0.2)')}
            >
              Book a Workshop
            </a>
          </div>
        </Reveal>
      </section>

    </main>
  )
}
