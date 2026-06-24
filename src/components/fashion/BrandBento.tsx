import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const BLUE = '#3D7BFF'

const BRANDS = [
  {
    name: 'Zara India',
    category: 'Fast Fashion',
    projects: 12,
    src: 'https://picsum.photos/seed/br1/800/600',
    gridArea: 'a',
  },
  {
    name: 'Sabyasachi',
    category: 'Couture',
    projects: 8,
    src: 'https://picsum.photos/seed/br2/600/800',
    gridArea: 'b',
  },
  {
    name: 'Fabindia',
    category: 'Heritage Wear',
    projects: 6,
    src: 'https://picsum.photos/seed/br3/600/600',
    gridArea: 'c',
  },
  {
    name: 'H&M India',
    category: 'Contemporary',
    projects: 9,
    src: 'https://picsum.photos/seed/br4/800/500',
    gridArea: 'd',
  },
  {
    name: 'Mango',
    category: 'Premium Casual',
    projects: 5,
    src: 'https://picsum.photos/seed/br5/600/700',
    gridArea: 'e',
  },
]

function BrandCard({ brand, delay = 0 }: { brand: (typeof BRANDS)[0]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ gridArea: brand.gridArea, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={brand.src}
        alt={brand.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Permanent dark base */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)' }} />

      {/* Hover blue tint */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: `rgba(61,123,255,0.12)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(14px, 2vw, 24px)' }}>
        <motion.p
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BLUE, margin: '0 0 6px' }}
          animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {brand.category} · {brand.projects} projects
        </motion.p>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 1.5vw, 20px)', color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
          {brand.name}
        </p>
      </div>
    </motion.div>
  )
}

export default function BrandBento() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#F7F7F7', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: BLUE, marginBottom: 12 }}>
            Clients & Collaborations
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
              Brands We've Shaped
            </h2>
            <div style={{ height: 1, flex: 1, background: '#E0E0E0' }} />
          </div>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateAreas: `
              "a a b c"
              "d d b e"
            `,
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: '320px 320px',
            gap: 10,
          }}
        >
          {BRANDS.map((brand, i) => (
            <BrandCard key={brand.name} brand={brand} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  )
}
