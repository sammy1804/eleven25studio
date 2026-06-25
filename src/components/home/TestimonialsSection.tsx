import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MasonryGrid } from '../ui/image-testimonial-grid'
import { TestimonialsColumn } from '../ui/testimonials-columns-1'

/* ── Photography showcase cards (image + client overlay) ── */
const SHOWCASE = [
  {
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Rajan Mehta',
    handle: 'Prestige Group',
    feedback: 'These shots completely redefined our project marketing.',
    mainImage:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80&auto=format&fit=crop',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Priya Sharma',
    handle: 'Embassy Office Parks',
    feedback: 'The cinematic quality is unmatched. Our brand story finally came alive.',
    mainImage:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/men/56.jpg',
    name: 'Anil Kapoor',
    handle: 'Biocon Ltd.',
    feedback: 'Professional, creative, deeply attentive to detail.',
    mainImage:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80&auto=format&fit=crop',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Shreya Nair',
    handle: 'Godrej Properties',
    feedback: 'Every frame felt intentional. Pure artistry.',
    mainImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/men/78.jpg',
    name: 'Vikram Rao',
    handle: 'Phoenix Mills',
    feedback: 'The event coverage was extraordinary — nothing missed.',
    mainImage:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80&auto=format&fit=crop',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/88.jpg',
    name: 'Meera Iyer',
    handle: 'WeWork India',
    feedback: 'A golden hour shoot that gave our brand a whole new voice.',
    mainImage:
      'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80&auto=format&fit=crop',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/men/21.jpg',
    name: 'Karan Singh',
    handle: 'Sobha Realty',
    feedback: 'The architecture film spoke louder than any brochure ever could.',
    mainImage:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80&auto=format&fit=crop',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
    name: 'Ananya Pillai',
    handle: 'KPMG India',
    feedback: 'The portraits captured exactly who we are as a team.',
    mainImage:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop',
  },
]

/* ── Text testimonials for scrolling columns ── */
const TEXT_TESTIMONIALS = [
  {
    text: 'Eleven25 transformed how we present our spaces. Their architectural photography redefined our entire marketing approach.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Rajan Mehta',
    role: 'Prestige Group, Bangalore',
  },
  {
    text: 'The cinematic quality of their corporate films is unmatched. Our brand story has never been told so powerfully.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Priya Sharma',
    role: 'Embassy Office Parks',
  },
  {
    text: 'Working with Eleven25 on our product launch was seamless. Professional, creative, deeply attentive to detail.',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    name: 'Anil Kapoor',
    role: 'Biocon Ltd.',
  },
  {
    text: 'They captured the soul of our development in ways we never imagined possible. Absolute professionals.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Shreya Nair',
    role: 'Godrej Properties',
  },
  {
    text: 'Every event they shoot feels like a feature film. The team has a real eye for storytelling.',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    name: 'Vikram Rao',
    role: 'Phoenix Mills',
  },
  {
    text: 'Our workspace photography has driven more leasing inquiries than any campaign we have run before.',
    image: 'https://randomuser.me/api/portraits/women/88.jpg',
    name: 'Meera Iyer',
    role: 'WeWork India',
  },
  {
    text: 'The fashion editorial shoot exceeded every expectation. Each image tells a complete story on its own.',
    image: 'https://randomuser.me/api/portraits/men/21.jpg',
    name: 'Karan Singh',
    role: 'Creative Director',
  },
  {
    text: 'Incredible attention to light and composition. These portraits are now the face of our entire executive team.',
    image: 'https://randomuser.me/api/portraits/women/11.jpg',
    name: 'Ananya Pillai',
    role: 'KPMG India',
  },
  {
    text: 'The architecture film they produced for our newest tower has become our single most-shared piece of content.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Deepak Verma',
    role: 'Tata Consultancy',
  },
]

const col1 = TEXT_TESTIMONIALS.slice(0, 3)
const col2 = TEXT_TESTIMONIALS.slice(3, 6)
const col3 = TEXT_TESTIMONIALS.slice(6, 9)

/* ── Showcase card ── */
function ShowcaseCard({
  profileImage,
  name,
  handle,
  feedback,
  mainImage,
}: (typeof SHOWCASE)[0]) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
    >
      <img
        src={mainImage}
        alt={feedback}
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).src =
            'https://placehold.co/800x600/1a1a1a/ffffff?text=Image'
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 50%)',
        }}
      />
      {/* Top overlay: profile + quote */}
      <div style={{ position: 'absolute', top: 0, left: 0, padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <img
            src={profileImage}
            alt={name}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.7)',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <div>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 10,
                color: 'rgba(255,255,255,0.60)',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {handle}
            </p>
          </div>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            color: 'rgba(255,255,255,0.88)',
            margin: 0,
            lineHeight: 1.5,
            maxWidth: 200,
          }}
        >
          "{feedback}"
        </p>
      </div>
    </div>
  )
}

/* ── Section ── */
export default function TestimonialsSection() {
  const [columns, setColumns] = useState(4)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setColumns(1)
      else if (w < 1024) setColumns(2)
      else if (w < 1280) setColumns(3)
      else setColumns(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section style={{ background: '#F8F7F4', padding: 'clamp(80px, 10vh, 120px) clamp(24px, 5vw, 80px)', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 56 }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#0096E6', // eyebrow stays blue
              margin: '0 0 12px',
            }}
          >
            • Client voices
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                color: '#1A1A1A',
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Work that speaks.<br />
              <span style={{ color: 'rgba(26,26,26,0.28)' }}>Clients that confirm it.</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: '#888888',
                lineHeight: 1.8,
                maxWidth: 320,
                margin: 0,
              }}
            >
              Real projects. Real clients. Real stories — shared by the people who hired us.
            </p>
          </div>
        </motion.div>

        {/* Image masonry grid */}
        <MasonryGrid columns={columns} gap={4} style={{ marginBottom: columns === 1 ? 48 : 72 }}>
          {SHOWCASE.map((item, i) => (
            <ShowcaseCard key={i} {...item} />
          ))}
        </MasonryGrid>

        {/* Scrolling text columns */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 14,
            maxHeight: columns === 1 ? 400 : 580,
            overflow: 'hidden',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={18} />
          {columns >= 2 && <TestimonialsColumn testimonials={col2} duration={22} />}
          {columns >= 3 && <TestimonialsColumn testimonials={col3} duration={20} />}
        </div>

      </div>
    </section>
  )
}
