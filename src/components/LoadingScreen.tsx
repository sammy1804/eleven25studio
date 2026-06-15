import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const called = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!called.current) {
        called.current = true
        onComplete()
      }
    }, 2600)
    return () => clearTimeout(timer)
  }, [onComplete])

  const letters = 'eleven25'.split('')

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: '#F5F1EA' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex flex-col items-center">
        {/* Letter animation */}
        <div className="flex items-end overflow-hidden">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className="font-display font-light italic leading-none select-none"
              style={{
                fontSize: 'clamp(52px, 12vw, 108px)',
                color: '#1C1814',
              }}
              initial={{ y: '110%', opacity: 0 }}
              animate={{
                y: ['110%', '0%', '-30%'],
                opacity: [0, 1, 0],
                filter: ['blur(0px)', 'blur(0px)', 'blur(8px)'],
              }}
              transition={{
                times: [0, 0.38, 1],
                duration: 2.2,
                delay: i * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="overflow-hidden mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.0, delay: 0.3, times: [0, 0.3, 1] }}
        >
          <span
            className="font-sans text-[11px] tracking-[0.5em] uppercase"
            style={{ color: '#8A847C' }}
          >
            studios
          </span>
        </motion.div>
      </div>

      {/* Progress line */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-28 h-px overflow-hidden"
        style={{ background: '#D8D3C9' }}
      >
        <motion.div
          className="h-full"
          style={{ background: '#B8956A', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.2, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}
