import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      setVisible(true)
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      raf = requestAnimationFrame(animate)
    }

    const addListeners = () => {
      const targets = document.querySelectorAll('a, button, [data-hover]')
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    // Wait for DOM to populate
    const timer = setTimeout(addListeners, 300)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <div
      className="cursor"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
    >
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovered ? 'is-hovered' : ''}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998 }}
      />
    </div>
  )
}
