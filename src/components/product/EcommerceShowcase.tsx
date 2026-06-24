import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

function Tag({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 300,
      fontSize: 10,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      background: '#F5F4F1',
      color: '#888888',
      borderRadius: 100,
      padding: '4px 10px',
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}

function ShowcaseImg({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', background: '#FAFAFA', ...style }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}

function Row({ children, fromLeft, delay }: { children: React.ReactNode; fromLeft: boolean; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function EcommerceShowcase() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#F5F4F1', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            • E-Commerce
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(26px, 3vw, 42px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.02em' }}>
              Content built to convert.
            </h2>
            <div style={{ height: 1, flex: 1, background: '#DDDBD7' }} />
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vh, 3.5rem)' }}>

          {/* Row 1 — Hero shots: large + 2 small */}
          <Row fromLeft delay={0.05}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <Tag label="Hero Shot" />
              <Tag label="Lifestyle" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '280px 280px', gap: 8 }}>
              <ShowcaseImg
                src="https://picsum.photos/seed/ecom1/600/600"
                alt="Hero shot"
                style={{ gridRow: '1 / 3', height: '100%' }}
              />
              <ShowcaseImg
                src="https://picsum.photos/seed/ecom2/600/600"
                alt="Detail close-up"
                style={{ height: '100%' }}
              />
              <ShowcaseImg
                src="https://picsum.photos/seed/ecom_l1/600/400"
                alt="Lifestyle context"
                style={{ height: '100%' }}
              />
            </div>
          </Row>

          {/* Row 2 — Flat lay */}
          <Row fromLeft={false} delay={0.05}>
            <div style={{ marginBottom: 12 }}>
              <Tag label="Flat Lay" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <ShowcaseImg
                src="https://picsum.photos/seed/ecom3/600/600"
                alt="Flat lay white bg"
                style={{ aspectRatio: '4/3' }}
              />
              <ShowcaseImg
                src="https://picsum.photos/seed/ecom4/600/600"
                alt="Flat lay dark bg"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </Row>

          {/* Row 3 — Multi-angle */}
          <Row fromLeft delay={0.05}>
            <div style={{ marginBottom: 12 }}>
              <Tag label="Multi-angle" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {['Front', 'Side', 'Back', 'Detail'].map((angle, i) => (
                <div key={angle} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <ShowcaseImg
                    src={`https://picsum.photos/seed/ecom${5 + i}/600/600`}
                    alt={`${angle} angle`}
                    style={{ aspectRatio: '1/1' }}
                  />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: '#888888', margin: 0, letterSpacing: '0.05em' }}>
                    {angle}
                  </p>
                </div>
              ))}
            </div>
          </Row>

        </div>
      </div>
    </section>
  )
}
