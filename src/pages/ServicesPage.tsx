import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera } from 'lucide-react'

const T = {
  bg:     '#F5F1EA',
  bgAlt:  '#EDE9E1',
  ink:    '#0A0A0A',
  muted:  '#8A847C',
  accent: '#B8956A',
  border: '#D8D3C9',
  white:  '#FDFCFA',
}

const SERVICES = [
  {
    title: 'Architecture Photography & Film',
    desc: 'Documenting the built world — from iconic landmarks to intimate interiors. Every space has a story. We find it through light, composition, and motion.',
    for: 'Architects · Interior Designers · Builders · Developers',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=90&auto=format&fit=crop',
  },
  {
    title: 'Corporate Photography & Branding',
    desc: 'Professional visuals that elevate your brand identity. Headshots, product photography, office culture, and brand storytelling — all under one roof.',
    for: 'Startups · Corporates · Agencies · Founders',
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=90&auto=format&fit=crop',
  },
  {
    title: 'Cinematic Films',
    desc: 'Short films that let buildings, brands, and people breathe. We turn concrete and vision into narrative — quiet, precise, cinematic.',
    for: 'Brands · Producers · Architects · Collaborators',
    img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1600&q=90&auto=format&fit=crop',
  },
  {
    title: 'Events & Experiences',
    desc: 'From intimate gatherings to large-scale productions, we document moments with the same care and precision as our architectural work.',
    for: 'Corporates · Schools · Community Organisations',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=90&auto=format&fit=crop',
  },
  {
    title: 'Weddings & Personal',
    desc: 'Timeless, documentary-style wedding photography and films. Candid, emotionally resonant, and crafted to last a lifetime.',
    for: 'Couples · Families',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=90&auto=format&fit=crop',
  },
]

function ServiceItem({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ borderTop: `1px solid ${T.border}`, paddingTop: 60, paddingBottom: 0 }}>
      {/* Title + desc — centered */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="font-display font-light"
          style={{ fontSize: 'clamp(28px, 4vw, 54px)', color: T.ink, lineHeight: 1.1, marginBottom: 16 }}
        >
          {service.title}
        </h2>
        <p
          className="font-sans text-[14px] leading-relaxed mx-auto"
          style={{ color: T.muted, maxWidth: 520, marginBottom: 10 }}
        >
          {service.desc}
        </p>
        <p
          className="font-sans text-[11px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: '#B5AFA8', marginBottom: 24 }}
        >
          {service.for}
        </p>
        <a
          href="mailto:eleven25studios@gmail.com"
          className="inline-flex items-center gap-2 font-sans text-[12px] tracking-wider uppercase font-semibold transition-colors duration-200"
          style={{ color: T.ink }}
          onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
          onMouseLeave={e => (e.currentTarget.style.color = T.ink)}
        >
          <Camera size={13} />
          Book Now
        </a>
      </motion.div>

      {/* Full-width image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: 32, overflow: 'hidden' }}
      >
        <img
          src={service.img}
          alt={service.title}
          loading={index === 0 ? 'eager' : 'lazy'}
          style={{
            width: '100%',
            height: 'clamp(320px, 55vw, 700px)',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.92) saturate(0.88)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default function ServicesPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <main style={{ background: T.bg, minHeight: '100vh' }}>

      {/* Page header */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-36 pb-16" ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <h1
            className="font-display font-light"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: T.ink, lineHeight: 1.05 }}
          >
            What We Bring<br />to the Frame
          </h1>
          <p
            className="font-sans text-[13px] leading-relaxed md:max-w-xs"
            style={{ color: T.muted }}
          >
            We create striking images for every project — blending creativity, precision, and intention in every shot.
          </p>
        </motion.div>
      </section>

      {/* Hero image */}
      <div style={{ overflow: 'hidden' }}>
        <motion.img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90&auto=format&fit=crop"
          alt="Eleven25 Studio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            width: '100%',
            height: 'clamp(280px, 42vw, 580px)',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.85) saturate(0.85)',
          }}
        />
      </div>

      {/* Service list */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-0 pb-24">
        <div className="flex flex-col" style={{ gap: 0 }}>
          {SERVICES.map((service, i) => (
            <ServiceItem key={service.title} service={service} index={i} />
          ))}
        </div>
        {/* Bottom border */}
        <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 60 }} />
      </div>

    </main>
  )
}
