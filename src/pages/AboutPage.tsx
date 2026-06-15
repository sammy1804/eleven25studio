import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ── Tokens ── */
const T = {
  bg:     '#F5F1EA',
  bgAlt:  '#EDEAE2',
  bgCard: '#F8F5EF',
  bgDark: '#0E0E0C',
  ink:    '#0A0A0A',
  muted:  '#8A847C',
  faint:  '#C4BEB7',
  accent: '#B8956A',
  border: '#DDD8D0',
}

/* ── Data ── */
const STATS = [
  { num: '200+',  label: 'Projects Delivered' },
  { num: '6+',    label: 'Years of Practice' },
  { num: '12+',   label: 'Industries Covered' },
  { num: '500K+', label: 'Views Through Films' },
  { num: '100+',  label: 'Visual Explorations' },
  { num: '15+',   label: 'Cities Shot In' },
]

const STEPS = [
  {
    id: '01',
    title: 'Discover',
    desc: 'Research the project, space, and story. Understand the architecture, brief, or event context before a single frame is considered.',
  },
  {
    id: '02',
    title: 'Define',
    desc: 'Clarify the visual language, tone, and narrative direction. Establish what the work needs to say and precisely how it needs to feel.',
  },
  {
    id: '03',
    title: 'Design',
    desc: 'Scout locations, plan light windows, prototype with test compositions. Build the visual system before committing to the main shoot.',
  },
  {
    id: '04',
    title: 'Refine',
    desc: 'Shoot, edit, colour-grade — all post-production in-house. Deliver work that feels as considered as the original brief.',
  },
]

const PROJECTS = [
  {
    tag: 'Architecture',
    name: 'Kaavi Architects',
    desc: 'A complete architectural photography portfolio spanning twelve buildings across three years for one of Chennai\'s most respected practices.',
    outcome: 'Increased client inquiry rate by 3× within six months of launch.',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=90&auto=format&fit=crop',
  },
  {
    tag: 'Brand Film',
    name: 'Maison Verte',
    desc: 'A brand identity film and photography campaign anchoring the global rebrand of a sustainable architecture studio.',
    outcome: 'Film reached 200K+ organic views and became the centrepiece of their new identity.',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90&auto=format&fit=crop',
  },
  {
    tag: 'Events',
    name: 'Tech Mahindra Summit',
    desc: 'Full event documentation — stills and film — for a 3,000-person corporate summit, delivered on a tight editorial schedule.',
    outcome: '400+ edited images and a highlight reel delivered within 48 hours.',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=90&auto=format&fit=crop',
  },
]

const TESTIMONIALS = [
  {
    quote: 'The architecture photographs captured our building in ways we couldn\'t have imagined. Every shadow, every detail — perfectly composed.',
    name: 'Meera Krishnamurthy',
    role: 'Principal',
    company: 'Studio Kaavi Architects',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop&crop=face',
  },
  {
    quote: 'Our brand film became the centrepiece of our rebrand. The team understood our vision immediately and elevated it beyond what we briefed.',
    name: 'Rahul Subramanian',
    role: 'Head of Brand',
    company: 'Maison Verte',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=face',
  },
  {
    quote: 'Timeless. Candid, beautiful, and full of feeling. We look at these photographs every single day.',
    name: 'Anika & Dev Pillai',
    role: 'Married',
    company: 'Pondicherry, 2024',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop&crop=face',
  },
]

const PHILOSOPHY = [
  ['Light', 'over noise.'],
  ['Story', 'before aesthetics.'],
  ['Precision,', 'not abundance.'],
  ['Emotion', 'through restraint.'],
]

/* ── Reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-64px' })
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── Label ── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: T.accent,
        marginBottom: '1.5rem',
        margin: 0,
      }}
    >
      {children}
    </p>
  )
}

/* ── Process step — inView-activated ── */
function ProcessStep({ step }: { step: typeof STEPS[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { margin: '-38% 0px -38% 0px' })

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.18 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        gap: '2.5rem',
        paddingTop: '2.75rem',
        paddingBottom: '2.75rem',
        borderTop: `1px solid ${T.border}`,
      }}
    >
      <motion.span
        animate={{ color: active ? T.accent : T.faint }}
        transition={{ duration: 0.55 }}
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: '0.08em',
          paddingTop: 6,
          display: 'block',
        }}
      >
        {step.id}
      </motion.span>
      <div>
        <motion.h3
          animate={{ color: active ? T.ink : T.muted }}
          transition={{ duration: 0.55 }}
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontWeight: 300,
            lineHeight: 1.15,
            marginBottom: '0.85rem',
          }}
        >
          {step.title}
        </motion.h3>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            lineHeight: 1.8,
            color: T.muted,
            maxWidth: 480,
            margin: 0,
          }}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ── Project card with image parallax ── */
function ProjectCard({
  project,
  index,
}: {
  project: typeof PROJECTS[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'center',
        paddingTop: 'clamp(3rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3rem, 6vw, 6rem)',
        borderTop: `1px solid ${T.border}`,
      }}
    >
      {/* Image */}
      <div style={{ order: isEven ? 1 : 2, overflow: 'hidden' }}>
        <motion.img
          src={project.img}
          alt={project.name}
          style={{
            y: imgY,
            width: '100%',
            height: 'clamp(260px, 32vw, 480px)',
            objectFit: 'cover',
            display: 'block',
            scale: 1.12,
            filter: 'brightness(0.92) saturate(0.9)',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ order: isEven ? 2 : 1 }}>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: T.accent,
            marginBottom: '1.25rem',
          }}
        >
          {project.tag}
        </p>
        <h3
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 50px)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: T.ink,
            marginBottom: '1.25rem',
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            lineHeight: 1.8,
            color: T.muted,
            marginBottom: '2rem',
            maxWidth: 400,
          }}
        >
          {project.desc}
        </p>
        <div
          style={{
            borderLeft: `2px solid ${T.accent}`,
            paddingLeft: '1.25rem',
            maxWidth: 380,
          }}
        >
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 12,
              lineHeight: 1.7,
              color: T.muted,
              margin: 0,
            }}
          >
            <span style={{ color: T.accent, fontWeight: 700 }}>Outcome — </span>
            {project.outcome}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Testimonial card ── */
function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      style={{
        background: T.bgCard,
        border: `1px solid ${T.border}`,
        borderRadius: 3,
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        boxShadow: '0 12px 48px rgba(10,10,10,0.07), 0 2px 12px rgba(10,10,10,0.04)',
      }}
    >
      <span
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontSize: 88,
          lineHeight: 0.75,
          color: T.accent,
          opacity: 0.18,
          display: 'block',
          marginBottom: '1rem',
          userSelect: 'none',
        }}
      >
        "
      </span>
      <p
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.55,
          color: T.ink,
          marginBottom: '2.5rem',
        }}
      >
        {t.quote}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={t.img}
          alt={t.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            filter: 'grayscale(20%)',
            flexShrink: 0,
          }}
        />
        <div>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: T.ink,
              margin: 0,
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 11,
              color: T.muted,
              margin: 0,
            }}
          >
            {t.role} — {t.company}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Stacking testimonials ── */
function StackingTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 75, damping: 24 })

  const scale1 = useTransform(smooth, [0, 1], [1, 0.91])
  const scale2 = useTransform(smooth, [0.3, 1], [1, 0.95])
  const y2     = useTransform(smooth, [0.08, 0.52], [680, 0])
  const y3     = useTransform(smooth, [0.48, 0.92], [680, 0])

  return (
    <div ref={containerRef} style={{ height: '300vh', background: T.bgAlt }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(1.5rem, 7vw, 7rem)',
        }}
      >
        <Reveal>
          <div style={{ marginBottom: '3rem' }}>
            <Label>Client Words</Label>
          </div>
        </Reveal>

        <div style={{ position: 'relative', maxWidth: 740, width: '100%' }}>
          {/* Card 1 */}
          <motion.div
            style={{
              scale: scale1,
              transformOrigin: 'top center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <TestimonialCard t={TESTIMONIALS[0]} />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              y: y2,
              scale: scale2,
              transformOrigin: 'top center',
              zIndex: 2,
            }}
          >
            <TestimonialCard t={TESTIMONIALS[1]} />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              y: y3,
              zIndex: 3,
            }}
          >
            <TestimonialCard t={TESTIMONIALS[2]} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function AboutPage() {

  /* Refs for per-section scroll tracking */
  const heroRef    = useRef<HTMLDivElement>(null)
  const storyRef   = useRef<HTMLDivElement>(null)

  /* Hero image parallax */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '22%'])

  /* Story image parallax */
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  })
  const storyImgY     = useTransform(storyScroll, [0, 1], ['6%', '-6%'])
  const storyImgScale = useTransform(storyScroll, [0, 0.5], [1.06, 1.0])

  return (
    <main style={{ background: T.bg, minHeight: '100vh' }}>

      {/* ══ SECTION 1 — HERO ══ */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          paddingTop: 'clamp(7rem, 12vh, 10rem)',
          paddingBottom: '6rem',
          paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
          paddingRight: 0,
          gap: '4rem',
          overflow: 'hidden',
        }}
      >
        {/* Left — text */}
        <div style={{ paddingRight: '2rem' }}>
          <Reveal>
            <Label>Eleven25 Studio</Label>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                fontWeight: 300,
                lineHeight: 1.08,
                color: T.ink,
                margin: '1.25rem 0 2rem',
                letterSpacing: '-0.01em',
              }}
            >
              Designing images,<br />
              films, and visual<br />
              <em>experiences</em> that<br />
              people remember.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: T.muted,
                maxWidth: 420,
                marginBottom: '2.5rem',
              }}
            >
              We are a photography and film studio based in Chennai, helping
              architects, brands, and ambitious teams transform their work into
              visual narratives that matter.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <a
              href="mailto:eleven25studios@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: "'Nunito', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: T.ink,
                textDecoration: 'none',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.accent)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = T.ink)}
            >
              Start a conversation <ArrowRight size={13} />
            </a>
          </Reveal>
        </div>

        {/* Right — floating editorial image with parallax */}
        <div style={{ overflow: 'hidden', height: '80vh', maxHeight: 700, position: 'relative' }}>
          <motion.img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=90&auto=format&fit=crop"
            alt="Eleven25 Studio"
            style={{
              y: heroImgY,
              width: '100%',
              height: '115%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.88) saturate(0.85)',
              scale: 1,
            }}
          />
        </div>
      </section>

      {/* ══ SECTION 2 — STORY ══ */}
      <section
        ref={storyRef}
        style={{
          background: T.bgAlt,
          borderTop: `1px solid ${T.border}`,
          padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '55fr 45fr',
            gap: 'clamp(3rem, 6vw, 7rem)',
            alignItems: 'center',
            maxWidth: 1280,
            margin: '0 auto',
          }}
        >
          {/* Left — narrative */}
          <div>
            <Reveal>
              <Label>My Story</Label>
            </Reveal>
            <Reveal delay={0.06}>
              <blockquote
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                  fontSize: 'clamp(28px, 3.5vw, 46px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                  color: T.ink,
                  margin: '1.5rem 0 2.5rem',
                  padding: 0,
                  borderLeft: 'none',
                }}
              >
                "Before a single frame is captured, the architecture is understood.
                The light is mapped. The story is found."
              </blockquote>
            </Reveal>
            <Reveal delay={0.12}>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: T.muted,
                  marginBottom: '1.5rem',
                }}
              >
                Sadiq Patel trained as an architect before the camera became the
                primary instrument. That background — understanding structure,
                proportion, and the way light occupies a space — shapes every
                shoot. Architecture isn't just subject matter; it's a lens through
                which every visual decision is made.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: T.muted,
                  marginBottom: '1.5rem',
                }}
              >
                Over six years and across twelve industries, the practice has
                expanded from architectural documentation into brand films,
                corporate campaigns, and cinematic wedding work. What connects
                everything: systems thinking applied to visual storytelling. Every
                project begins with a brief, moves through a defined process, and
                ends with a body of work that outlasts the shoot.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: T.muted,
                }}
              >
                We are based in Chennai and work across India and internationally.
                The studio is deliberately small — three people — to preserve the
                quality and intentionality that defines every project we accept.
              </p>
            </Reveal>
          </div>

          {/* Right — parallax image */}
          <div style={{ overflow: 'hidden', borderRadius: 2 }}>
            <motion.img
              src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1000&q=90&auto=format&fit=crop"
              alt="Studio at work"
              style={{
                y: storyImgY,
                scale: storyImgScale,
                width: '100%',
                height: 'clamp(420px, 55vh, 680px)',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.88) saturate(0.85)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — NUMBERS ══ */}
      <section
        style={{
          borderTop: `1px solid ${T.border}`,
          padding: 'clamp(5rem, 9vh, 8rem) clamp(1.5rem, 5vw, 5rem)',
          background: T.bg,
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '4rem' }}>
              <Label>Numbers That Matter</Label>
            </div>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
            }}
          >
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07}>
                <div
                  style={{
                    padding: 'clamp(2rem, 3vw, 3rem)',
                    borderTop: `1px solid ${T.border}`,
                    borderLeft: i % 3 !== 0 ? `1px solid ${T.border}` : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                      fontSize: 'clamp(52px, 6vw, 80px)',
                      fontWeight: 300,
                      color: T.ink,
                      lineHeight: 1,
                      display: 'block',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {stat.num}
                  </span>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      fontWeight: 400,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: T.muted,
                      margin: 0,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Close bottom border */}
          <div style={{ borderTop: `1px solid ${T.border}` }} />
        </div>
      </section>

      {/* ══ SECTION 4 — PROCESS ══ */}
      <section
        style={{
          background: T.bgAlt,
          borderTop: `1px solid ${T.border}`,
          padding: 'clamp(5rem, 9vh, 8rem) clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 'clamp(3rem, 7vw, 8rem)',
            maxWidth: 1280,
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          {/* Left — sticky heading */}
          <div style={{ position: 'sticky', top: '30vh' }}>
            <Reveal>
              <Label>How I Work</Label>
              <h2
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: T.ink,
                  margin: '1.25rem 0 1.5rem',
                }}
              >
                Every project<br />
                starts with<br />
                <em>listening.</em>
              </h2>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: T.muted,
                  maxWidth: 280,
                }}
              >
                A four-stage process refined over six years and two hundred projects.
              </p>
            </Reveal>
          </div>

          {/* Right — scroll-activated steps */}
          <div>
            {STEPS.map((step) => (
              <ProcessStep key={step.id} step={step} />
            ))}
            <div style={{ borderTop: `1px solid ${T.border}` }} />
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — IMPACT ══ */}
      <section
        style={{
          borderTop: `1px solid ${T.border}`,
          background: T.bg,
          padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '1rem' }}>
              <Label>Selected Impact</Label>
            </div>
          </Reveal>

          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ══ SECTION 6 — TESTIMONIALS (stacking) ══ */}
      <StackingTestimonials />

      {/* ══ SECTION 7 — PHILOSOPHY ══ */}
      <section
        style={{
          background: T.bgDark,
          padding: 'clamp(6rem, 12vh, 11rem) clamp(1.5rem, 7vw, 7rem)',
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: T.accent,
              marginBottom: '4rem',
            }}
          >
            Philosophy
          </p>
        </Reveal>

        <div style={{ maxWidth: 1100 }}>
          {PHILOSOPHY.map(([bold, rest], i) => (
            <Reveal key={bold} delay={i * 0.1}>
              <div
                style={{
                  paddingTop: 'clamp(1.5rem, 3vh, 2.5rem)',
                  paddingBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                    fontSize: 'clamp(36px, 5.5vw, 76px)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                    color: 'rgba(255,255,255,0.15)',
                    margin: 0,
                  }}
                >
                  <span style={{ color: '#F5F1EA' }}>{bold} </span>
                  {rest}
                </p>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </div>
      </section>

      {/* ══ SECTION 8 — CTA ══ */}
      <section
        style={{
          background: T.bg,
          borderTop: `1px solid ${T.border}`,
          padding: 'clamp(7rem, 15vh, 13rem) clamp(1.5rem, 5vw, 5rem)',
          textAlign: 'center',
        }}
      >
        <Reveal>
          <Label>Get In Touch</Label>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontWeight: 300,
              lineHeight: 1.08,
              color: T.ink,
              margin: '1.5rem auto 1.75rem',
              maxWidth: 800,
              letterSpacing: '-0.01em',
            }}
          >
            Let's build something<br />
            <em>meaningful.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 15,
              lineHeight: 1.8,
              color: T.muted,
              maxWidth: 440,
              margin: '0 auto 3rem',
            }}
          >
            Whether you have a brief ready or an idea still forming, we would
            love to hear about your project.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/architecture"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: T.ink,
                color: '#F5F1EA',
                fontFamily: "'Nunito', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#222')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = T.ink)}
            >
              View Work <ArrowUpRight size={13} />
            </Link>

            <a
              href="mailto:eleven25studios@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'transparent',
                color: T.ink,
                fontFamily: "'Nunito', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: `1px solid ${T.border}`,
                borderRadius: 2,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = T.accent
                el.style.color = T.accent
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = T.border
                el.style.color = T.ink
              }}
            >
              Start a Project <ArrowRight size={13} />
            </a>
          </div>
        </Reveal>
      </section>

    </main>
  )
}
