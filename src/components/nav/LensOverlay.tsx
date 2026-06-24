import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSpring, useTransform } from 'framer-motion'
import { FullLens } from './CameraLens'

const CATEGORIES = [
  {
    label: 'Architecture', href: '/architecture',
    position: 'top' as const,
    sub: ['Architectural Photography', 'Interior Documentation', 'Exterior Documentation'],
  },
  {
    label: 'Fashion', href: '/fashion',
    position: 'right' as const,
    sub: ['Editorial Campaigns', 'Fashion Photography', 'Brand Collaborations'],
  },
  {
    label: 'Eventing', href: '/events',
    position: 'bottom' as const,
    sub: ['Corporate Events', 'Workshops', 'Community Experiences'],
  },
  {
    label: 'Product', href: '/corporate',
    position: 'left' as const,
    sub: ['Commercial Photography', 'Product Films', 'E-Commerce Content'],
  },
]

const SECONDARY = [
  { label: 'About', href: '/about' },
  { label: "Client's Hub", href: '/gallery' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

interface LensOverlayProps {
  onClose: () => void
}

function CategoryLabel({
  cat,
  dark,
  onNavigate,
}: {
  cat: typeof CATEGORIES[0]
  dark: boolean
  onNavigate: (href: string) => void
}) {
  const [hov, setHov] = useState(false)
  const fg = dark ? '#ffffff' : '#1a1a1a'
  const fgMuted = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)'
  const isTop = cat.position === 'top'
  const isBottom = cat.position === 'bottom'

  const posStyle: React.CSSProperties =
    cat.position === 'top'
      ? { top: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', flexDirection: 'column-reverse' }
      : cat.position === 'bottom'
      ? { bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', flexDirection: 'column' }
      : cat.position === 'left'
      ? { left: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'right', flexDirection: 'row-reverse' }
      : { right: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'left', flexDirection: 'row' }

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        ...posStyle,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Sub-items above (for top) */}
      {isTop && (
        <AnimatePresence>
          {hov && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}
            >
              {cat.sub.map((s) => (
                <div
                  key={s}
                  style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: fgMuted, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onClick={() => onNavigate(cat.href)}
                >
                  {s}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Dot — above label for top, below for bottom */}
      {(isTop || isBottom) && (
        <motion.div
          animate={{ scale: hov ? 1.5 : 1, backgroundColor: hov ? '#E0261A' : fg }}
          transition={{ duration: 0.2 }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: fg, flexShrink: 0, alignSelf: 'center' }}
        />
      )}

      {/* Label */}
      <button
        onClick={() => onNavigate(cat.href)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(14px, 1.8vw, 20px)',
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: hov ? '#E0261A' : fg,
          transition: 'color 0.2s',
          padding: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {cat.label}
      </button>

      {/* Sub-items right of label (for right position) */}
      {cat.position === 'right' && (
        <AnimatePresence>
          {hov && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              {cat.sub.map((s) => (
                <div
                  key={s}
                  style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: fgMuted, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onClick={() => onNavigate(cat.href)}
                >
                  {s}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Sub-items left of label (for left position) */}
      {cat.position === 'left' && (
        <AnimatePresence>
          {hov && (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              {cat.sub.map((s) => (
                <div
                  key={s}
                  style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: fgMuted, cursor: 'pointer', whiteSpace: 'nowrap', textAlign: 'right' }}
                  onClick={() => onNavigate(cat.href)}
                >
                  {s}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Sub-items below label (for bottom) */}
      {isBottom && (
        <AnimatePresence>
          {hov && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}
            >
              {cat.sub.map((s) => (
                <div
                  key={s}
                  style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: fgMuted, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onClick={() => onNavigate(cat.href)}
                >
                  {s}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default function LensOverlay({ onClose }: LensOverlayProps) {
  const [dark, setDark] = useState(true)
  const [navigate, setNavigate] = useState<string | null>(null)

  const bg = dark ? '#0B0B0B' : '#EFEEEC'
  const fg = dark ? '#ffffff' : '#1a1a1a'
  const fgMuted = dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)'

  const focusAngle = useSpring(0, { stiffness: 55, damping: 20, mass: 1.2 })
  const focusRot = useTransform(focusAngle, (v) => `${v}deg`)

  function handleNavigate(href: string) {
    setNavigate(href)
    onClose()
    // Use history push after overlay closes
    setTimeout(() => window.location.pathname !== href && (window.location.href = href), 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 600,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'background 0.35s ease',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: '-0.03em', color: fg }}>
          ELEVEN<span style={{ color: '#E0261A' }}>25</span>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Dark/Light toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            style={{
              background: 'none', border: `1px solid ${fgMuted}`, cursor: 'pointer',
              padding: '6px 14px', borderRadius: 20,
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.08em',
              color: fgMuted, transition: 'all 0.25s',
            }}
          >
            {dark ? '◐ Light' : '◑ Dark'}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: fg, display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Close
          </button>
        </div>
      </div>

      {/* Main content — compass + lens */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Compass container */}
        <div style={{ position: 'relative', width: 380, height: 380 }}>
          {/* Category labels */}
          {CATEGORIES.map((cat) => (
            <CategoryLabel key={cat.label} cat={cat} dark={dark} onNavigate={handleNavigate} />
          ))}

          {/* Center lens */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FullLens size={200} dark={dark} focusRot={focusRot} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '24px 40px 32px', flexShrink: 0 }}>
        {/* Email */}
        <a
          href="mailto:hello@eleven25studios.com"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: fgMuted, textDecoration: 'none', letterSpacing: '0.02em' }}
        >
          hello@eleven25studios.com
        </a>

        {/* Secondary links */}
        <div style={{ display: 'flex', gap: 24 }}>
          {SECONDARY.map((s) => (
            <button
              key={s.label}
              onClick={() => handleNavigate(s.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: fgMuted,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: 16 }}>
          {(['IG', 'LI', 'YT'] as const).map((s) => (
            <button
              key={s}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.18em',
                color: fgMuted,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
