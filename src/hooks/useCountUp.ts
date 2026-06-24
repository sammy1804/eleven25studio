import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(to: number, duration = 1.8) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let rafId: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 4) // ease-out quart
      setCount(Math.round(eased * to))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, to, duration])

  return { ref, count }
}
