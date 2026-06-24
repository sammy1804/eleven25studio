import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

const DISCIPLINES = [
  {
    num: '01',
    label: 'Architecture',
    heading: '"Buildings as characters."',
    body: '[CLIENT TO PROVIDE — Sadiq\'s personal statement on why he photographs architecture. What does a building tell him that a person cannot? What does the lens reveal that the eye misses? 3–4 sentences, first person, honest.]',
    imgSrc: 'https://picsum.photos/seed/disc_1/700/525',
    imgLeft: true,
  },
  {
    num: '02',
    label: 'Fashion',
    heading: '"People in the frame."',
    body: '[CLIENT TO PROVIDE — His relationship with fashion photography. How does it differ from architecture? What does the presence of a human subject change? What does he look for in a fashion frame?]',
    imgSrc: 'https://picsum.photos/seed/disc_2/700/525',
    imgLeft: false,
  },
  {
    num: '03',
    label: 'Eventing',
    heading: '"The room, not the stage."',
    body: '[CLIENT TO PROVIDE — Why eventing photography matters to him. The chaos, the candor, the fleeting quality of a live moment. What does he try to capture that others miss?]',
    imgSrc: 'https://picsum.photos/seed/disc_3/700/525',
    imgLeft: true,
  },
  {
    num: '04',
    label: 'Product',
    heading: '"An object deserves a portrait."',
    body: '[CLIENT TO PROVIDE — The discipline and craft of product photography. How does he approach an inanimate object with the same care as a person or a building? What does light do for a product?]',
    imgSrc: 'https://picsum.photos/seed/disc_4/700/525',
    imgLeft: false,
  },
]

function DisciplineRow({ d, isLast }: { d: (typeof DISCIPLINES)[0]; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: d.imgLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          display: 'flex',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'center',
          padding: 'clamp(3rem, 6vh, 5rem) 0',
          flexDirection: d.imgLeft ? 'row' : 'row-reverse',
        }}
      >
        {/* Image */}
        <div style={{ flex: '0 0 45%', overflow: 'hidden', aspectRatio: '4/3' }}>
          <img
            src={d.imgSrc}
            alt={d.label}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.88) saturate(0.85)' }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            {d.num} — {d.label}
          </p>
          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              color: '#1A1A1A',
              margin: '0 0 20px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {d.heading}
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.9, color: '#666666', margin: 0, maxWidth: 420 }}>
            {d.body}
          </p>
        </div>
      </motion.div>
      {!isLast && <div style={{ height: 1, background: '#E0DED8' }} />}
    </>
  )
}

export default function AboutDisciplines() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: 'clamp(1rem, 2vh, 2rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            • The Disciplines
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 'clamp(26px, 3vw, 42px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.02em' }}>
              Four ways of seeing.
            </h2>
            <div style={{ height: 1, flex: 1, background: '#E0DED8' }} />
          </div>
        </motion.div>

        {DISCIPLINES.map((d, i) => (
          <DisciplineRow key={d.label} d={d} isLast={i === DISCIPLINES.length - 1} />
        ))}
      </div>
    </section>
  )
}
