import { Link } from 'react-router-dom'
import {
  ContainerScroll,
  BentoGrid,
  BentoCell,
  ContainerScale,
} from './ui/hero-gallery-scroll-animation'

const HERO_IMAGES = [
  // main large image — architecture exterior
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90&auto=format&fit=crop',
  // top-right — fashion
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85&auto=format&fit=crop',
  // mid-right — events
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85&auto=format&fit=crop',
  // bottom-left — interior architecture
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85&auto=format&fit=crop',
  // bottom-right — corporate
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=85&auto=format&fit=crop',
]

export default function HomeHeroScroll() {
  return (
    <ContainerScroll className="h-[320vh] bg-[#F8F7F4]">

      {/* ── Background bento image grid ── */}
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-3 gap-3">
        {HERO_IMAGES.map((src, i) => (
          <BentoCell
            key={i}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={src}
              alt=""
              className="size-full object-cover object-center"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </BentoCell>
        ))}
      </BentoGrid>

      {/* ── Hero text (fades out on scroll) ── */}
      <ContainerScale className="z-10 text-center">

        {/* Headline — 64px fixed */}
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: 64,
            lineHeight: 0.8,
            letterSpacing: '-0.03em',
            color: '#1A1A1A',
            margin: 0,
          }}
        >
          Visual stories that<br />
          <span style={{ color: '#0096E6' }}>endure.</span>
        </h1>

        {/* Subheading */}
        <p
          className="mt-5 mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: '#888888',
            lineHeight: 1.7,
            maxWidth: 420,
            margin: '10px auto 0',
          }}
        >
          Architecture · Fashion · Events · Corporate — visual stories crafted with intention.
        </p>

        {/* CTA */}
        <div className="mt-8 flex items-center justify-center">
          <Link
            to="/architecture"
            className="flex items-center gap-2 transition-opacity hover:opacity-75"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: '#1A1A1A',
              padding: '14px 32px',
              textDecoration: 'none',
            }}
          >
            View Work
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Link>
        </div>

      </ContainerScale>

    </ContainerScroll>
  )
}
