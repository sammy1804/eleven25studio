import { motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'
import StatCard from './bento/StatCard'
import GalleryPreviewCard from './bento/GalleryPreviewCard'
import BlogJournalCard from './bento/BlogJournalCard'

const headerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const DESKTOP_GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)',
  gridTemplateRows: '200px 440px',
  gridTemplateAreas: `
    "statA statB gallery"
    "blog  blog  statC  "
  `,
  gap: 10,
}

const MOBILE_GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 10,
}

export default function StatsBento() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: '#111111',
        padding: 'clamp(60px, 8vh, 96px) clamp(24px, 5vw, 40px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>

        {/* ── Section header ── */}
        <motion.div
          variants={headerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            marginBottom: 48,
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#0096E6',
                margin: '0 0 8px',
              }}
            >
              • The work so far
            </p>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 3vw, 40px)',
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Six years. Four disciplines.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: 'rgba(255,255,255,0.40)',
              lineHeight: 1.9,
              maxWidth: 320,
              margin: 0,
              textAlign: isMobile ? 'left' : 'right',
            }}
          >
            Every number here represents a real project, a real client, a real story told through a lens.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div
          style={{
            background: '#0A0A0A',
            borderRadius: 20,
            padding: 12,
            overflow: 'hidden',
          }}
        >
          <div style={isMobile ? MOBILE_GRID : DESKTOP_GRID}>
            <div style={isMobile ? {} : { gridArea: 'statA' }}>
              <StatCard number={200} suffix="+" label="Projects Delivered" delay={0} />
            </div>
            <div style={isMobile ? {} : { gridArea: 'statB' }}>
              <StatCard number={47} suffix=" Films" label="Cinematic Films Made" delay={0.08} />
            </div>
            <div style={isMobile ? {} : { gridArea: 'gallery' }}>
              <GalleryPreviewCard />
            </div>
            <div style={isMobile ? {} : { gridArea: 'blog' }}>
              <BlogJournalCard />
            </div>
            <div style={isMobile ? {} : { gridArea: 'statC' }}>
              <StatCard number={6} suffix=" Yrs" label="In the Field" delay={0.16} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
