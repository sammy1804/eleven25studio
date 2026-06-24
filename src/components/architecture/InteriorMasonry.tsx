import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'

const PROJECTS = [
  { name: 'The Living Cave',       location: 'Chennai',     architect: 'Studio Arka',        seed: 'int1',  tall: true  },
  { name: 'Glass & Shadow',        location: 'Hyderabad',   architect: 'Morphogenesis',      seed: 'int2s', tall: false },
  { name: 'Warm Concrete Loft',    location: 'Bengaluru',   architect: 'Biome Solutions',    seed: 'int3',  tall: true  },
  { name: 'The Quiet Study',       location: 'Kochi',       architect: 'Malabar Arch',       seed: 'int4',  tall: false },
  { name: 'Japanese Minimalist',   location: 'Auroville',   architect: 'Satprem Maïni',      seed: 'int5',  tall: true  },
  { name: 'Industrial Penthouse',  location: 'Mumbai',      architect: 'Studio Lotus',       seed: 'int6',  tall: false },
  { name: 'The Garden Room',       location: 'Coimbatore',  architect: 'Self Build',         seed: 'int7',  tall: false },
  { name: 'White Silence',         location: 'Pondicherry', architect: 'Raul Renard',        seed: 'int8',  tall: true  },
]

// Distribute 8 items across 3 columns
const COL1 = [0, 3, 6]   // indices
const COL2 = [1, 4, 7]
const COL3 = [2, 5]

function MasonryCard({ project, delay, colDelay }: { project: typeof PROJECTS[0]; delay: number; colDelay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)

  const imgSrc = project.tall
    ? `https://picsum.photos/seed/${project.seed}/600/800`
    : `https://picsum.photos/seed/${project.seed}/600/400`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay + colDelay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'block', marginBottom: 3 }}
    >
      {/* Image */}
      <motion.img
        src={imgSrc}
        alt={project.name}
        loading="lazy"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
        animate={{ scale: hov ? 1.03 : 1, filter: hov ? 'brightness(0.65)' : 'brightness(0.88)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          pointerEvents: 'none',
        }}
      />

      {/* Arrow top-right */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : 4, y: hov ? 0 : -4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          fontFamily: "'Poppins', sans-serif",
          fontSize: 18,
          color: GOLD,
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        →
      </motion.div>

      {/* Text slides up on hover */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      >
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 14, color: '#ffffff', lineHeight: 1.3, marginBottom: 3 }}>
          {project.name}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>
          {project.location}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: GOLD }}>
          {project.architect}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function InteriorMasonry() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="interior" style={{ padding: 'clamp(80px, 10vh, 120px) clamp(40px, 6vw, 100px)', background: '#f9f9f9' }}>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD }}>
          • INTERIOR
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', letterSpacing: '0.06em' }}>
          18 Projects
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 'clamp(40px, 6vh, 64px)', borderBottom: '1px solid rgba(26,26,26,0.08)', paddingBottom: 24 }}
      >
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 'clamp(22px, 3vw, 32px)', color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          The life within the walls.
        </p>
      </motion.div>

      {/* Asymmetric 3-column masonry */}
      <div style={{ display: 'grid', gridTemplateColumns: '45% 28% 27%', gap: 3, alignItems: 'start' }}>
        {/* Column 1 */}
        <div>
          {COL1.map((idx, i) => (
            <MasonryCard key={PROJECTS[idx].name} project={PROJECTS[idx]} delay={i * 0.08} colDelay={0} />
          ))}
        </div>

        {/* Column 2 */}
        <div>
          {COL2.map((idx, i) => (
            <MasonryCard key={PROJECTS[idx].name} project={PROJECTS[idx]} delay={i * 0.08} colDelay={0.1} />
          ))}
        </div>

        {/* Column 3 */}
        <div>
          {COL3.map((idx, i) => (
            <MasonryCard key={PROJECTS[idx].name} project={PROJECTS[idx]} delay={i * 0.08} colDelay={0.2} />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <a
          href="#"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: '#888888',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            transition: 'color 0.25s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={e => (e.currentTarget.style.color = '#888888')}
        >
          View all 18 interiors →
        </a>
      </div>
    </section>
  )
}
