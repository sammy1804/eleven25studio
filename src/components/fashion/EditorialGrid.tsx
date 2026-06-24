import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const BLUE = '#3D7BFF'

const CAMPAIGNS = [
  {
    title: 'Midnight Couture',
    client: 'Zara India',
    year: '2024',
    tags: ['Editorial', 'Campaign'],
    src: 'https://picsum.photos/seed/ed_c1/900/1100',
    wide: true,
  },
  {
    title: 'Raw Silk Series',
    client: 'Fabindia',
    year: '2024',
    tags: ['Lookbook'],
    src: 'https://picsum.photos/seed/ed_c2/700/900',
    wide: false,
  },
  {
    title: 'Chrome Season',
    client: 'H&M India',
    year: '2023',
    tags: ['Campaign', 'Digital'],
    src: 'https://picsum.photos/seed/ed_c3/700/900',
    wide: false,
  },
  {
    title: 'Monsoon Muse',
    client: 'Mango India',
    year: '2023',
    tags: ['Editorial'],
    src: 'https://picsum.photos/seed/ed_c4/900/1100',
    wide: true,
  },
  {
    title: 'Concrete Garden',
    client: 'Uniqlo',
    year: '2024',
    tags: ['Lookbook', 'Campaign'],
    src: 'https://picsum.photos/seed/ed_c5/900/1100',
    wide: true,
  },
  {
    title: 'The Silk Road',
    client: 'Sabyasachi',
    year: '2024',
    tags: ['Editorial'],
    src: 'https://picsum.photos/seed/ed_c6/700/900',
    wide: false,
  },
]

function CampaignCard({
  campaign,
  index,
}: {
  campaign: (typeof CAMPAIGNS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.12 }}
      style={{
        flex: isMobile ? '1 1 auto' : (campaign.wide ? '0 0 65%' : '0 0 35%'),
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: campaign.wide ? '3/4' : '2/3' }}>
        <motion.img
          src={campaign.src}
          alt={campaign.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Blue line on hover */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            background: BLUE,
            width: '100%',
            transformOrigin: 'left',
          }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 15, color: '#1A1A1A', margin: 0, letterSpacing: '-0.01em' }}>
            {campaign.title}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: '#888888', margin: '4px 0 0', letterSpacing: '0.02em' }}>
            {campaign.client}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '45%' }}>
          {campaign.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: BLUE,
                border: `1px solid ${BLUE}`,
                borderRadius: 2,
                padding: '2px 7px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function EditorialGrid() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  // Pair campaigns: 0+1, 2+3, 4+5 — alternate which is wide/narrow
  const pairs = [
    [CAMPAIGNS[0], CAMPAIGNS[1]],
    [CAMPAIGNS[2], CAMPAIGNS[3]],
    [CAMPAIGNS[4], CAMPAIGNS[5]],
  ]

  return (
    <section
      id="editorial"
      style={{
        background: '#ffffff',
        padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: BLUE, marginBottom: 12 }}>
            Selected Work
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#1A1A1A', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
              Editorial Campaigns
            </h2>
            <div style={{ height: 1, flex: 1, background: '#E5E5E5' }} />
          </div>
        </motion.div>

        {/* Campaign pairs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 5vh, 4rem)' }}>
          {pairs.map(([a, b], pairIdx) => (
            <div
              key={a.title}
              style={{
                display: 'flex',
                gap: 'clamp(12px, 2vw, 32px)',
                flexDirection: isMobile ? 'column' : (pairIdx % 2 === 0 ? 'row' : 'row-reverse'),
              }}
            >
              <CampaignCard campaign={a} index={pairIdx * 2} />
              <CampaignCard campaign={b} index={pairIdx * 2 + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
