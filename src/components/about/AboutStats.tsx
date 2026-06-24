import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const STATS = [
  { num: '200+', label: 'Projects',   sub: 'Architecture & commercial' },
  { num: '47',   label: 'Films Made', sub: 'Short films & brand docs' },
  { num: '6',    label: 'Years',      sub: 'Since 2019' },
  { num: '12',   label: 'Cities',     sub: 'Across India & beyond' },
]

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <section style={{ background: '#F5F4F1', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: GOLD,
            marginBottom: 'clamp(2rem, 4vh, 3.5rem)',
          }}
        >
          • The Work So Far
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0 }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              style={{
                padding: 'clamp(1.5rem, 3vw, 3rem)',
                borderTop: '1px solid #DDDBD7',
                borderLeft: (!isMobile && i > 0) || (isMobile && i % 2 !== 0) ? '1px solid #DDDBD7' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(42px, 5vw, 72px)',
                  color: '#1A1A1A',
                  lineHeight: 1,
                  display: 'block',
                  letterSpacing: '-0.03em',
                  marginBottom: 8,
                }}
              >
                {stat.num}
              </span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 12, color: '#1A1A1A', margin: '0 0 4px', letterSpacing: '0.05em' }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#AAAAAA', margin: 0 }}>
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #DDDBD7' }} />
      </div>
    </section>
  )
}
