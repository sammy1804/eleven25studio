import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A35F'
const EASE = [0.22, 1, 0.36, 1] as const

function Chapter({
  num,
  heading,
  body,
  note,
  imgSrc,
  imgRight = false,
}: {
  num: string
  heading: string
  body: string
  note?: string
  imgSrc?: string
  imgRight?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const imgRef = useRef<HTMLDivElement>(null)
  const imgInView = useInView(imgRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE }}
      style={{ position: 'relative' }}
    >
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: GOLD, marginBottom: 14, letterSpacing: '0.05em' }}>
        {num}
      </p>
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(26px, 3vw, 40px)',
          color: '#1A1A1A',
          margin: '0 0 24px',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {heading}
      </h2>

      {/* Inline image — float right when imgRight */}
      {imgSrc && imgRight && (
        <motion.div
          ref={imgRef}
          initial={{ opacity: 0 }}
          animate={imgInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            float: 'right',
            width: '45%',
            marginLeft: 40,
            marginBottom: 16,
            aspectRatio: '3/4',
            overflow: 'hidden',
          }}
        >
          <img
            src={imgSrc}
            alt="Behind the scenes"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.88) saturate(0.85)' }}
          />
        </motion.div>
      )}

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          lineHeight: 2.0,
          color: '#555555',
          margin: '0 0 16px',
        }}
      >
        {body}
      </p>

      {note && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 12,
            color: '#AAAAAA',
            margin: '16px 0 0',
          }}
        >
          {note}
        </p>
      )}

      {/* Clear float */}
      <div style={{ clear: 'both' }} />
    </motion.div>
  )
}

export default function AboutStory() {
  const wideRef = useRef<HTMLDivElement>(null)
  const wideInView = useInView(wideRef, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vh, 5rem)' }}>

        {/* Chapter 01 */}
        <Chapter
          num="01"
          heading='"Architecture first."'
          imgSrc="https://picsum.photos/seed/sadiq_bts1/600/800"
          imgRight
          body="Sadiq studied architecture at [Institution], where he developed an obsession not just with designing spaces, but with documenting them. He would carry a camera to every site visit. His professors thought it was a distraction. It turned out to be the point. [CLIENT TO PROVIDE — full biography for this chapter]"
        />

        {/* Chapter 02 */}
        <Chapter
          num="02"
          heading='"Then came the lens."'
          body="[CLIENT TO PROVIDE — Sadiq's personal account of how photography became the primary instrument. What was the turning point? What was the first shoot that felt like it mattered? What changed in how he saw the world once the camera was in his hands?]"
        />

        {/* Wide panoramic between 02 and 03 */}
        <motion.div
          ref={wideRef}
          initial={{ opacity: 0 }}
          animate={wideInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE }}
          style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}
        >
          <img
            src="https://picsum.photos/seed/sadiq_wide/1200/514"
            alt="Behind the scenes panoramic"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }}
          />
        </motion.div>

        {/* Chapter 03 */}
        <Chapter
          num="03"
          heading='"Eleven25."'
          body="[CLIENT TO PROVIDE — The founding of the studio. What led to going independent? What does Eleven25 mean as a creative entity? What is its philosophy? Who are the people who make it run?]"
          note="The name Eleven25 comes from [client to fill in]."
        />

      </div>
    </section>
  )
}
