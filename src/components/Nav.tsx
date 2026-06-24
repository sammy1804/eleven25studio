import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  motion, AnimatePresence,
  useSpring, useTransform,
  useAnimationControls,
  type MotionValue,
} from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

/* ═══════════════════════════════════════════════════
   MOTION CONFIG — Leica mechanical, no bounce
═══════════════════════════════════════════════════ */
const LENS_SPRING = { stiffness: 55, damping: 20, mass: 1.2 }
const SCALE_SPRING = { stiffness: 200, damping: 28, mass: 0.8 }

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    label: 'Architecture', href: '/architecture',
    stripAngle: -38, fullAngle: 0,
    position: 'top' as const,
    sub: ['Architectural Photography', 'Interior Documentation', 'Exterior Documentation', 'Architectural Films'],
  },
  {
    label: 'Fashion', href: '/fashion',
    stripAngle: -14, fullAngle: 90,
    position: 'right' as const,
    sub: ['Editorial Campaigns', 'Fashion Photography', 'Brand Collaborations'],
  },
  {
    label: 'Eventing', href: '/events',
    stripAngle: 14, fullAngle: 180,
    position: 'bottom' as const,
    sub: ['Corporate Events', 'Workshops', 'Community Experiences'],
  },
  {
    label: 'Product', href: '/corporate',
    stripAngle: 38, fullAngle: -90,
    position: 'left' as const,
    sub: ['Commercial Photography', 'Product Films', 'E-Commerce Content'],
  },
]

const SECONDARY = [
  { label: 'About',              href: '/about' },
  { label: "Client's Hub",       href: '/gallery' },
  { label: 'Firstplan Eventing', href: '/events' },
  { label: 'Contact',            href: '/contact' },
]

function getAngleForPath(path: string): number {
  return CATEGORIES.find(c => path.startsWith(c.href))?.stripAngle ?? 0
}

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const IconIG = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
)
const IconLI = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconYT = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)

/* ═══════════════════════════════════════════════════
   LARGE LENS — Fullscreen nav
═══════════════════════════════════════════════════ */
function FullLens({ size, dark, focusRot }: {
  size: number
  dark: boolean
  focusRot: MotionValue<string>
}) {
  const C = size / 2
  const rTick   = C * 0.995
  const rTickIn = C * 0.866
  const rBarrel = C * 0.830
  const rRing1  = C * 0.790
  const rArc1   = C * 0.748   // ELEVEN25 STUDIOS text
  const rRing2  = C * 0.700
  const rArc2   = C * 0.668   // tagline text
  const rGlass  = C * 0.620
  const rM1     = C * 0.535
  const rM2     = C * 0.450
  const rM3     = C * 0.360
  const rCtr    = C * 0.255

  const ink = (op: number) => dark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op})`
  const barrel = dark ? '#191919' : '#EDECEB'
  const ring1  = dark ? '#141414' : '#E5E4E2'
  const ring2  = dark ? '#0F0F0F' : '#D9D8D5'
  const edge   = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const uid = dark ? 'D' : 'L'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id={`g${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0C0C16"/>
          <stop offset="55%"  stopColor="#060608"/>
          <stop offset="100%" stopColor="#020202"/>
        </radialGradient>
        <radialGradient id={`ir${uid}`} cx="36%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="rgba(0,200,95,0.24)"/>
          <stop offset="28%"  stopColor="rgba(60,40,220,0.20)"/>
          <stop offset="60%"  stopColor="rgba(180,20,80,0.10)"/>
          <stop offset="100%" stopColor="rgba(0,90,210,0.14)"/>
        </radialGradient>
        <filter id={`bl${uid}`}><feGaussianBlur stdDeviation="3.5"/></filter>
        <filter id={`bs${uid}`}><feGaussianBlur stdDeviation="1.2"/></filter>
        <path id={`at${uid}`} d={`M ${C-rArc1},${C} A ${rArc1},${rArc1} 0 0,1 ${C+rArc1},${C}`}/>
        <path id={`ab${uid}`} d={`M ${C-rArc2+2},${C} A ${rArc2-2},${rArc2-2} 0 0,0 ${C+rArc2-2},${C}`}/>
      </defs>

      {/* Outer focus tick ring — ROTATES with spring */}
      <motion.g style={{ originX: `${C}px`, originY: `${C}px`, rotate: focusRot }}>
        {Array.from({ length: 120 }, (_, i) => {
          const a = (i / 120) * 2 * Math.PI
          const major = i % 10 === 0
          const mid   = i % 5 === 0
          const r2 = major ? rTickIn - 8 : mid ? rTickIn - 3 : rTickIn + 4
          return (
            <line key={i}
              x1={C + Math.cos(a) * rTick} y1={C + Math.sin(a) * rTick}
              x2={C + Math.cos(a) * r2}    y2={C + Math.sin(a) * r2}
              stroke={dark
                ? (major ? 'rgba(255,255,255,0.40)' : mid ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)')
                : (major ? 'rgba(0,0,0,0.32)' : mid ? 'rgba(0,0,0,0.14)' : 'rgba(0,0,0,0.06)')}
              strokeWidth={major ? 1.2 : 0.6}
            />
          )
        })}
        {/* Long index tick at top */}
        <line
          x1={C} y1={C - rTick + 2}
          x2={C} y2={C - rTickIn + 12}
          stroke={dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'}
          strokeWidth={1.4}
        />
      </motion.g>

      {/* Main barrel */}
      <circle cx={C} cy={C} r={rBarrel} fill={barrel} stroke={edge} strokeWidth={1}/>

      {/* Knurling */}
      {Array.from({ length: 80 }, (_, i) => {
        const a = (i / 80) * 2 * Math.PI
        return (
          <line key={i}
            x1={C + Math.cos(a) * (rBarrel-5)} y1={C + Math.sin(a) * (rBarrel-5)}
            x2={C + Math.cos(a) * rBarrel}      y2={C + Math.sin(a) * rBarrel}
            stroke={dark
              ? (i%2===0 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.55)')
              : (i%2===0 ? 'rgba(0,0,0,0.030)' : 'rgba(255,255,255,0.55)')}
            strokeWidth={0.9}
          />
        )
      })}

      {/* Ring 1 */}
      <circle cx={C} cy={C} r={rRing1} fill={ring1} stroke={edge} strokeWidth={0.8}/>

      {/* ELEVEN25 STUDIOS arc */}
      <text fontSize={size*0.028} fill={ink(0.48)}
        fontFamily="'Open Runde', sans-serif" fontWeight={500} letterSpacing={size*0.016}>
        <textPath href={`#at${uid}`} startOffset="50%" textAnchor="middle">
          ELEVEN25 STUDIOS
        </textPath>
      </text>

      {/* Ring 2 */}
      <circle cx={C} cy={C} r={rRing2} fill={ring2} stroke={edge} strokeWidth={0.8}/>

      {/* Tagline arc */}
      <text fontSize={size*0.021} fill={ink(0.28)} fontStyle="italic"
        fontFamily="'Open Runde', sans-serif" letterSpacing={size*0.008}>
        <textPath href={`#ab${uid}`} startOffset="50%" textAnchor="middle">
          VISUAL STORIES, THOUGHTFULLY CRAFTED.
        </textPath>
      </text>

      {/* ESTD vertical */}
      <text
        x={C - rRing1 + (rRing1-rRing2)*0.48} y={C}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={size*0.022} fill={ink(0.30)} letterSpacing={size*0.012}
        fontFamily="'Open Runde', sans-serif"
        transform={`rotate(-90,${C - rRing1 + (rRing1-rRing2)*0.48},${C})`}
      >ESTD</text>

      {/* 2020 vertical */}
      <text
        x={C + rRing1 - (rRing1-rRing2)*0.48} y={C}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={size*0.022} fill={ink(0.30)} letterSpacing={size*0.012}
        fontFamily="'Open Runde', sans-serif"
        transform={`rotate(90,${C + rRing1 - (rRing1-rRing2)*0.48},${C})`}
      >2020</text>

      {/* Glass */}
      <circle cx={C} cy={C} r={rGlass} fill={`url(#g${uid})`}/>
      <circle cx={C} cy={C} r={rGlass} fill={`url(#ir${uid})`}/>
      <circle cx={C} cy={C} r={rGlass} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>

      {/* Mid rings */}
      <circle cx={C} cy={C} r={rM1} fill="#0A0A0E" stroke="rgba(255,255,255,0.05)" strokeWidth={0.6}/>
      {Array.from({ length: 48 }, (_, i) => {
        const a = (i/48)*2*Math.PI
        const major = i%12===0
        return (
          <line key={i}
            x1={C+Math.cos(a)*rM1}           y1={C+Math.sin(a)*rM1}
            x2={C+Math.cos(a)*(rM1-(major?7:3))} y2={C+Math.sin(a)*(rM1-(major?7:3))}
            stroke={major?'rgba(255,255,255,0.28)':'rgba(255,255,255,0.09)'}
            strokeWidth={major?0.9:0.4}
          />
        )
      })}
      <circle cx={C} cy={C} r={rM2} fill="#080808" stroke="rgba(255,255,255,0.06)" strokeWidth={0.6}/>
      <circle cx={C} cy={C} r={rM3} fill="#050505" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5}/>
      <circle cx={C} cy={C} r={rM3} fill="none" stroke="rgba(50,80,200,0.20)" strokeWidth={rM3*0.09}/>

      {/* Center element */}
      <circle cx={C} cy={C} r={rCtr} fill="#020204"/>
      <circle cx={C} cy={C} r={rCtr} fill="none" stroke="rgba(40,70,190,0.18)" strokeWidth={rCtr*0.08}/>

      {/* Specular catch lights — idle animated in parent */}
      <ellipse cx={C - size*0.052} cy={C - size*0.068}
        rx={size*0.095} ry={size*0.058}
        fill="rgba(255,255,255,0.42)" filter={`url(#bl${uid})`}/>
      <circle cx={C - size*0.028} cy={C - size*0.038}
        r={size*0.026} fill="rgba(255,255,255,0.68)" filter={`url(#bs${uid})`}/>
      <circle cx={C - size*0.010} cy={C - size*0.024}
        r={size*0.010} fill="rgba(255,255,255,0.92)"/>
      <circle cx={C + size*0.062} cy={C + size*0.064}
        r={size*0.018} fill="rgba(255,255,255,0.18)" filter={`url(#bs${uid})`}/>
      {/* Green shimmer */}
      <ellipse cx={C+size*0.04} cy={C-size*0.04}
        rx={size*0.072} ry={size*0.042}
        fill="rgba(0,210,120,0.10)" filter={`url(#bl${uid})`}/>
      {/* Purple shimmer */}
      <ellipse cx={C-size*0.06} cy={C+size*0.055}
        rx={size*0.062} ry={size*0.038}
        fill="rgba(100,50,230,0.09)" filter={`url(#bl${uid})`}/>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════
   SMALL LENS — Bottom bar (white barrel)
═══════════════════════════════════════════════════ */
function SmallLens({ size, focusRot }: { size: number; focusRot: MotionValue<string> }) {
  const C      = size / 2
  const rOuter = C - 1
  const rRing  = C - 8
  const rGlass = C - 21
  const rInner = C - 32
  const rCtr   = C - 42

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="smg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0C0C16"/>
          <stop offset="100%" stopColor="#020202"/>
        </radialGradient>
        <radialGradient id="smir" cx="36%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="rgba(0,200,95,0.22)"/>
          <stop offset="28%"  stopColor="rgba(60,40,220,0.18)"/>
          <stop offset="100%" stopColor="rgba(0,90,210,0.12)"/>
        </radialGradient>
        <filter id="smbl"><feGaussianBlur stdDeviation="1.4"/></filter>
        <path id="smat" d={`M ${C-rRing+2},${C} A ${rRing-2},${rRing-2} 0 0,1 ${C+rRing-2},${C}`}/>
        <path id="smab" d={`M ${C-rRing+2},${C} A ${rRing-2},${rRing-2} 0 0,0 ${C+rRing-2},${C}`}/>
      </defs>

      {/* White barrel */}
      <circle cx={C} cy={C} r={rOuter} fill="#FFFFFF" stroke="rgba(0,0,0,0.09)" strokeWidth={1}/>
      {Array.from({ length: 72 }, (_, i) => {
        const a = (i/72)*2*Math.PI
        return (
          <line key={i}
            x1={C+Math.cos(a)*(rOuter-5)} y1={C+Math.sin(a)*(rOuter-5)}
            x2={C+Math.cos(a)*(rOuter-1)} y2={C+Math.sin(a)*(rOuter-1)}
            stroke={i%2===0?'rgba(0,0,0,0.06)':'rgba(0,0,0,0.025)'} strokeWidth={0.7}
          />
        )
      })}
      {/* Red index tick */}
      <line x1={C} y1={C-rOuter+1} x2={C} y2={C-rOuter+8}
        stroke="#CC2222" strokeWidth={1.4} strokeLinecap="round"/>

      {/* Brand text */}
      <text fontSize={size*0.080} fill="rgba(0,0,0,0.40)"
        fontFamily="'Open Runde', sans-serif" fontWeight={500} letterSpacing={size*0.028}>
        <textPath href="#smat" startOffset="50%" textAnchor="middle">ELEVEN25</textPath>
      </text>
      <text fontSize={size*0.070} fill="rgba(0,0,0,0.28)"
        fontFamily="'Open Runde', sans-serif" letterSpacing={size*0.036}>
        <textPath href="#smab" startOffset="50%" textAnchor="middle">STUDIOS</textPath>
      </text>

      <circle cx={C} cy={C} r={rRing} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={1.2}/>

      {/* Glass */}
      <circle cx={C} cy={C} r={rGlass} fill="url(#smg)"/>
      <circle cx={C} cy={C} r={rGlass} fill="url(#smir)"/>

      {/* Rotating focus ring */}
      <motion.g style={{ originX: `${C}px`, originY: `${C}px`, rotate: focusRot }}>
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i/36)*2*Math.PI
          const major = i%9===0
          return (
            <line key={i}
              x1={C+Math.cos(a)*rGlass}               y1={C+Math.sin(a)*rGlass}
              x2={C+Math.cos(a)*(rGlass-(major?5:2))} y2={C+Math.sin(a)*(rGlass-(major?5:2))}
              stroke={major?'rgba(255,255,255,0.42)':'rgba(255,255,255,0.13)'}
              strokeWidth={major?0.9:0.5}
            />
          )
        })}
      </motion.g>

      <circle cx={C} cy={C} r={rGlass} fill="none"
        stroke="rgba(50,80,200,0.16)" strokeWidth={rGlass*0.18}/>
      <circle cx={C} cy={C} r={rInner} fill="#070707" stroke="rgba(255,255,255,0.04)" strokeWidth={0.5}/>

      {rCtr > 0 && (
        <>
          <circle cx={C} cy={C} r={rCtr} fill="#030303"/>
          <ellipse cx={C-size*0.052} cy={C-size*0.070}
            rx={size*0.068} ry={size*0.042}
            fill="rgba(255,255,255,0.40)" filter="url(#smbl)"/>
          <circle cx={C+size*0.040} cy={C+size*0.048}
            r={size*0.018} fill="rgba(255,255,255,0.14)"/>
        </>
      )}
      <circle cx={C} cy={C} r={rOuter} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={2}/>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════
   FULLSCREEN NAV
═══════════════════════════════════════════════════ */
function FullscreenNav({
  onClose, onNavigate, focusAngle, focusRot,
}: {
  onClose: () => void
  onNavigate: (href: string) => void
  focusAngle: MotionValue<number>
  focusRot: MotionValue<string>
}) {
  const location = useLocation()
  const [hovered, setHovered] = useState<string | null>(null)
  const [dark, setDark] = useState(false)

  const bg  = dark ? '#0B0B0B' : '#EFEEEC'
  const fg  = dark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.88)'
  const sub = dark ? 'rgba(255,255,255,0.32)' : 'rgba(0,0,0,0.30)'
  const ln  = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.09)'
  const dot = dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.50)'

  const lensSize = Math.min(490, Math.min(window.innerWidth, window.innerHeight) * 0.50)
  const gapV = lensSize * 0.60
  const gapH = lensSize * 0.62

  function handleHover(cat: typeof CATEGORIES[0] | null) {
    if (cat) {
      setHovered(cat.href)
      focusAngle.set(cat.fullAngle)
    } else {
      setHovered(null)
      const active = CATEGORIES.find(c => location.pathname.startsWith(c.href))
      focusAngle.set(active?.fullAngle ?? 0)
    }
  }

  const catPos = (pos: string): React.CSSProperties => {
    const align = pos === 'left' ? 'flex-end' : pos === 'right' ? 'flex-start' : 'center'
    const base: React.CSSProperties = { position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: align, gap: 0 }
    if (pos === 'top')    return { ...base, bottom: `calc(50% + ${gapV}px)`,       left: '50%', transform: 'translateX(-50%)' }
    if (pos === 'bottom') return { ...base, top:    `calc(50% + ${gapV * 0.70}px)`, left: '50%', transform: 'translateX(-50%)' }
    if (pos === 'left')   return { ...base, right:  `calc(50% + ${gapH}px)`,        top:  '50%', transform: 'translateY(-50%)' }
    return                        { ...base, left:   `calc(50% + ${gapH}px)`,        top:  '50%', transform: 'translateY(-50%)' }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: bg, overflow: 'hidden' }}
    >
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 34px' }}>
        {/* Logo wordmark */}
        <Link to="/" onClick={onClose} style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Open Runde', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.025em', color: fg, lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 1 }}>
            ELEVEN<span style={{ color: dark ? '#4BA3D8' : '#1B9FE0' }}>25</span>
          </div>
          <div style={{ fontFamily: "'Open Runde', sans-serif", fontSize: 8, letterSpacing: '0.38em', color: sub, marginTop: 3 }}>STUDIOS</div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={() => setDark(d => !d)}
            style={{
              background: 'none', border: `1px solid ${ln}`, borderRadius: 999, cursor: 'pointer',
              padding: '5px 13px', fontFamily: "'Open Runde', sans-serif",
              fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: sub,
              transition: 'border-color 0.25s, color 0.25s',
            }}>
            {dark ? '◐ Light' : '◑ Dark'}
          </button>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Open Runde', sans-serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: sub }}>
            CLOSE
            <svg width={13} height={13} viewBox="0 0 13 13" fill="none"
              stroke={dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.42)'} strokeWidth={1.3}>
              <line x1="1" y1="1" x2="12" y2="12"/><line x1="12" y1="1" x2="1" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Left social */}
      <div style={{ position: 'absolute', left: 34, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {[
          { href: 'https://www.instagram.com/eleven25studios', Icon: IconIG },
          { href: '#', Icon: IconLI },
          { href: '#', Icon: IconYT },
        ].map(({ href, Icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
            style={{ color: sub, display: 'flex', padding: '9px 0', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = fg }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = sub }}
          ><Icon /></a>
        ))}
        <div style={{ width: 1, height: 52, background: ln, marginTop: 10 }}/>
      </div>

      {/* Bottom right secondary */}
      <div style={{ position: 'absolute', bottom: 34, right: 34, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 10 }}>
        {SECONDARY.map((s, i) => (
          <div key={s.href}>
            <Link
              to={s.href}
              onClick={onClose}
              style={{ display: 'block', padding: '9px 0', fontFamily: "'Open Runde', sans-serif", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: location.pathname.startsWith(s.href) ? fg : sub, textDecoration: 'none', transition: 'color 0.22s', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = fg }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = location.pathname.startsWith(s.href) ? fg : sub }}
            >{s.label}</Link>
            {i < SECONDARY.length - 1 && <div style={{ width: 22, height: 1, background: ln, marginLeft: 'auto' }}/>}
          </div>
        ))}
      </div>

      {/* Bottom left email */}
      <div style={{ position: 'absolute', bottom: 34, left: 34 }}>
        <a href="mailto:hello@eleven25studios.com"
          style={{ fontFamily: "'Open Runde', sans-serif", fontSize: 11, letterSpacing: '0.06em', color: sub, textDecoration: 'none', transition: 'color 0.22s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = fg }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = sub }}
        >hello@eleven25studios.com</a>
      </div>

      {/* Center: compass layout */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Category labels */}
        {CATEGORIES.map(cat => {
          const isHov = hovered === cat.href
          const isDim = hovered !== null && !isHov
          const isLeft  = cat.position === 'left'
          const isRight = cat.position === 'right'
          const isTop   = cat.position === 'top'
          const isBot   = cat.position === 'bottom'

          return (
            <motion.div key={cat.href}
              style={{ ...catPos(cat.position), zIndex: 10 }}
              animate={{ opacity: isDim ? 0.14 : 1 }}
              transition={{ duration: 0.3, ease: [0.25, 0, 0.35, 1] }}
            >
              {/* Dot + line for left/right */}
              {(isLeft || isRight) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: isLeft ? 'row-reverse' : 'row', marginBottom: 10 }}>
                  <motion.div
                    animate={{ width: isHov ? 40 : 28 }}
                    transition={{ duration: 0.35, ease: [0.25, 0, 0.35, 1] }}
                    style={{ height: 1, background: ln }}
                  />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }}/>
                </div>
              )}

              {/* Sub-items ABOVE label — only for top position */}
              {isTop && (
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0, 0.35, 1] }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 10 }}
                    >
                      {cat.sub.map(s => (
                        <div key={s} style={{ fontFamily: "'Open Runde', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: sub }}>{s}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Dot above bottom category */}
              {isBot && (
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: dot, margin: '0 auto 10px' }}/>
              )}

              {/* Category label */}
              <Link
                to={cat.href}
                onMouseEnter={() => handleHover(cat)}
                onMouseLeave={() => handleHover(null)}
                onClick={onClose}
                style={{
                  display: 'block', textDecoration: 'none', cursor: 'pointer', padding: 0,
                  fontFamily: "'Open Runde', sans-serif",
                  fontSize: 'clamp(16px, 1.75vw, 24px)',
                  fontWeight: isHov ? 500 : 300,
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: fg,
                  transition: 'font-weight 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >{cat.label}</Link>

              {/* Dot below top category */}
              {isTop && (
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: dot, margin: '10px auto 0' }}/>
              )}

              {/* Sub-items BELOW label — for all positions except top */}
              {!isTop && (
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, y: isBot ? 4 : 0, x: isLeft ? -4 : isRight ? 4 : 0 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0, 0.35, 1] }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: isLeft ? 'flex-end' : isRight ? 'flex-start' : 'center', gap: 4, marginTop: 10 }}
                    >
                      {cat.sub.map(s => (
                        <div key={s} style={{ fontFamily: "'Open Runde', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: sub }}>{s}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          )
        })}

        {/* Large lens */}
        <motion.div
          initial={{ scale: 0.90, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexShrink: 0, position: 'relative', zIndex: 5 }}
        >
          <FullLens size={lensSize} dark={dark} focusRot={focusRot} />
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN NAV
═══════════════════════════════════════════════════ */
export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  /* ── State ── */
  const [showNav, setShowNav]         = useState(false)
  const [scrollY, setScrollY]         = useState(0)
  const [stripHover, setStripHover]   = useState<string | null>(null)
  const [lensHover, setLensHover]     = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  /* ── Aperture overlay controls ── */
  const overlayCtrl = useAnimationControls()

  /* ── Focus ring spring ── */
  const focusAngle = useSpring(getAngleForPath(location.pathname), LENS_SPRING)
  const focusRot   = useTransform(focusAngle, v => `${v}deg`)

  /* ── Lens hover scale spring ── */
  const lensScale = useSpring(1, SCALE_SPRING)
  useEffect(() => { lensScale.set(lensHover ? 1.055 : 1) }, [lensHover]) // eslint-disable-line

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Close nav + reset angle on route change ── */
  useEffect(() => {
    setShowNav(false)
    setStripHover(null)
    window.scrollTo(0, 0)
    focusAngle.set(getAngleForPath(location.pathname))
  }, [location.pathname]) // eslint-disable-line

  /* ── Lock scroll when nav open ── */
  useEffect(() => {
    document.body.style.overflow = showNav ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showNav])

  /* ── Strip hover: rotate focus ring ── */
  function handleStripEnter(cat: typeof CATEGORIES[0]) {
    setStripHover(cat.href)
    focusAngle.set(cat.stripAngle)
  }
  function handleStripLeave() {
    setStripHover(null)
    focusAngle.set(getAngleForPath(location.pathname))
  }

  /* ── Aperture open sequence ── */
  const openNav = useCallback(async () => {
    if (transitioning || showNav) return
    setTransitioning(true)
    overlayCtrl.set({ clipPath: 'circle(0% at 50% 92%)', opacity: 1 })
    // Race animation against timeout so a stalled animation never blocks the nav
    await Promise.race([
      overlayCtrl.start({ clipPath: 'circle(160% at 50% 92%)', transition: { duration: 0.44, ease: [0.55, 0, 0.90, 0.45] } }),
      new Promise(r => setTimeout(r, 800)),
    ])
    setShowNav(true)
    setTransitioning(false)
    // Cosmetic retract — fire-and-forget
    overlayCtrl.start({ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.40, ease: [0.10, 0.55, 0.45, 1] } })
      .then(() => overlayCtrl.set({ opacity: 0 }))
      .catch(() => overlayCtrl.set({ opacity: 0 }))
  }, [transitioning, showNav, overlayCtrl])

  /* ── Navigate from inside fullscreen nav — synchronous, no animation gate ── */
  const navigateTo = useCallback((href: string) => {
    if (location.pathname === href) { setShowNav(false); return }
    // Close nav + navigate immediately — no transitioning guard needed
    // (these buttons are only reachable when the nav is already open)
    setShowNav(false)
    navigate(href)
    // Cosmetic overlay flash — fire-and-forget, never blocks
    overlayCtrl.set({ clipPath: 'circle(0% at 50% 50%)', opacity: 1 })
    overlayCtrl.start({ clipPath: 'circle(160% at 50% 50%)', transition: { duration: 0.36, ease: [0.55, 0, 0.90, 0.45] } })
      .then(() => overlayCtrl.start({ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.40, ease: [0.10, 0.55, 0.45, 1] } }))
      .then(() => overlayCtrl.set({ opacity: 0 }))
      .catch(() => overlayCtrl.set({ opacity: 0 }))
  }, [location.pathname, overlayCtrl, navigate])

  /* ── Close nav without navigating — synchronous, no animation gate ── */
  const closeNav = useCallback(() => {
    setShowNav(false)
    // Cosmetic retract — fire-and-forget
    overlayCtrl.start({ clipPath: 'circle(0% at 50% 92%)', transition: { duration: 0.36, ease: [0.10, 0.55, 0.45, 1] } })
      .then(() => overlayCtrl.set({ opacity: 0 }))
      .catch(() => overlayCtrl.set({ opacity: 0 }))
  }, [overlayCtrl])

  /* ── Compact mode (scroll) ── */
  const compact = scrollY > 60
  const cardH   = compact ? 58 : 72
  const lensH   = compact ? 76 : 90
  const scrollPct = (() => {
    const el = document.documentElement
    return Math.round((el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) * 100)
  })()

  /* ── Styles ── */
  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  const stripLinkStyle = (href: string): React.CSSProperties => ({
    fontFamily: "'Open Runde', sans-serif",
    fontSize: compact ? 10 : 11,
    fontWeight: isActive(href) || stripHover === href ? 600 : 400,
    letterSpacing: '0.20em',
    textTransform: 'uppercase',
    color: stripHover !== null && stripHover !== href
      ? 'rgba(0,0,0,0.20)'
      : isActive(href) || stripHover === href
        ? 'rgba(0,0,0,0.88)'
        : 'rgba(0,0,0,0.38)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.22s, font-weight 0.22s',
    cursor: 'pointer',
  })

  /* ═══════════════
     MOBILE
  ═══════════════ */
  if (isMobile) {
    return (
      <>
        {/* Aperture overlay */}
        <motion.div animate={overlayCtrl}
          style={{ position: 'fixed', inset: 0, zIndex: 490, background: '#080808',
            clipPath: 'circle(0% at 50% 92%)', opacity: 0, pointerEvents: 'none' }}/>

        {/* Fullscreen nav */}
        <AnimatePresence>
          {showNav && (
            <FullscreenNav
              onClose={closeNav}
              onNavigate={navigateTo}
              focusAngle={focusAngle}
              focusRot={focusRot}
            />
          )}
        </AnimatePresence>

        {/* Top header */}
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', pointerEvents: 'none' }}>
          <Link to="/" style={{ pointerEvents: 'auto', lineHeight: 0 }}
            onClick={e => { e.preventDefault(); navigateTo('/') }}>
            <img src="/logo.png" alt="Eleven25" style={{ height: 22, opacity: 0.85 }}/>
          </Link>
          <button onClick={() => showNav ? closeNav() : openNav()}
            style={{ pointerEvents: 'auto', background: '#0A0A0A', border: 'none', cursor: 'pointer', height: 32, padding: '0 14px', borderRadius: 999, fontFamily: "'Open Runde', sans-serif", fontSize: 11, letterSpacing: '0.06em', color: '#FAFAFA' }}>
            {showNav ? '✕' : '≡ Menu'}
          </button>
        </header>

        {/* Mobile bottom lens */}
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, cursor: 'pointer' }}
          onClick={() => showNav ? closeNav() : openNav()}>
          <motion.div style={{ scale: lensScale }}
            onHoverStart={() => setLensHover(true)}
            onHoverEnd={() => setLensHover(false)}>
            <motion.div
              animate={{ scale: [1, 1.003, 1] }}
              transition={{ duration: 3.5, ease: [0.45, 0, 0.55, 1], repeat: Infinity }}>
              <SmallLens size={lensH} focusRot={focusRot}/>
            </motion.div>
          </motion.div>
        </div>
      </>
    )
  }

  /* ═══════════════
     DESKTOP
  ═══════════════ */
  return (
    <>
      {/* Aperture overlay — always in DOM */}
      <motion.div
        animate={overlayCtrl}
        style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: '#080808',
          clipPath: 'circle(0% at 50% 92%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Fullscreen nav */}
      <AnimatePresence>
        {showNav && (
          <FullscreenNav
            key="fnav"
            onClose={closeNav}
            onNavigate={navigateTo}
            focusAngle={focusAngle}
            focusRot={focusRot}
          />
        )}
      </AnimatePresence>

      {/* ── TOP HEADER ────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 28px', pointerEvents: 'none',
      }}>
        <Link to="/" onClick={e => { e.preventDefault(); navigateTo('/') }}
          style={{ pointerEvents: 'auto', lineHeight: 0 }}>
          <img src="/logo.png" alt="Eleven25 Studios" style={{ height: 26, opacity: 0.85 }}/>
        </Link>

        <button onClick={() => showNav ? closeNav() : openNav()}
          style={{
            pointerEvents: 'auto', background: '#0A0A0A', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
            height: 36, padding: '0 16px', borderRadius: 999,
            fontFamily: "'Open Runde', sans-serif", fontSize: 12, letterSpacing: '0.06em', color: '#FAFAFA',
            boxShadow: '0 2px 12px rgba(0,0,0,0.14)',
          }}>
          {showNav ? '✕ Close' : '≡ Menu'}
          <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }}/>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)' }}>{scrollPct}%</span>
        </button>

        <a href="mailto:eleven25studios@gmail.com"
          style={{
            pointerEvents: 'auto', display: 'flex', alignItems: 'center',
            height: 36, padding: '0 20px', borderRadius: 999,
            background: '#0A0A0A', color: '#FAFAFA', textDecoration: 'none',
            fontFamily: "'Open Runde', sans-serif", fontSize: 12, letterSpacing: '0.06em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2a2a2a' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0A0A0A' }}
        >Contact</a>
      </header>

      {/* BOTTOM FLOATING CARD — temporarily hidden */}
    </>
  )
}
