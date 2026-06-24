import { useRef } from 'react'
import { motion, type MotionValue } from 'framer-motion'

/* ─── Small lens (TopNav trigger button) ─────────────────── */
export function SmallLens({ size = 42, focusRot }: { size?: number; focusRot?: MotionValue<string> }) {
  const r = size / 2
  const uid = useRef(`sl-${Math.random().toString(36).slice(2, 6)}`).current

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id={`${uid}-glass`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#2a2a3a" />
          <stop offset="55%" stopColor="#0c0c16" />
          <stop offset="100%" stopColor="#020208" />
        </radialGradient>
        <radialGradient id={`${uid}-coat`} cx="30%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#4466cc" stopOpacity="0.25" />
          <stop offset="40%" stopColor="#8844bb" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#224499" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer ring */}
      <circle cx={r} cy={r} r={r - 0.5} fill="#1a1a1a" />
      <circle cx={r} cy={r} r={r - 0.5} fill="none" stroke="#333" strokeWidth="0.8" />

      {/* Tick ring — rotates with focusRot */}
      {focusRot ? (
        <motion.g style={{ rotate: focusRot, transformOrigin: `${r}px ${r}px` }}>
          {Array.from({ length: 40 }, (_, i) => {
            const angle = (i / 40) * Math.PI * 2
            const outer = r - 2.5
            const inner = outer - (i % 5 === 0 ? 4 : 2)
            return (
              <line
                key={i}
                x1={r + Math.cos(angle) * inner}
                y1={r + Math.sin(angle) * inner}
                x2={r + Math.cos(angle) * outer}
                y2={r + Math.sin(angle) * outer}
                stroke={i % 5 === 0 ? '#666' : '#444'}
                strokeWidth={i % 5 === 0 ? 1 : 0.6}
              />
            )
          })}
        </motion.g>
      ) : (
        <g>
          {Array.from({ length: 40 }, (_, i) => {
            const angle = (i / 40) * Math.PI * 2
            const outer = r - 2.5
            const inner = outer - (i % 5 === 0 ? 4 : 2)
            return (
              <line
                key={i}
                x1={r + Math.cos(angle) * inner}
                y1={r + Math.sin(angle) * inner}
                x2={r + Math.cos(angle) * outer}
                y2={r + Math.sin(angle) * outer}
                stroke={i % 5 === 0 ? '#666' : '#444'}
                strokeWidth={i % 5 === 0 ? 1 : 0.6}
              />
            )
          })}
        </g>
      )}

      {/* Glass */}
      <circle cx={r} cy={r} r={r - 8} fill={`url(#${uid}-glass)`} />
      <circle cx={r} cy={r} r={r - 8} fill={`url(#${uid}-coat)`} />

      {/* Inner rings */}
      <circle cx={r} cy={r} r={r - 12} fill="none" stroke="#1e1e2a" strokeWidth="1" />
      <circle cx={r} cy={r} r={r - 16} fill="none" stroke="#161620" strokeWidth="0.8" />

      {/* Catch light */}
      <ellipse cx={r - 4} cy={r - 5} rx={3.5} ry={1.8} fill="rgba(255,255,255,0.06)" transform={`rotate(-30,${r},${r})`} />
      <circle cx={r - 3} cy={r - 4} r={1} fill="rgba(255,255,255,0.12)" />

      {/* Center dot */}
      <circle cx={r} cy={r} r={2} fill="#0a0a14" />
      <circle cx={r} cy={r} r={0.8} fill="rgba(100,140,255,0.3)" />

      {/* Red index tick */}
      <rect x={r - 0.75} y={1} width={1.5} height={4} fill="#E0261A" rx="0.5" />
    </svg>
  )
}

/* ─── Full lens (LensOverlay center piece) ────────────────── */
export function FullLens({
  size = 260,
  dark = true,
  focusRot,
}: {
  size?: number
  dark?: boolean
  focusRot?: MotionValue<string>
}) {
  const r = size / 2
  const uid = useRef(`fl-${Math.random().toString(36).slice(2, 6)}`).current
  const fgColor = dark ? '#e0e0e0' : '#1a1a1a'
  const ringColor = dark ? '#333' : '#bbb'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id={`${uid}-glass`} cx="38%" cy="33%" r="68%">
          <stop offset="0%" stopColor="#1c2035" />
          <stop offset="45%" stopColor="#08090f" />
          <stop offset="100%" stopColor="#010105" />
        </radialGradient>
        <radialGradient id={`${uid}-coat`} cx="30%" cy="26%" r="72%">
          <stop offset="0%" stopColor="#5577ee" stopOpacity="0.35" />
          <stop offset="35%" stopColor="#9955dd" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#3355bb" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#112266" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-mid`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14141e" />
          <stop offset="100%" stopColor="#060608" />
        </radialGradient>
      </defs>

      {/* Housing ring */}
      <circle cx={r} cy={r} r={r - 1} fill={dark ? '#111' : '#ddd'} />
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke={ringColor} strokeWidth="1" />

      {/* Outer tick ring — rotates */}
      {focusRot ? (
        <motion.g style={{ rotate: focusRot, transformOrigin: `${r}px ${r}px` }}>
          {Array.from({ length: 120 }, (_, i) => {
            const angle = (i / 120) * Math.PI * 2
            const outerR = r - 3
            const len = i % 10 === 0 ? 9 : i % 5 === 0 ? 6 : 3.5
            const innerR = outerR - len
            return (
              <line
                key={i}
                x1={r + Math.cos(angle) * innerR}
                y1={r + Math.sin(angle) * innerR}
                x2={r + Math.cos(angle) * outerR}
                y2={r + Math.sin(angle) * outerR}
                stroke={i % 10 === 0 ? fgColor : i % 5 === 0 ? (dark ? '#555' : '#888') : (dark ? '#333' : '#aaa')}
                strokeWidth={i % 10 === 0 ? 1.5 : i % 5 === 0 ? 1 : 0.6}
              />
            )
          })}
        </motion.g>
      ) : (
        <g>
          {Array.from({ length: 120 }, (_, i) => {
            const angle = (i / 120) * Math.PI * 2
            const outerR = r - 3
            const len = i % 10 === 0 ? 9 : i % 5 === 0 ? 6 : 3.5
            const innerR = outerR - len
            return (
              <line
                key={i}
                x1={r + Math.cos(angle) * innerR}
                y1={r + Math.sin(angle) * innerR}
                x2={r + Math.cos(angle) * outerR}
                y2={r + Math.sin(angle) * outerR}
                stroke={i % 10 === 0 ? fgColor : '#444'}
                strokeWidth={i % 10 === 0 ? 1.5 : 0.6}
              />
            )
          })}
        </g>
      )}

      {/* Brand text — top arc */}
      <path id={`${uid}-arc-top`} d={`M ${r - r * 0.6},${r} a ${r * 0.6},${r * 0.6} 0 0,1 ${r * 1.2},0`} fill="none" />
      <text fontSize="8.5" letterSpacing="4.5" fill={dark ? '#888' : '#666'} fontFamily="'DM Sans', sans-serif">
        <textPath href={`#${uid}-arc-top`} startOffset="10%">ELEVEN25 · STUDIOS</textPath>
      </text>

      {/* Brand text — bottom arc */}
      <path id={`${uid}-arc-bot`} d={`M ${r - r * 0.62},${r} a ${r * 0.62},${r * 0.62} 0 0,0 ${r * 1.24},0`} fill="none" />
      <text fontSize="7.5" letterSpacing="3.5" fill={dark ? '#666' : '#999'} fontFamily="'DM Sans', sans-serif">
        <textPath href={`#${uid}-arc-bot`} startOffset="15%">VISUAL STORIES · CHENNAI</textPath>
      </text>

      {/* Main glass */}
      <circle cx={r} cy={r} r={r - 26} fill={`url(#${uid}-glass)`} />
      <circle cx={r} cy={r} r={r - 26} fill={`url(#${uid}-coat)`} />

      {/* Mid rings */}
      <circle cx={r} cy={r} r={r - 32} fill="none" stroke="#1e1e2e" strokeWidth="1.5" />
      <circle cx={r} cy={r} r={r - 42} fill={`url(#${uid}-mid)`} />
      <circle cx={r} cy={r} r={r - 42} fill="none" stroke="#131318" strokeWidth="1" />

      {/* Inner tick marks */}
      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2
        const orb = r - 43
        const len = i % 9 === 0 ? 5 : 2.5
        return (
          <line
            key={i}
            x1={r + Math.cos(angle) * (orb - len)}
            y1={r + Math.sin(angle) * (orb - len)}
            x2={r + Math.cos(angle) * orb}
            y2={r + Math.sin(angle) * orb}
            stroke={i % 9 === 0 ? '#3a3a4a' : '#252530'}
            strokeWidth={i % 9 === 0 ? 1.2 : 0.7}
          />
        )
      })}

      {/* Center glass */}
      <circle cx={r} cy={r} r={r - 60} fill="#060609" />
      <circle cx={r} cy={r} r={r - 64} fill="#04040a" />

      {/* Aperture blades suggestion */}
      {Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2
        const br = r - 65
        const bw = 10
        return (
          <path
            key={i}
            d={`M ${r},${r} L ${r + Math.cos(angle) * br},${r + Math.sin(angle) * br} A ${bw},${bw} 0 0,1 ${r + Math.cos(angle + 0.4) * br},${r + Math.sin(angle + 0.4) * br} Z`}
            fill="rgba(10,10,20,0.7)"
          />
        )
      })}

      {/* Catch lights */}
      <ellipse
        cx={r - r * 0.22} cy={r - r * 0.22}
        rx={r * 0.09} ry={r * 0.04}
        fill="rgba(255,255,255,0.055)"
        transform={`rotate(-40,${r},${r})`}
      />
      <circle cx={r - r * 0.18} cy={r - r * 0.18} r={r * 0.025} fill="rgba(255,255,255,0.1)" />
      <circle cx={r - r * 0.08} cy={r - r * 0.1} r={r * 0.012} fill="rgba(180,200,255,0.12)" />

      {/* Center point */}
      <circle cx={r} cy={r} r={4} fill="#08080f" />
      <circle cx={r} cy={r} r={2} fill="rgba(100,140,255,0.2)" />

      {/* Red index tick */}
      <rect x={r - 1} y={3} width={2} height={7} fill="#E0261A" rx="1" />

      {/* ESTD / 2020 */}
      <text x={r + 14} y={r + 3} fontSize="6" fill={dark ? '#444' : '#aaa'} fontFamily="'DM Sans', sans-serif" letterSpacing="1">ESTD</text>
      <text x={r + 14} y={r + 11} fontSize="6" fill={dark ? '#555' : '#999'} fontFamily="'DM Sans', sans-serif" letterSpacing="1">2020</text>
    </svg>
  )
}
