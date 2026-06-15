import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'
import { architectureItems, filmItems } from '../data/portfolio'
import VideoScrollHero from '../components/ui/video-scroll-hero'

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

export default function ArchitecturePage() {
  return (
    <main className="bg-[#F2F0EB] min-h-screen">
      {/* ── Full-bleed scroll hero ── */}
      <VideoScrollHero
        title="Architecture"
        sub="Photography & Films"
        imageSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2000&q=85&auto=format&fit=crop"
      />

      {/* ── Photography grid ── */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <FadeItem>
          <div className="flex items-center gap-6 mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase text-muted font-sans whitespace-nowrap">
              Photography
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
        </FadeItem>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <FadeItem delay={0}>
            <div className="md:col-span-8 portfolio-item overflow-hidden aspect-[16/10]">
              <img src={architectureItems[0].src} alt={architectureItems[0].alt} className="w-full h-full object-cover" />
            </div>
          </FadeItem>
          <FadeItem delay={0.1}>
            <div className="md:col-span-4 portfolio-item overflow-hidden aspect-[3/4]">
              <img src={architectureItems[1].src} alt={architectureItems[1].alt} className="w-full h-full object-cover" />
            </div>
          </FadeItem>
          <FadeItem delay={0.05}>
            <div className="md:col-span-4 portfolio-item overflow-hidden aspect-[3/4]">
              <img src={architectureItems[3].src} alt={architectureItems[3].alt} className="w-full h-full object-cover" />
            </div>
          </FadeItem>
          <FadeItem delay={0.1}>
            <div className="md:col-span-8 portfolio-item overflow-hidden aspect-[16/10]">
              <img src={architectureItems[2].src} alt={architectureItems[2].alt} className="w-full h-full object-cover" />
            </div>
          </FadeItem>
          {architectureItems.slice(4, 7).map((item, i) => (
            <FadeItem key={item.id} delay={i * 0.08}>
              <div className="md:col-span-4 portfolio-item overflow-hidden aspect-[4/5]">
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              </div>
            </FadeItem>
          ))}
          <FadeItem delay={0.05}>
            <div className="md:col-span-6 portfolio-item overflow-hidden aspect-[4/3]">
              <img src={architectureItems[7].src} alt={architectureItems[7].alt} className="w-full h-full object-cover" />
            </div>
          </FadeItem>
          <FadeItem delay={0.12}>
            <div className="md:col-span-6 portfolio-item overflow-hidden aspect-[4/3]">
              <img src={architectureItems[8].src} alt={architectureItems[8].alt} className="w-full h-full object-cover" />
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ── Films section (dark) ── */}
      <section className="bg-[#111111]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <FadeItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <p className="text-[11px] tracking-[0.35em] uppercase text-[#7A7A72] font-sans mb-4">Films</p>
                <h2 className="font-display text-[44px] md:text-[60px] font-light italic text-[#F2F0EB] leading-none">
                  Architecture in Motion
                </h2>
              </div>
              <p className="max-w-xs font-sans text-[13px] text-[#7A7A72] leading-relaxed">
                Short-form and long-form cinematic films documenting buildings and architectural spaces.
              </p>
            </div>
          </FadeItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filmItems.map((film, i) => (
              <FadeItem key={film.id} delay={i * 0.1}>
                <div className="group relative portfolio-item overflow-hidden aspect-[16/10] cursor-pointer">
                  <img src={film.src} alt={film.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#111111]/50 group-hover:bg-[#111111]/25 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full border border-[#F2F0EB]/40 flex items-center justify-center group-hover:border-[#F2F0EB]/80 group-hover:bg-[#F2F0EB]/10 transition-all duration-300">
                      <Play size={18} className="text-[#F2F0EB] ml-1 fill-[#F2F0EB]" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#F2F0EB]/40 font-sans mb-1">Short Film</p>
                    <p className="font-display text-[22px] font-light italic text-[#F2F0EB]">{film.title}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
