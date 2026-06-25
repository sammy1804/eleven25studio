import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile'

const SERVICES = [
  {
    num: '01',
    title: 'Architecture Photography',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=480&q=80&auto=format&fit=crop',
    description:
      'Capturing the soul of built spaces — from luxury residences to landmark structures. Every frame composed with architect-level precision.',
    cta: 'Explore Architecture',
    href: '/architecture',
  },
  {
    num: '02',
    title: 'Architecture Films',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=480&q=80&auto=format&fit=crop',
    description:
      'Cinematic walkthroughs that bring your project to life. Motion, light, and narrative — all composed into one seamless film.',
    cta: 'View Cinematic Work',
    href: '/architecture',
  },
  {
    num: '03',
    title: 'Fashion & Editorial',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=480&q=80&auto=format&fit=crop',
    description:
      'Editorial portraits and campaign imagery that define brand identity. Clean aesthetics, bold storytelling, intentional framing.',
    cta: 'See Fashion Work',
    href: '/fashion',
  },
  {
    num: '04',
    title: 'Events & Celebrations',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=480&q=80&auto=format&fit=crop',
    description:
      'Weddings, product launches, cultural events — we document every emotion as it unfolds, in real time, with cinematic care.',
    cta: 'View Event Coverage',
    href: '/eventing',
  },
]

export default function ServicesScrollSection() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (isMobile) return
    return scrollYProgress.on('change', (v) => {
      setActiveIndex(Math.min(Math.floor(v * SERVICES.length), SERVICES.length - 1))
    })
  }, [scrollYProgress, isMobile])

  const scrollToService = (index: number) => {
    if (!sectionRef.current) return
    const sectionTop =
      sectionRef.current.getBoundingClientRect().top + window.scrollY
    const target = sectionTop + index * window.innerHeight
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  /* ── Mobile: simple tap-accordion ── */
  const [mobileOpen, setMobileOpen] = useState(0)

  if (isMobile) {
    return (
      <section style={{ background: '#F8F7F4', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
        {/* Background strip */}
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.48)' }}
          />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px 24px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 6px' }}>
              • What we do
            </p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 26, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Our Services
            </h2>
          </div>
        </div>

        {/* Accordion list */}
        <div style={{ background: '#ffffff' }}>
          {SERVICES.map((service, i) => (
            <div key={service.num} style={{ borderBottom: '1px solid #ECEAE4' }}>
              <div
                onClick={() => setMobileOpen(mobileOpen === i ? -1 : i)}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', cursor: 'pointer' }}
              >
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: 28, color: mobileOpen === i ? '#1A1A1A' : 'rgba(26,26,26,0.18)', letterSpacing: '-0.04em', lineHeight: 1, minWidth: 44 }}>
                  {service.num}
                </span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 18, color: mobileOpen === i ? '#1A1A1A' : 'rgba(26,26,26,0.55)', letterSpacing: '-0.02em', flex: 1 }}>
                  {service.title}
                </span>
                <motion.div animate={{ rotate: mobileOpen === i ? 90 : 0 }} transition={{ duration: 0.25 }}>
                  <ArrowRight size={18} color="#1A1A1A" />
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {mobileOpen === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 24px 24px 24px' }}>
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, display: 'block', marginBottom: 14 }}
                      />
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: '#888', lineHeight: 1.8, margin: '0 0 16px' }}>
                        {service.description}
                      </p>
                      <Link
                        to={service.href}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 12, color: '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid rgba(26,26,26,0.35)', paddingBottom: 2 }}
                      >
                        {service.cta} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: `${(SERVICES.length + 1) * 100}vh`, position: 'relative' }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.48)',
            }}
          />
        </div>

        {/* White floating panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: 20,
            width: 'min(60vw, 740px)',
            maxHeight: '86vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '28px 36px',
            scrollbarWidth: 'none',
          }}
        >
          {/* Hide webkit scrollbar */}
          <style>{`.svc-panel::-webkit-scrollbar { display: none; }`}</style>

          {/* Panel header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              alignItems: 'start',
              marginBottom: 28,
              gap: 16,
            }}
          >
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#999', margin: 0, lineHeight: 1.6 }}>
                Eleven25 Studios
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#999', margin: 0, lineHeight: 1.6 }}>
                Visual storytelling, redefined.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#999', margin: 0, lineHeight: 1.6 }}>
                Architecture · Fashion
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#999', margin: 0, lineHeight: 1.6 }}>
                Eventing · Corporate
              </p>
            </div>
            <Link
              to="/gallery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 11,
                color: '#1A1A1A',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Explore All Our Services <ArrowRight size={11} />
            </Link>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#ECEAE4', marginBottom: 0 }} />

          {/* Services list */}
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.num}
              service={service}
              isActive={activeIndex === i}
              isLast={i === SERVICES.length - 1}
              onSelect={() => scrollToService(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceRow({
  service,
  isActive,
  isLast,
  onSelect,
}: {
  service: (typeof SERVICES)[0]
  isActive: boolean
  isLast: boolean
  onSelect: () => void
}) {
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid #ECEAE4' }}>
      {/* Row header */}
      <div
        onClick={onSelect}
        style={{
          display: 'grid',
          gridTemplateColumns: '72px 1fr 28px',
          alignItems: 'center',
          padding: '20px 0',
          gap: 12,
          cursor: isActive ? 'default' : 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(34px, 3.5vw, 52px)',
            color: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.18)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            transition: 'color 0.45s ease',
          }}
        >
          {service.num}
        </span>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(20px, 2.2vw, 32px)',
            color: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.45)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            transition: 'color 0.45s ease',
          }}
        >
          {service.title}
        </span>
        <motion.div
          animate={{ x: isActive ? 4 : 0, opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0 }}
        >
          <ArrowRight size={20} color="#1A1A1A" />
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 24, paddingLeft: 84 }}>
              <motion.img
                src={service.image}
                alt={service.title}
                initial={{ scale: 1.04, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: 210,
                  height: 126,
                  objectFit: 'cover',
                  borderRadius: 10,
                  display: 'block',
                  marginBottom: 14,
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: '#888',
                  lineHeight: 1.8,
                  margin: '0 0 16px',
                  maxWidth: 360,
                }}
              >
                {service.description}
              </p>
              <Link
                to={service.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  color: '#1A1A1A',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(26,26,26,0.35)',
                  paddingBottom: 2,
                }}
              >
                {service.cta} <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
