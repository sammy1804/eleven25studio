import { useRef, useEffect } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'

type ImageItem = string | { src: string; alt?: string }

interface GalleryProps {
  images: ImageItem[]
  speed?: number
  className?: string
  visibleCount?: number
}

export default function ThreeDGallery({ images, speed = 1, className = 'h-screen w-full' }: GalleryProps) {
  const normalized = images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img))

  // Duplicate for seamless loop
  const items = [...normalized, ...normalized, ...normalized]

  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const x1 = useRef(0)
  const x2 = useRef(0)

  useEffect(() => {
    const el = row1Ref.current
    if (!el) return
    // Start row2 offset halfway
    x2.current = -(el.scrollWidth / 3)
  }, [])

  useAnimationFrame((_, delta) => {
    const px = speed * delta * 0.05

    if (row1Ref.current) {
      x1.current -= px
      const w = row1Ref.current.scrollWidth / 3
      if (Math.abs(x1.current) >= w) x1.current = 0
      row1Ref.current.style.transform = `translateX(${x1.current}px)`
    }

    if (row2Ref.current) {
      x2.current += px
      const w = row2Ref.current.scrollWidth / 3
      if (x2.current >= 0) x2.current = -w
      row2Ref.current.style.transform = `translateX(${x2.current}px)`
    }
  })

  const half = Math.ceil(items.length / 2)
  const row1 = items.slice(0, half)
  const row2 = items.slice(half)

  return (
    <div className={`${className} overflow-hidden flex flex-col justify-center gap-4 bg-[#111111]`}>
      {/* Row 1 — moves left */}
      <div className="overflow-hidden">
        <div ref={row1Ref} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
          {row1.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: 340, height: 220 }}
            >
              <img
                src={img.src}
                alt={img.alt ?? ''}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#111111]/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — moves right */}
      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
          {row2.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: 340, height: 220 }}
            >
              <img
                src={img.src}
                alt={img.alt ?? ''}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#111111]/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
