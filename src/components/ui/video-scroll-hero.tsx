import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface VideoScrollHeroProps {
  title: string
  sub: string
  backHref?: string
  imageSrc?: string
  videoSrc?: string
  /** Start scale for the reveal animation (0–1) */
  startScale?: number
}

export default function VideoScrollHero({
  title,
  sub,
  backHref = '/',
  imageSrc,
  videoSrc,
  startScale = 0.55,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(startScale)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const containerH = containerRef.current.offsetHeight
      const winH = window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const maxScroll = containerH - winH
      const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0
      setScale(startScale + progress * (1 - startScale))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [startScale])

  return (
    <div ref={containerRef} className="relative h-[220vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#F2F0EB]">
        {/* Back link — visible before the media */}
        <Link
          to={backHref}
          className="absolute top-24 left-6 md:left-10 z-20 inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-charcoal/60 font-sans hover:text-charcoal transition-colors duration-200"
        >
          <ArrowLeft size={12} />
          Back
        </Link>

        {/* Scaling media container */}
        <div
          className="relative overflow-hidden shadow-2xl will-change-transform"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            width: '90vw',
            height: 'clamp(260px, 70vh, 900px)',
            borderRadius: scale > 0.85 ? `${(1 - scale) * 24}px` : '20px',
            transition: 'border-radius 0.05s linear',
          }}
        >
          {/* Media */}
          {videoSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={videoSrc}
            />
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : null}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/20 via-transparent to-[#111111]/60" />

          {/* Title overlay — fades in as scale increases */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
            style={{ opacity: Math.max(0, (scale - 0.7) / 0.3) }}
          >
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#F2F0EB]/60 font-sans mb-2">
              {sub}
            </p>
            <h1 className="font-display text-[48px] md:text-[72px] font-light italic text-[#F2F0EB] leading-none">
              {title}
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
