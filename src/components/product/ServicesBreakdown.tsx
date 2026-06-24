import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const SERVICES = [
  {
    num: '01',
    category: 'Commercial',
    items: ['Hero & campaign shots', 'Lifestyle context', 'Brand storytelling', 'Retouching included'],
  },
  {
    num: '02',
    category: 'E-Commerce',
    items: ['White bg studio shots', 'Multi-angle sets', 'Detail & texture', 'Batch processing available'],
  },
  {
    num: '03',
    category: 'Product Films',
    items: ['Launch films', 'Brand documentaries', 'Social cuts (9:16)', 'Motion graphics'],
  },
]

export default function ServicesBreakdown() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <section style={{ background: '#0A0A0A', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}
          ref={ref}
        >
          • What's Included
        </motion.p>

        {/* 3 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 0 }}>
          {SERVICES.map((svc, si) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: si * 0.1, ease: EASE }}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                borderLeft: !isMobile && si > 0 ? '1px solid #2A2A2A' : 'none',
                borderTop: isMobile && si > 0 ? '1px solid #2A2A2A' : 'none',
              }}
            >
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                color: GOLD,
                margin: '0 0 12px',
                lineHeight: 1,
              }}>
                {svc.num}
              </p>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                color: '#ffffff',
                margin: '0 0 20px',
                letterSpacing: '0.01em',
              }}>
                {svc.category}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {svc.items.map((item, ii) => (
                  <motion.p
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: si * 0.1 + 0.15 + ii * 0.05, ease: EASE }}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.5)',
                      margin: 0,
                    }}
                  >
                    — {item}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
