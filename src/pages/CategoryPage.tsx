import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  weddingItems,
  fashionItems,
  eventItems,
  type PortfolioItem,
} from '../data/portfolio'
import VideoScrollHero from '../components/ui/video-scroll-hero'

const categoryConfig: Record<
  string,
  {
    title: string
    sub: string
    desc: string
    items: PortfolioItem[]
    heroBg?: string
  }
> = {
  wedding: {
    title: 'Wedding',
    sub: 'Photography',
    desc:
      'Intimate, documentary-style wedding photography — capturing the quiet moments and grand celebrations that define each love story.',
    items: weddingItems,
    heroBg:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=2000&q=85&auto=format&fit=crop',
  },
  fashion: {
    title: 'Fashion',
    sub: 'Photography',
    desc:
      'Editorial and commercial fashion photography — from studio lookbooks to outdoor editorial campaigns.',
    items: fashionItems,
    heroBg:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&q=85&auto=format&fit=crop',
  },
  events: {
    title: 'Events',
    sub: 'Photography & Coverage',
    desc:
      'Comprehensive event coverage — corporate galas, concerts, conferences, and every gathering worth remembering.',
    items: eventItems,
    heroBg:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=2000&q=85&auto=format&fit=crop',
  },
}

function FadeItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function CategoryPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace('/', '')
  const config = slug ? categoryConfig[slug] : null

  if (!config) {
    return (
      <main className="bg-[#F2F0EB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-muted mb-4">Category not found.</p>
          <Link to="/" className="text-charcoal underline font-sans text-sm">
            Return Home
          </Link>
        </div>
      </main>
    )
  }

  const { title, sub, items, heroBg } = config

  return (
    <main className="bg-[#F2F0EB] min-h-screen">
      <VideoScrollHero
        title={title}
        sub={sub}
        imageSrc={heroBg ?? ''}
      />

      {/* ─── PHOTO GRID ─── */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <FadeItem>
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted font-sans mb-10">
            Portfolio
          </p>
        </FadeItem>

        {/* Alternating asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {items.map((item, i) => {
            const isLandscape = item.aspectRatio === 'landscape'
            const isPortrait = item.aspectRatio === 'portrait'
            const colSpan = isLandscape ? 'md:col-span-8' : isPortrait ? 'md:col-span-4' : 'md:col-span-6'
            const aspect = isLandscape ? 'aspect-[16/10]' : isPortrait ? 'aspect-[3/4]' : 'aspect-[1/1]'

            return (
              <FadeItem key={item.id} delay={(i % 3) * 0.08}>
                <div className={`${colSpan} portfolio-item overflow-hidden ${aspect}`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeItem>
            )
          })}
        </div>
      </section>

      {/* ─── ENQUIRY STRIP ─── */}
      <section className="border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <FadeItem>
            <p className="font-display text-[28px] md:text-[36px] font-light italic text-charcoal leading-none">
              Planning a {title.toLowerCase()} project?
            </p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <a
              href="mailto:hello@eleven25studio.com"
              className="inline-flex items-center gap-2 bg-charcoal text-[#F2F0EB] px-8 py-3.5 text-[12px] tracking-widest uppercase font-sans hover:bg-[#2a2a2a] transition-colors duration-300"
            >
              Enquire Now
            </a>
          </FadeItem>
        </div>
      </section>
    </main>
  )
}
