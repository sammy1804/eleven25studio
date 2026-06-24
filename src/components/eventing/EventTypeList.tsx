import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const PURPLE = '#A78BFA'
const BOUNCE = [0.34, 1.56, 0.64, 1] as const

const EVENT_TYPES = [
  'Corporate Conferences & Summits',
  'Award Nights & Galas',
  'Product & Brand Launches',
  'Networking & Community Events',
  'Cultural Festivals & Performances',
  'Exhibitions & Gallery Openings',
  'Team Events & Internal Activations',
]

function ListItem({ label, index, delay }: { label: string; index: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: BOUNCE, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {index > 0 && <div style={{ height: 1, background: '#E0DED8', marginBottom: 0 }} />}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '18px 0',
          cursor: 'default',
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: '0.05em',
            color: hovered ? PURPLE : 'rgba(167,139,250,0.55)',
            minWidth: 24,
            fontVariantNumeric: 'tabular-nums',
            transition: 'color 0.25s',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Arrow prefix */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: PURPLE,
            lineHeight: 1,
            marginLeft: -8,
          }}
        >
          →
        </motion.span>

        {/* Label */}
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: '#1A1A1A',
            letterSpacing: '-0.01em',
            transition: 'transform 0.2s',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  )
}

export default function EventTypeList() {
  const leftRef = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#F5F4F1', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)', borderTop: '1px solid #E5E2DB' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(3rem, 6vw, 8rem)', alignItems: 'start' }}>

        {/* Left */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, y: 24 }}
          animate={leftInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'sticky', top: 120 }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: PURPLE, marginBottom: 18 }}>
            • What We Cover
          </p>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            "If it happens,<br />we document it."
          </h2>
        </motion.div>

        {/* Right — list */}
        <div>
          {EVENT_TYPES.map((label, i) => (
            <ListItem key={label} label={label} index={i} delay={i * 0.06} />
          ))}
          {/* Bottom rule */}
          <div style={{ height: 1, background: '#E0DED8' }} />
        </div>

      </div>
    </section>
  )
}
