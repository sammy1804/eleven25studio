import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, PhoneCall } from 'lucide-react'
import CorporateHero from '../components/ui/corporate-hero'

/* ── Helpers ── */
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

function SlideIn({ children, from = 'left', delay = 0 }: { children: React.ReactNode; from?: 'left' | 'right'; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: from === 'left' ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── Marquee ticker ── */
const TICKER_ITEMS = [
  'Branding', 'Product Campaigns', 'Fashion', 'Corporate Events',
  'E-commerce', 'Editorial', 'Brand Collaborations', 'Award Nights',
  'Networking Events', 'Launch Events', 'Personal Brands', 'Startups',
]
const tickerDup = [...TICKER_ITEMS, ...TICKER_ITEMS]

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-[#E0DDD7] py-3.5 bg-[#F2F0EB]">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        style={{ width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 22, repeat: Infinity }}
      >
        {tickerDup.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-sans text-[11px] tracking-[0.2em] uppercase" style={{ color: '#B5AFA8' }}>
            {item}
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#B8956A', display: 'inline-block', flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Category section header ── */
function CategoryHeader({ num, title, tags }: { num: string; title: string; tags: string[] }) {
  return (
    <FadeItem>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
        <div className="flex items-start gap-5">
          <span className="font-sans text-[11px] tabular-nums mt-2 flex-shrink-0" style={{ color: '#B8956A', fontFamily: "'Space Mono', monospace" }}>
            {num}
          </span>
          <h2 className="font-display font-light text-[36px] md:text-[56px] leading-none" style={{ color: '#111111', letterSpacing: '-0.02em' }}>
            {title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:gap-1.5">
          {tags.map(tag => (
            <span key={tag} className="font-sans text-[11px] tracking-[0.15em] uppercase" style={{ color: '#B5AFA8' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </FadeItem>
  )
}

/* ── Image card with hover zoom ── */
function ImgCard({ src, alt, className = '', style = {} }: { src: string; alt?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`overflow-hidden portfolio-item ${className}`} style={style}>
      <img src={src} alt={alt ?? ''} loading="lazy" className="w-full h-full object-cover" />
    </div>
  )
}

/* ── Sub-categories ── */
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
  {
    label: 'Architecture',
    sub: 'Photography & Film',
    href: '/architecture',
    desc: 'Documenting the built world — from iconic landmarks to intimate interiors.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    label: 'Films',
    sub: 'Cinematic',
    href: '/films',
    desc: 'Short films that let buildings, brands, and people breathe.',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80&auto=format&fit=crop',
    ],
  },
]

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function CorporatePage() {
  return (
    <main className="bg-[#F2F0EB] min-h-screen">

      {/* ── Hero (unchanged) ── */}
      <CorporateHero />

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Tagline ── */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <FadeItem>
          <p
            className="font-display font-light italic"
            style={{ fontSize: 'clamp(24px, 4vw, 52px)', color: '#111111', lineHeight: 1.2, maxWidth: 780 }}
          >
            "We create visual content that helps brands grow."
          </p>
        </FadeItem>
      </section>

      {/* ══ 01 — BRANDING PHOTOGRAPHY ══ */}
      <section id="branding" className="max-w-[1600px] mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <CategoryHeader
          num="01"
          title="Branding Photography"
          tags={['Personal Brands', 'Startups', 'Companies']}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <SlideIn from="left">
            <ImgCard
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=90&auto=format&fit=crop"
              className="md:col-span-8 aspect-[16/10]"
            />
          </SlideIn>
          <div className="md:col-span-4 flex flex-col gap-3 md:gap-4">
            <SlideIn from="right" delay={0.07}>
              <ImgCard
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=90&auto=format&fit=crop"
                className="aspect-[4/3]"
              />
            </SlideIn>
            <SlideIn from="right" delay={0.14}>
              <ImgCard
                src="https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=90&auto=format&fit=crop"
                className="aspect-[4/3]"
              />
            </SlideIn>
          </div>
          <SlideIn from="left" delay={0.06}>
            <ImgCard
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=90&auto=format&fit=crop"
              className="md:col-span-5 aspect-[4/3]"
            />
          </SlideIn>
          <SlideIn from="right" delay={0.1}>
            <ImgCard
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=90&auto=format&fit=crop"
              className="md:col-span-7 aspect-[16/9]"
            />
          </SlideIn>
        </div>
      </section>

      {/* ── Divider strip ── */}
      <div className="border-t border-[#E0DDD7] mx-6 md:mx-10" />

      {/* ══ 02 — PRODUCT PHOTOGRAPHY ══ */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <CategoryHeader
          num="02"
          title="Product Photography"
          tags={['Product Campaigns', 'E-commerce Shoots', 'Commercial Photography']}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=90&auto=format&fit=crop', delay: 0 },
            { src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=90&auto=format&fit=crop', delay: 0.08 },
            { src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=90&auto=format&fit=crop', delay: 0.16 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: i % 2 === 0 ? 40 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: item.delay }}
              style={{ marginTop: i === 1 ? 'clamp(0px, 4vw, 56px)' : 0 }}
            >
              <ImgCard src={item.src} className="aspect-[3/4]" />
            </motion.div>
          ))}
        </div>

        {/* Wide bottom image */}
        <FadeItem delay={0.1}>
          <ImgCard
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=2000&q=90&auto=format&fit=crop"
            className="mt-3 md:mt-4 aspect-[21/9]"
          />
        </FadeItem>
      </section>

      {/* ── Divider strip ── */}
      <div className="border-t border-[#E0DDD7] mx-6 md:mx-10" />

      {/* ══ 03 — FASHION PHOTOGRAPHY ══ */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <CategoryHeader
          num="03"
          title="Fashion Photography"
          tags={['Campaigns', 'Editorial Work', 'Brand Collaborations']}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <SlideIn from="left">
            <ImgCard
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=90&auto=format&fit=crop"
              className="md:col-span-5 aspect-[3/4]"
            />
          </SlideIn>
          <div className="md:col-span-7 flex flex-col gap-3 md:gap-4">
            <SlideIn from="right" delay={0.07}>
              <ImgCard
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=90&auto=format&fit=crop"
                className="aspect-[16/9]"
              />
            </SlideIn>
            <SlideIn from="right" delay={0.14}>
              <ImgCard
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=90&auto=format&fit=crop"
                className="aspect-[16/9]"
              />
            </SlideIn>
          </div>
          <SlideIn from="left" delay={0.08}>
            <ImgCard
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90&auto=format&fit=crop"
              className="md:col-span-12 aspect-[21/9]"
            />
          </SlideIn>
        </div>
      </section>

      {/* ── Divider strip ── */}
      <div className="border-t border-[#E0DDD7] mx-6 md:mx-10" />

      {/* ══ 04 — CORPORATE EVENTS ══ */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <CategoryHeader
          num="04"
          title="Corporate Events"
          tags={['Conferences', 'Award Nights', 'Networking Events', 'Launch Events']}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <FadeItem>
            <ImgCard
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=90&auto=format&fit=crop"
              className="md:col-span-12 aspect-[21/9]"
            />
          </FadeItem>
          <FadeItem delay={0.07}>
            <ImgCard
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=90&auto=format&fit=crop"
              className="md:col-span-4 aspect-[4/3]"
            />
          </FadeItem>
          <FadeItem delay={0.12}>
            <ImgCard
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=90&auto=format&fit=crop"
              className="md:col-span-4 aspect-[4/3]"
            />
          </FadeItem>
          <FadeItem delay={0.17}>
            <ImgCard
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=90&auto=format&fit=crop"
              className="md:col-span-4 aspect-[4/3]"
            />
          </FadeItem>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: '#111111' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <FadeItem>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: '#B8956A' }}>
              Start a Project
            </p>
            <h2
              className="font-display font-light italic leading-none"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)', color: '#F2F0EB' }}
            >
              Let's Create<br />Together.
            </h2>
          </FadeItem>
          <FadeItem delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 font-sans text-[12px] tracking-widest uppercase font-medium px-8 py-4 transition-colors duration-200"
                style={{ background: '#F2F0EB', color: '#111111' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.background = '#F2F0EB')}
              >
                Let's Create Together
              </Link>
              <a
                href="mailto:eleven25studios@gmail.com?subject=Discovery Call"
                className="inline-flex items-center justify-center gap-2 font-sans text-[12px] tracking-widest uppercase font-medium px-8 py-4 transition-all duration-200"
                style={{ border: '1px solid rgba(242,240,235,0.25)', color: '#F2F0EB' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(242,240,235,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(242,240,235,0.25)')}
              >
                <PhoneCall size={13} /> Book a Discovery Call
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ── Also We Shoot ── */}
      <AlsoWeShoot />

    </main>
  )
}

function AlsoWeShoot() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? subCategories : subCategories.slice(0, 3)

  return (
    <section className="bg-[#111111]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 md:py-32" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <FadeItem>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <p className="text-[11px] tracking-[0.35em] uppercase text-[#7A7A72] font-sans mb-4">Also We Shoot</p>
              <h2 className="font-display text-[40px] md:text-[64px] font-light italic text-[#F2F0EB] leading-none">
                More Categories
              </h2>
            </div>
          </div>
        </FadeItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((cat, i) => (
            <FadeItem key={cat.label} delay={i * 0.1}>
              <Link to={cat.href} className="group block">
                <div className="relative overflow-hidden aspect-[4/3] mb-5">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
                </div>
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

        {!expanded && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setExpanded(true)}
              className="font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 transition-all duration-200"
              style={{ border: '1px solid rgba(242,240,235,0.2)', color: '#F2F0EB', background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(242,240,235,0.6)'; e.currentTarget.style.background = 'rgba(242,240,235,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(242,240,235,0.2)'; e.currentTarget.style.background = 'transparent' }}
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
