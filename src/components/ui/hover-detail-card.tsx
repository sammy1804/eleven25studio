import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface HoverDetailCardProps {
  title?: string
  subtitle?: string
  images?: string[]
  primaryButton?: { text: string; href: string }
  secondaryButton?: { text: string; href: string }
  pills?: {
    left: { text: string }
    sparkle?: boolean
    right: { text: string }
  }
  enableAnimations?: boolean
}

const DEFAULT_IMAGES = [
  'https://picsum.photos/seed/ben_g1/200/200',
  'https://picsum.photos/seed/ben_g2/200/200',
  'https://picsum.photos/seed/ben_g3/200/200',
  'https://picsum.photos/seed/ben_g4/200/200',
  'https://picsum.photos/seed/ben_g5/200/200',
  'https://picsum.photos/seed/ben_g6/200/200',
  'https://picsum.photos/seed/ben_g7/200/200',
  'https://picsum.photos/seed/ben_g8/200/200',
  'https://picsum.photos/seed/ben_g9/200/200',
  'https://picsum.photos/seed/ben_g10/200/200',
]

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HoverDetailCard({
  title = 'Our Portfolio',
  subtitle = 'Architecture · Fashion · Eventing · Product',
  images = DEFAULT_IMAGES,
  primaryButton = { text: 'View All Work', href: '/gallery' },
  secondaryButton = { text: 'Enter Gallery →', href: '/gallery' },
  pills = { left: { text: '200+ Shots' }, sparkle: true, right: { text: 'Active' } },
  enableAnimations = true,
}: HoverDetailCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  return (
    <motion.div
      variants={shouldAnimate ? cardVariant : undefined}
      initial={shouldAnimate ? 'hidden' : undefined}
      whileInView={shouldAnimate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-60px' }}
      style={{
        background: '#121212',
        border: '1px solid #1c1c1c',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Image grid */}
      <div
        style={{ position: 'relative', flex: 1, padding: 14, paddingBottom: 8, overflow: 'hidden' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
          {images.slice(0, 10).map((src, i) => (
            <motion.div
              key={i}
              animate={{ scale: isHovered ? 0.88 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ aspectRatio: '1/1', borderRadius: 7, overflow: 'hidden' }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                inset: 0,
                margin: 14,
                marginBottom: 8,
                background: 'rgba(10,10,10,0.82)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              {[
                { ...primaryButton, bg: 'rgba(255,255,255,0.92)', color: '#111111' },
                { ...secondaryButton, bg: '#0096E6', color: '#ffffff' },
              ].map((btn, i) => (
                <motion.div
                  key={btn.text}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25, delay: i * 0.08 }}
                >
                  <Link
                    to={btn.href}
                    style={{
                      display: 'inline-block',
                      background: btn.bg,
                      color: btn.color,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      letterSpacing: '0.04em',
                      padding: '9px 22px',
                      borderRadius: 999,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {btn.text}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom meta */}
      <div style={{ padding: '10px 14px 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.70)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 999,
            }}
          >
            {pills.left.text}
          </span>
          {pills.sparkle && (
            <span
              style={{
                background: 'rgba(0,150,230,0.15)',
                color: '#0096E6',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 8px',
                borderRadius: 999,
              }}
            >
              <Sparkles size={11} />
            </span>
          )}
          <span
            style={{
              background: 'rgba(0,150,230,0.15)',
              color: '#0096E6',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 999,
            }}
          >
            {pills.right.text}
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 20,
            color: '#ffffff',
            margin: '0 0 4px',
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: 'rgba(255,255,255,0.50)',
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}
