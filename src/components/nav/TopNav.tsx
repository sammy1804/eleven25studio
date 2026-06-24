import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useSpring, useTransform, useScroll } from 'framer-motion'
import { SmallLens } from './CameraLens'
import LensOverlay from './LensOverlay'

const ANGLE_MAP: Record<string, number> = {
  '/architecture': 0,
  '/fashion': 90,
  '/events': 180,
  '/corporate': -90,
}

function getAngle(path: string) {
  for (const key of Object.keys(ANGLE_MAP)) {
    if (path.startsWith(key)) return ANGLE_MAP[key]
  }
  return 0
}

export default function TopNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const focusAngle = useSpring(getAngle(location.pathname), { stiffness: 55, damping: 20, mass: 1.2 })
  const focusRot = useTransform(focusAngle, (v) => `${v}deg`)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const to = getAngle(location.pathname)
    const from = focusAngle.get()
    const delta = ((to - from + 180) % 360) - 180
    focusAngle.set(from + delta)
  }, [location.pathname])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrolled(v > 0.01))
    return unsub
  }, [scrollYProgress])

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isHome = location.pathname === '/'

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          height: scrolled ? 58 : 72,
          transition: 'height 0.35s ease, background 0.35s ease, backdrop-filter 0.35s ease',
          background: scrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 16,
            letterSpacing: '-0.02em',
            color: isHome && !scrolled ? '#ffffff' : '#1a1a1a',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
        >
          ELEVEN<span style={{ color: '#E0261A' }}>25</span>
          <span style={{ fontWeight: 400, fontSize: 10, marginLeft: 8, letterSpacing: '0.12em', verticalAlign: 'middle', opacity: 0.5 }}>STUDIOS</span>
        </Link>

        {/* Center — lens menu trigger */}
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            position: 'relative',
          }}
          aria-label="Open navigation"
        >
          <SmallLens size={scrolled ? 34 : 40} focusRot={focusRot} />
          {/* Progress ring */}
          <motion.div style={{ position: 'absolute', inset: -4, borderRadius: '50%', opacity: 0.6 }}>
            <svg width={scrolled ? 50 : 56} height={scrolled ? 50 : 56} viewBox="0 0 56 56" style={{ position: 'absolute', top: -7, left: -7 }}>
              <motion.circle
                cx="28" cy="28" r="24"
                fill="none"
                stroke="#E0261A"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength="1"
                style={{ pathLength: progress, rotate: -90, transformOrigin: '28px 28px' }}
                strokeDasharray="1"
                strokeDashoffset="0"
              />
            </svg>
          </motion.div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: isHome && !scrolled ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)',
              transition: 'color 0.3s',
            }}
          >
            Menu
          </span>
        </button>

        {/* Right — Contact */}
        <Link
          to="/contact"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: isHome && !scrolled ? 'rgba(255,255,255,0.8)' : '#1a1a1a',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'color 0.3s',
          }}
        >
          Contact
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </Link>
      </motion.nav>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && <LensOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
