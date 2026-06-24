import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const ITEMS = [
  { name: 'Meridian Watch',   brand: 'Meridian Co.',    src: 'https://picsum.photos/seed/prod_c1/500/500' },
  { name: 'Glass Vessel',     brand: 'Kiln Studio',     src: 'https://picsum.photos/seed/prod_c2/500/500' },
  { name: 'Running Shoe X',   brand: 'AthleteCore',     src: 'https://picsum.photos/seed/prod_c3/500/500' },
  { name: 'Perfume No. 7',    brand: 'Maison Dix',      src: 'https://picsum.photos/seed/prod_c4/500/500' },
  { name: 'The Laptop Bag',   brand: 'Carry Co.',       src: 'https://picsum.photos/seed/prod_c5/500/500' },
  { name: 'Ceramic Series',   brand: 'Earth & Fire',    src: 'https://picsum.photos/seed/prod_c6/500/500' },
  { name: 'Eyewear Edit',     brand: 'Frame House',     src: 'https://picsum.photos/seed/prod_c7/500/500' },
  { name: 'Coffee Set',       brand: 'Brew Lab',        src: 'https://picsum.photos/seed/prod_c8/500/500' },
  { name: 'Skincare Range',   brand: 'Bare Studio',     src: 'https://picsum.photos/seed/prod_c9/500/500' },
  { name: 'Denim Edit',       brand: 'Raw Collective',  src: 'https://picsum.photos/seed/prod_c10/500/500' },
  { name: 'Kitchen Knives',   brand: 'Edge & Co.',      src: 'https://picsum.photos/seed/prod_c11/500/500' },
  { name: 'Headphones',       brand: 'SoundOne',        src: 'https://picsum.photos/seed/prod_c12/500/500' },
]

function GridItem({ item, delay }: { item: (typeof ITEMS)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#FAFAFA' }}>
        <motion.img
          src={item.src}
          alt={item.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          animate={{ scale: hov ? 1.03 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
        {/* Gold bottom border */}
        <motion.div
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: GOLD, transformOrigin: 'left' }}
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        {/* Lift — handled via parent translateY */}
      </div>

      {/* Text */}
      <motion.div
        animate={{ y: hov ? -4 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13, color: '#1A1A1A', margin: 0, letterSpacing: '-0.01em' }}>
          {item.name}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', margin: '4px 0 0' }}>
          {item.brand}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function CommercialGrid() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      id="commercial"
      style={{ background: '#ffffff', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}
        >
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
              • Commercial
            </p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(26px, 3vw, 42px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.02em' }}>
              Campaigns & Brand Imagery
            </h2>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: '#AAAAAA', margin: 0 }}>
            {ITEMS.length} projects
          </p>
        </motion.div>

        {/* 3-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(16px, 2.5vw, 32px)' }}>
          {ITEMS.map((item, i) => (
            <GridItem key={item.name} item={item} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
