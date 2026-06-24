import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '../../../hooks/useCountUp'

interface StatCardProps {
  number: number
  suffix: string
  label: string
  delay?: number
}

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (delay: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function StatCard({ number, suffix, label, delay = 0 }: StatCardProps) {
  const [hov, setHov] = useState(false)
  const { ref, count } = useCountUp(number, 1.8)

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      custom={delay}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#111111',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.14)' : '#1c1c1c'}`,
        borderRadius: 16,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transform: hov ? 'scale(1.01)' : 'scale(1)',
        transition: 'border-color 0.3s, transform 0.3s',
        cursor: 'default',
      }}
    >
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(52px, 5vw, 72px)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: hov ? '#0096E6' : 'rgba(255,255,255,0.92)',
          transition: 'color 0.3s',
        }}
      >
        {count}
        <span style={{ fontWeight: 300 }}>{suffix}</span>
      </div>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.30)',
          margin: 0,
          marginTop: 12,
        }}
      >
        {label}
      </p>
    </motion.div>
  )
}
