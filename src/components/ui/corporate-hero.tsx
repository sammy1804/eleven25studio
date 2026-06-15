import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const MARQUEE_IMAGES = [
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&auto=format&fit=crop',
]

const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
}

const duplicated = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES]

export default function CorporateHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#111111] flex flex-col items-center justify-center text-center px-6">

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="text-[11px] tracking-[0.4em] uppercase text-[#7A7A72] font-sans mb-6"
        >
          eleven25 studio
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="font-display text-[64px] md:text-[100px] lg:text-[130px] font-light italic text-[#F2F0EB] leading-none tracking-tight"
        >
          Corporate
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="mt-5 max-w-md text-[14px] text-[#7A7A72] font-sans leading-relaxed"
        >
          Photography, brand films, and corporate clips —
          every image purposefully crafted for your brand.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="mt-8 flex items-center gap-4"
        >
          <a
            href="mailto:hello@eleven25studio.com"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-[#F2F0EB] text-[#111111] text-[12px] tracking-wider uppercase font-sans font-medium hover:bg-white transition-colors duration-300"
          >
            Enquire
          </a>
          <Link
            to="#work"
            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full border border-[#F2F0EB]/20 text-[#F2F0EB]/60 text-[12px] tracking-wider uppercase font-sans hover:border-[#F2F0EB]/50 hover:text-[#F2F0EB] transition-all duration-300"
          >
            View Work <ArrowUpRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Scrolling marquee strip */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_75%,transparent)]">
        <motion.div
          className="flex gap-4 items-end pb-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
          style={{ width: 'max-content' }}
        >
          {duplicated.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden rounded-xl"
              style={{
                width: 200,
                height: i % 3 === 0 ? 200 : i % 3 === 1 ? 160 : 180,
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover opacity-60"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#111111]/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
