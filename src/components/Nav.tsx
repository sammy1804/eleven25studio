import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work',     href: '/architecture' },
  { label: 'Films',    href: '/films' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

const OTHER_LINKS = [
  { label: 'Gallery',   href: '/gallery' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Events',    href: '/events' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [scrollPct, setScrollPct]   = useState(0)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement
      const pct = Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100) || 0
      setScrollPct(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 pt-5">

        {/* Logo */}
        <Link
          to="/"
          className="font-sans text-[13px] font-medium tracking-tight leading-none select-none"
          style={{ color: '#0A0A0A', letterSpacing: '-0.01em' }}
        >
          eleven25
          <span className="font-light ml-0.5" style={{ color: '#888' }}>studios</span>
        </Link>

        {/* Center pill ── toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="flex items-center gap-2.5 h-9 px-4 rounded-full font-sans text-[13px] font-medium transition-all duration-300 select-none"
          style={{
            background: '#0A0A0A',
            color: '#FAFAFA',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          }}
        >
          {menuOpen ? (
            <>
              <span className="text-[16px] leading-none" style={{ marginTop: -1 }}>✕</span>
              <span>Close</span>
            </>
          ) : (
            <>
              <span className="text-[16px] leading-none" style={{ marginTop: -1 }}>≡</span>
              <span>Menu</span>
            </>
          )}
          <span
            className="h-4 w-px mx-0.5"
            style={{ background: 'rgba(250,250,250,0.2)' }}
          />
          <span className="text-[12px] tabular-nums" style={{ color: 'rgba(250,250,250,0.5)' }}>
            {scrollPct}%
          </span>
        </button>

        {/* Right CTA */}
        <a
          href="mailto:eleven25studios@gmail.com"
          className="flex items-center h-9 px-5 rounded-full font-sans text-[13px] font-medium transition-all duration-200 select-none"
          style={{
            background: '#0A0A0A',
            color: '#FAFAFA',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2a2a2a' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0A0A0A' }}
        >
          Contact
        </a>
      </header>

      {/* ── Menu panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel card */}
            <motion.div
              key="panel"
              className="fixed z-50 rounded-3xl overflow-hidden"
              style={{
                top: 72,
                left: '50%',
                x: '-50%',
                width: 'min(480px, calc(100vw - 32px))',
                background: '#F2F2F0',
                boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
              }}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-8 pt-8 pb-6">

                {/* Section label */}
                <p className="font-sans text-[11px] tracking-wider uppercase mb-5" style={{ color: '#999' }}>
                  Menu
                </p>

                {/* Primary links */}
                <nav className="flex flex-col">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to={link.href}
                        className="block font-sans text-[36px] font-medium leading-tight py-1.5 transition-colors duration-150"
                        style={{
                          color: location.pathname === link.href ? '#B8956A' : '#0A0A0A',
                          letterSpacing: '-0.02em',
                        }}
                        onMouseEnter={e => {
                          if (location.pathname !== link.href)
                            (e.currentTarget as HTMLElement).style.color = '#555'
                        }}
                        onMouseLeave={e => {
                          if (location.pathname !== link.href)
                            (e.currentTarget as HTMLElement).style.color = '#0A0A0A'
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-5 h-px" style={{ background: '#E0DEDA' }} />

                {/* Other links */}
                <p className="font-sans text-[11px] tracking-wider uppercase mb-3" style={{ color: '#999' }}>
                  Other
                </p>
                <div className="flex flex-col gap-1.5">
                  {OTHER_LINKS.map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="font-sans text-[15px] font-medium transition-colors duration-150"
                      style={{ color: '#0A0A0A' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0A0A0A' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-5 h-px" style={{ background: '#E0DEDA' }} />

                {/* Social */}
                <p className="font-sans text-[11px] tracking-wider uppercase mb-3" style={{ color: '#999' }}>
                  Social media
                </p>
                <a
                  href="https://www.instagram.com/eleven25studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[15px] font-medium transition-colors duration-150"
                  style={{ color: '#0A0A0A' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0A0A0A' }}
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
