import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'

/* ── Polaroid photos ───────────────────────────────────── */
const POLAROIDS = [
  {
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=480&q=80&auto=format&fit=crop',
    rotate: -9,
    width: 190,
  },
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=480&q=80&auto=format&fit=crop',
    rotate: 6,
    width: 168,
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=480&q=80&auto=format&fit=crop',
    rotate: -3,
    width: 196,
  },
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=480&q=80&auto=format&fit=crop',
    rotate: 12,
    width: 182,
  },
  {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=480&q=80&auto=format&fit=crop',
    rotate: -13,
    width: 174,
  },
]

/* ── Nav columns ───────────────────────────────────────── */
const NAV_COLS = [
  {
    label: 'Studio',
    links: [
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'Gallery', href: '/gallery' },
      { text: 'Blog', href: '/' },
      { text: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Work',
    links: [
      { text: 'Architecture', href: '/architecture' },
      { text: 'Fashion', href: '/fashion' },
      { text: 'Events', href: '/eventing' },
      { text: 'Corporate', href: '/product' },
    ],
  },
  {
    label: 'Follow Us',
    links: [
      { text: 'Instagram', href: '#' },
      { text: 'LinkedIn', href: '#' },
      { text: 'YouTube', href: '#' },
      { text: 'Behance', href: '#' },
    ],
  },
]

/* ── Variant factory — per-photo rotation + staggered entry ── */
const makeVariants = (rotate: number, delay: number) => ({
  hidden: { opacity: 0, y: 40, rotate, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate,
    scale: 1,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    y: -80,
    scale: 1.1,
    rotate: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
})

/* ── Footer ────────────────────────────────────────────── */
export default function FooterSection() {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)
  const isMobile = useIsMobile()

  return (
    <footer style={{ background: '#0a0a0a', color: '#ffffff' }}>

      {/* ── Top: headline + contact ── */}
      <div
        style={{
          padding: isMobile
            ? '48px 24px 0'
            : 'clamp(64px, 8vh, 100px) clamp(40px, 6vw, 100px) 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(30px, 4.5vw, 58px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: 0,
          }}
        >
          Come see us.<br />Shoot with us.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ textAlign: isMobile ? 'left' : 'right' }}
        >
          {[
            'No.12, Nungambakkam High Rd',
            'Bangalore, Karnataka 560001',
            'hello@eleven25studios.com',
          ].map((line) => (
            <p
              key={line}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: 'rgba(255,255,255,0.45)',
                margin: '0 0 3px',
                lineHeight: 1.7,
              }}
            >
              {line}
            </p>
          ))}
        </motion.div>
      </div>

      {/* ── Polaroid photo strip ── */}
      <div
        style={{
          padding: isMobile
            ? '40px 24px 56px'
            : '56px clamp(40px, 6vw, 100px) 72px',
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
          overflowX: isMobile ? 'auto' : 'visible',
          overflowY: 'visible',
        }}
      >
        {POLAROIDS.map((photo, i) => {
          const isHov = hoveredPhoto === i
          const mobileScale = 0.72
          const mobileWidth = Math.round(photo.width * mobileScale)
          const w = isMobile ? mobileWidth : photo.width
          return (
            <motion.div
              key={i}
              variants={makeVariants(photo.rotate, i * 0.1)}
              initial="hidden"
              whileInView="visible"
              whileHover={isMobile ? undefined : 'hover'}
              viewport={{ once: true }}
              onMouseEnter={() => !isMobile && setHoveredPhoto(i)}
              onMouseLeave={() => !isMobile && setHoveredPhoto(null)}
              style={{
                position: 'relative',
                zIndex: isHov ? 20 : 1,
                background: '#ffffff',
                padding: isMobile ? '5px 5px 22px' : '7px 7px 30px',
                borderRadius: 3,
                boxShadow: isHov
                  ? '0 28px 70px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.5)'
                  : '0 10px 36px rgba(0,0,0,0.65)',
                cursor: 'pointer',
                flexShrink: 0,
                marginLeft: i === 0 ? 0 : isMobile ? -28 : -44,
                transition: 'box-shadow 0.35s ease',
              }}
            >
              <img
                src={photo.src}
                alt=""
                style={{
                  width: w,
                  height: Math.round(w * 0.78),
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* ── Bottom: tagline + nav columns ── */}
      <div
        style={{
          padding: isMobile ? '36px 24px 40px' : '48px clamp(40px, 6vw, 100px) 48px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr repeat(3, auto)',
          gap: isMobile ? 32 : 'clamp(28px, 5vw, 80px)',
          alignItems: 'start',
        }}
      >
        {/* Brand tagline — full width on mobile */}
        <div style={isMobile ? { gridColumn: '1 / -1' } : {}}>
          <img
            src="/logo_white.png"
            alt="Eleven25 Studios"
            style={{ height: 24, marginBottom: 28, display: 'block' }}
          />
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 20 : 'clamp(18px, 2.2vw, 28px)',
              lineHeight: 1.2,
              color: '#ffffff',
              margin: '0 0 2px',
              letterSpacing: '-0.025em',
            }}
          >
            Shoot. Edit.<br />Deliver. Launch.
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 20 : 'clamp(18px, 2.2vw, 28px)',
              lineHeight: 1.2,
              color: 'rgba(255,255,255,0.25)',
              margin: '0 0 32px',
              letterSpacing: '-0.025em',
            }}
          >
            Repeat.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.07em',
              margin: 0,
            }}
          >
            © 2025 Eleven25 Studios · Bangalore, India
          </p>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map((col) => (
          <div key={col.label}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.22)',
                margin: '0 0 18px',
              }}
            >
              {col.label}
            </p>
            {col.links.map((link) => (
              <div key={link.text} style={{ marginBottom: 11 }}>
                <Link
                  to={link.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.52)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.52)')
                  }
                >
                  {link.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}
