import { RefObject, useEffect, useRef } from 'react'

export function useMousePositionRef(
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = {
          x: x - rect.left - rect.width / 2,
          y: y - rect.top - rect.height / 2,
        }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      updatePosition(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}
