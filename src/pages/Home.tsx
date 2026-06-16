import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

/* ── Images ── */
const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=90&auto=format&fit=crop', label: 'Architecture' },
  { src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1400&q=90&auto=format&fit=crop', label: 'Architecture Film' },
  { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=90&auto=format&fit=crop', label: 'Corporate' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=90&auto=format&fit=crop', label: 'Events' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=90&auto=format&fit=crop', label: 'Wedding' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90&auto=format&fit=crop', label: 'Architecture' },
  { src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1400&q=90&auto=format&fit=crop', label: 'Interiors' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=90&auto=format&fit=crop', label: 'Fashion' },
]

const VISIBLE = 5

const SLOT_INPUT    = [-0.6, 0,  1,  2,  3,  4,  4.6]
const LEFT_OUTPUT   = [-10,  0,  8,  22, 42, 68, 102]
const WIDTH_OUTPUT  = [  8,  8, 14,  20, 26, 32,  32]
const HEIGHT_OUTPUT = [ 22, 22, 32,  42, 50, 55,  55]

function ImageSlot({
  phase,
  imgIndex,
  src,
  label,
}: {
  phase: MotionValue<number>
  imgIndex: number
  src: string
  label: string
}) {
  const [hovered, setHovered] = useState(false)

  const slotPos  = useTransform(phase, (p) => imgIndex - p)
  const leftNum  = useTransform(slotPos, SLOT_INPUT, LEFT_OUTPUT)
  const widthNum = useTransform(slotPos, SLOT_INPUT, WIDTH_OUTPUT)
  const hgtNum   = useTransform(slotPos, SLOT_INPUT, HEIGHT_OUTPUT)
  const left    = useTransform(leftNum,  (v) => `${v}vw`)
  const width   = useTransform(widthNum, (v) => `${v}vw`)
  const height  = useTransform(hgtNum,   (v) => `${v}vh`)
  const opacity = useTransform(slotPos, [-0.5, 0, 4, 4.5], [0, 1, 1, 0])

  return (
    <motion.div
      style={{ position: 'absolute', bottom: 0, left, width, height, opacity, zIndex: imgIndex + 1, overflow: 'visible' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              pointerEvents: 'none',
              zIndex: 30,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8956A', flexShrink: 0, display: 'block' }} />
            <span style={{ fontFamily: "'Open Runde', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0A0A0A', whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', cursor: 'pointer' }}>
        <motion.img
          src={src}
          alt={label}
          draggable={false}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </motion.div>
  )
}

/* ── Mobile layout — simple hero + image grid ── */
function MobileHome() {
  return (
    <div style={{ background: '#F5F1EA', minHeight: '100vh' }}>
      {/* Hero text */}
      <div style={{ paddingTop: 100, paddingLeft: 24, paddingRight: 24, paddingBottom: 32 }}>
        <h1
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
            fontSize: 'clamp(52px, 16vw, 80px)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            color: '#0A0A0A',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          Visual<br />Stories.
        </h1>
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{
            fontFamily: "'Open Runde', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#0A0A0A',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Eleven25 — Photography &amp; Film Studio in Chennai,<br />
            Crafting Visual Narratives for Architecture &amp; Brands.
          </p>
          <p style={{
            fontFamily: "'Open Runde', sans-serif",
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#8A847C',
            marginTop: '0.4em',
          }}>
            Architecture. Corporate. Films. Events.
          </p>
        </div>
      </div>

      {/* 2-column image grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, padding: '0 4px 60px' }}>
        {IMAGES.map((img, i) => (
          <div
            key={img.src}
            style={{ overflow: 'hidden', aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
          >
            <img
              src={img.src}
              alt={img.label}
              loading={i < 4 ? 'eager' : 'lazy'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.001,
  })

  const phase = useTransform(
    smoothProgress,
    [0, 1],
    [0, IMAGES.length - VISIBLE],
  )

  if (isMobile) return <MobileHome />

  return (
    <div ref={containerRef} style={{ height: '800vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#F5F1EA' }}>
        {/* Fixed text */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            paddingTop: 104,
            paddingLeft: '2.5vw',
            paddingRight: '4vw',
            pointerEvents: 'none',
          }}
        >
          <h1
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
              fontSize: 'clamp(60px, 11.5vw, 175px)',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: '#0A0A0A',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Visual<br />Stories.
          </h1>

          <div style={{ marginTop: '2.2vh' }}>
            <p style={{
              fontFamily: "'Open Runde', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(10px, 1vw, 12px)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#0A0A0A',
              lineHeight: 1.7,
              margin: 0,
            }}>
              Eleven25 — Photography &amp; Film Studio in Chennai,<br />
              Crafting Visual Narratives for Architecture &amp; Brands.
            </p>
            <p style={{
              fontFamily: "'Open Runde', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(9px, 0.85vw, 11px)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#8A847C',
              marginTop: '0.4em',
            }}>
              Architecture. Corporate. Films. Events.
            </p>
          </div>
        </div>

        {IMAGES.map((img, i) => (
          <ImageSlot key={img.src} phase={phase} imgIndex={i} src={img.src} label={img.label} />
        ))}

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 22,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            zIndex: 25,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Open Runde', sans-serif",
            fontWeight: 600,
            fontSize: 9,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.3)',
          }}>
            Scroll
          </span>
        </div>
      </div>
    </div>
  )
}
