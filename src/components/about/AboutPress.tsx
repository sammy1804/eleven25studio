import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const PRESS = [
  { outlet: 'Dezeen',      mention: '"Best Architectural Photography — India 2024"' },
  { outlet: 'Vogue India', mention: '"10 Photographers Redefining Visual India"' },
]

// Set to false to hide this section if no press yet
const HAS_PRESS = true

export default function AboutPress() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  if (!HAS_PRESS) return null

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 32 }}
        >
          • Recognition
        </motion.p>

        <div>
          {PRESS.map((item, i) => (
            <motion.div
              key={item.outlet}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
            >
              <div style={{ height: 1, background: '#EBEBEB' }} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 40,
                  padding: '22px 0',
                }}
              >
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13, color: '#1A1A1A', minWidth: 100, letterSpacing: '-0.01em' }}>
                  {item.outlet}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 14, color: '#555555' }}>
                  {item.mention}
                </span>
              </div>
            </motion.div>
          ))}
          <div style={{ height: 1, background: '#EBEBEB' }} />
        </div>
      </div>
    </section>
  )
}
