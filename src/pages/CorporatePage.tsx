import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { corporateItems } from '../data/portfolio'
import CorporateHero from '../components/ui/corporate-hero'

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

const photoItems = corporateItems.filter((i) => !i.isFilm)
const clipItems = corporateItems.filter((i) => i.isFilm)

const subCategories = [
  {
    label: 'Wedding',
    sub: 'Photography',
    href: '/wedding',
    desc: 'Intimate, documentary-style coverage of every love story.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    label: 'Fashion',
    sub: 'Editorial & Commercial',
    href: '/fashion',
    desc: 'From studio lookbooks to outdoor editorial campaigns.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    label: 'Events',
    sub: 'Coverage',
    href: '/events',
    desc: 'Galas, conferences, concerts — every moment documented.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80&auto=format&fit=crop',
    ],
  },
]

export default function CorporatePage() {
  return (
    <main className="bg-[#F2F0EB] min-h-screen">

      {/* ── Hero ── */}
      <CorporateHero />

      {/* ── Photography grid ── */}
      <section id="work" className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <FadeItem>
          <div className="flex items-center gap-6 mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase text-muted font-sans">Photography</p>
            <div className="h-px flex-1 bg-border" />
          </div>
        </FadeItem>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <FadeItem><div className="md:col-span-7 portfolio-item overflow-hidden aspect-[16/10]"><img src={photoItems[0].src} alt={photoItems[0].alt} className="w-full h-full object-cover" /></div></FadeItem>
          <FadeItem delay={0.1}><div className="md:col-span-5 portfolio-item overflow-hidden aspect-[4/5]"><img src={photoItems[1].src} alt={photoItems[1].alt} className="w-full h-full object-cover" /></div></FadeItem>
          <FadeItem delay={0.05}><div className="md:col-span-5 portfolio-item overflow-hidden aspect-[4/5]"><img src={photoItems[2].src} alt={photoItems[2].alt} className="w-full h-full object-cover" /></div></FadeItem>
          <FadeItem delay={0.1}><div className="md:col-span-7 portfolio-item overflow-hidden aspect-[16/10]"><img src={photoItems[3].src} alt={photoItems[3].alt} className="w-full h-full object-cover" /></div></FadeItem>
          <FadeItem delay={0.05}><div className="md:col-span-6 portfolio-item overflow-hidden aspect-[4/3]"><img src={photoItems[4].src} alt={photoItems[4].alt} className="w-full h-full object-cover" /></div></FadeItem>
          <FadeItem delay={0.1}><div className="md:col-span-6 portfolio-item overflow-hidden aspect-[4/3]"><img src={photoItems[5].src} alt={photoItems[5].alt} className="w-full h-full object-cover" /></div></FadeItem>
        </div>
      </section>

      {/* ── Corporate clips ── */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-20">
        <FadeItem>
          <div className="flex items-center gap-6 mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase text-muted font-sans">Corporate Clips</p>
            <div className="h-px flex-1 bg-border" />
          </div>
        </FadeItem>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {clipItems.map((film, i) => (
            <FadeItem key={film.id} delay={i * 0.1}>
              <div className="group relative portfolio-item overflow-hidden aspect-[16/10] cursor-pointer">
                <img src={film.src} alt={film.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#111111]/40 group-hover:bg-[#111111]/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full border border-[#F2F0EB]/50 flex items-center justify-center group-hover:border-[#F2F0EB] group-hover:bg-[#F2F0EB]/10 transition-all duration-300">
                    <Play size={18} className="text-[#F2F0EB] ml-1 fill-[#F2F0EB]" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p className="font-display text-[22px] font-light italic text-[#F2F0EB]">{film.title}</p>
                </div>
              </div>
            </FadeItem>
          ))}
        </div>
      </section>

      {/* ── Sub-categories ── */}
      <section className="bg-[#111111]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <FadeItem>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-[11px] tracking-[0.35em] uppercase text-[#7A7A72] font-sans mb-4">Also We Shoot</p>
                <h2 className="font-display text-[44px] md:text-[64px] font-light italic text-[#F2F0EB] leading-none">
                  More Categories
                </h2>
              </div>
            </div>
          </FadeItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subCategories.map((cat, i) => (
              <FadeItem key={cat.label} delay={i * 0.1}>
                <Link to={cat.href} className="group block">
                  {/* Hero image */}
                  <div className="relative overflow-hidden aspect-[4/3] mb-5">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
                  </div>

                  {/* Preview strip */}
                  <div className="flex gap-2 mb-5 overflow-hidden">
                    {cat.images.map((src, j) => (
                      <div key={j} className="flex-1 aspect-[4/3] overflow-hidden">
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Label */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.35em] uppercase text-[#7A7A72] font-sans mb-1">{cat.sub}</p>
                      <p className="font-display text-[28px] font-light italic text-[#F2F0EB] leading-none group-hover:text-white transition-colors duration-300">
                        {cat.label}
                      </p>
                      <p className="text-[12px] text-[#7A7A72] font-sans mt-2 leading-relaxed">{cat.desc}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[#F2F0EB]/20 flex items-center justify-center group-hover:border-[#F2F0EB]/60 group-hover:bg-[#F2F0EB]/10 transition-all duration-300 flex-shrink-0 ml-4">
                      <ArrowUpRight size={14} className="text-[#F2F0EB]/50 group-hover:text-[#F2F0EB] transition-colors" />
                    </div>
                  </div>
                </Link>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
