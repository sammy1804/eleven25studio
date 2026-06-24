import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const GOLD = '#C9A35F'

const T = {
  bg:     '#F5F1EA',
  bgAlt:  '#EDEAE2',
  ink:    '#0E0E0C',
  muted:  '#8A847C',
  accent: '#B8956A',
  border: '#DDD8D0',
}

/* ── Interior projects ── */
const INTERIOR = [
  {
    name: 'The Kaavi House',
    location: 'Indiranagar, Bangalore',
    architect: 'Studio Kaavi Architects',
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=90&auto=format&fit=crop',
    span: 'md:col-span-8',
    aspect: 'aspect-[16/10]',
  },
  {
    name: 'Monsoon Villa',
    location: 'Coimbatore',
    architect: 'TEAL Architects',
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=90&auto=format&fit=crop',
    span: 'md:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'The Glass Atelier',
    location: 'Bengaluru',
    architect: 'Form Follows Studio',
    src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=90&auto=format&fit=crop',
    span: 'md:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Courtyard House',
    location: 'Pondicherry',
    architect: 'Anagram Architects',
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=90&auto=format&fit=crop',
    span: 'md:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Studio Loft',
    location: 'Bangalore',
    architect: 'Bureau de Change',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=90&auto=format&fit=crop',
    span: 'md:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'Terraced Residence',
    location: 'Ooty',
    architect: 'DADA Partners',
    src: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=90&auto=format&fit=crop',
    span: 'md:col-span-12',
    aspect: 'aspect-[21/9]',
  },
]

/* ── Exterior projects ── */
const EXTERIOR = [
  {
    name: 'Silhouette Residences',
    location: 'Whitefield, Bangalore',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=90&auto=format&fit=crop',
    span: 'md:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    name: 'The Brick House',
    location: 'Auroville',
    src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=90&auto=format&fit=crop',
    span: 'md:col-span-8',
    aspect: 'aspect-[16/10]',
  },
  {
    name: 'Concrete Canopy',
    location: 'Hyderabad',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90&auto=format&fit=crop',
    span: 'md:col-span-8',
    aspect: 'aspect-[16/10]',
  },
  {
    name: 'The Lattice Tower',
    location: 'Mumbai',
    src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=900&q=90&auto=format&fit=crop',
    span: 'md:col-span-4',
    aspect: 'aspect-[3/4]',
  },
]

type GalleryItem = {
  name: string
  location: string
  src: string
  span: string
  aspect: string
  architect?: string
}

function GalleryCard({ item, delay = 0, showArchitect = false }: {
  item: GalleryItem
  delay?: number
  showArchitect?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref} className={`${item.span}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        className={`relative overflow-hidden ${item.aspect} group cursor-pointer`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ filter: 'brightness(0.93) saturate(0.88)' }}
        />

        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(14,14,12,0.75) 0%, transparent 55%)' }}
        />
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 p-5 md:p-7"
        >
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase mb-1.5" style={{ color: GOLD }}>
            {item.location}
          </p>
          <p
            className="font-sans text-[18px] md:text-[22px] font-light leading-tight"
            style={{ color: '#F5F1EA', letterSpacing: '-0.01em' }}
          >
            {item.name}
          </p>
          {showArchitect && item.architect && (
            <p className="font-sans text-[11px] mt-1" style={{ color: 'rgba(245,241,234,0.5)' }}>
              {item.architect}
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
      {children}
    </p>
  )
}

export default function ArchGallerySection() {
  const intRef = useRef<HTMLDivElement>(null)
  const extRef = useRef<HTMLDivElement>(null)
  const intInView = useInView(intRef, { once: true, margin: '-60px' })
  const extInView = useInView(extRef, { once: true, margin: '-60px' })

  return (
    <>
      {/* ── Interior Photography ── */}
      <section style={{ padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)', background: T.bg }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <motion.div
            ref={intRef}
            initial={{ opacity: 0, y: 20 }}
            animate={intInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-10 md:mb-14"
          >
            <SectionLabel>Interior Photography</SectionLabel>
            <div className="h-px flex-1" style={{ background: T.border }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            {INTERIOR.map((item, i) => (
              <GalleryCard key={item.name} item={item} delay={i * 0.06} showArchitect />
            ))}
          </div>
        </div>
      </section>

      {/* ── Exterior Photography ── */}
      <section style={{ background: T.bgAlt, borderTop: `1px solid ${T.border}`, padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <motion.div
            ref={extRef}
            initial={{ opacity: 0, y: 20 }}
            animate={extInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-10 md:mb-14"
          >
            <SectionLabel>Exterior Photography</SectionLabel>
            <div className="h-px flex-1" style={{ background: T.border }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            {EXTERIOR.map((item, i) => (
              <GalleryCard key={item.name} item={item} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
