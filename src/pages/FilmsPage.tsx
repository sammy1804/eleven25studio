import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { filmItems, corporateItems } from '../data/portfolio'
import ThreeDGallery from '../components/ui/3d-gallery'

const allFilmImages = [
  ...filmItems.map((f) => ({ src: f.src, alt: f.alt })),
  ...corporateItems.filter((c) => c.isFilm).map((c) => ({ src: c.src, alt: c.alt ?? '' })),
]

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

export default function FilmsPage() {
  return (
    <main className="bg-[#111111] min-h-screen">

      {/* ── 3D Gallery hero ── */}
      <div className="relative h-screen w-full">
        <ThreeDGallery
          images={allFilmImages}
          speed={1}
          visibleCount={10}
          className="h-full w-full"
        />

        {/* Overlay text */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mix-blend-difference"
          >
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#F2F0EB]/60 font-sans mb-2">
              eleven25 studio
            </p>
            <h1 className="font-display text-[60px] md:text-[90px] font-light italic text-[#F2F0EB] leading-none">
              Films
            </h1>
            <p className="font-sans text-[13px] text-[#F2F0EB]/50 mt-3">
              Scroll to navigate · Architecture & Corporate
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Films list ── */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <FadeItem>
          <div className="flex items-center gap-6 mb-14">
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#7A7A72] font-sans">
              All Films
            </p>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </FadeItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allFilmImages.map((film, i) => {
            const filmData = [...filmItems, ...corporateItems.filter((c) => c.isFilm)][i]
            return (
              <FadeItem key={i} delay={(i % 2) * 0.08}>
                <div className="group relative overflow-hidden aspect-[16/10] cursor-pointer portfolio-item">
                  <img src={film.src} alt={film.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[#111111]/45 group-hover:bg-[#111111]/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#F2F0EB]/40 font-sans mb-1">
                      {i < filmItems.length ? 'Architecture Film' : 'Corporate Film'}
                    </p>
                    <p className="font-display text-[22px] font-light italic text-[#F2F0EB]">
                      {filmData?.title ?? film.alt}
                    </p>
                  </div>
                </div>
              </FadeItem>
            )
          })}
        </div>
      </section>
    </main>
  )
}
