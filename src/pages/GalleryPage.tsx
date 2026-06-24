import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, ExternalLink, LayoutGrid, Globe } from 'lucide-react'
// @ts-ignore
import DomeGallery from '../components/DomeGallery'

const DOME_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=90&auto=format&fit=crop', alt: 'Architecture' },
  { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=90&auto=format&fit=crop', alt: 'Corporate' },
  { src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=900&q=90&auto=format&fit=crop', alt: 'Film' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=90&auto=format&fit=crop', alt: 'Fashion' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=90&auto=format&fit=crop', alt: 'Architecture II' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=90&auto=format&fit=crop', alt: 'Wedding' },
  { src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=90&auto=format&fit=crop', alt: 'Architecture III' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=90&auto=format&fit=crop', alt: 'Events' },
  { src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=900&q=90&auto=format&fit=crop', alt: 'Portrait' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=90&auto=format&fit=crop', alt: 'Corporate II' },
  { src: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=900&q=90&auto=format&fit=crop', alt: 'Architecture IV' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=90&auto=format&fit=crop', alt: 'Fashion II' },
]

/* ── Palette ── */
const T = {
  bg:     '#F5F1EA',
  card:   '#FFFFFF',
  ink:    '#0E0E0C',
  muted:  '#8A847C',
  accent: '#B8956A',
  border: '#E5E1D8',
  hover:  '#EDEAE2',
}

/* ── Data ── */
type GalleryItem = {
  src: string
  collection: string
  tall?: boolean
}

const ITEMS: GalleryItem[] = [
  // Architecture
  { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=90&auto=format&fit=crop', collection: 'architecture', tall: true },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=90&auto=format&fit=crop', collection: 'architecture' },
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=90&auto=format&fit=crop', collection: 'architecture', tall: true },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=90&auto=format&fit=crop', collection: 'architecture' },
  { src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=90&auto=format&fit=crop', collection: 'architecture', tall: true },
  { src: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=900&q=90&auto=format&fit=crop', collection: 'architecture' },
  { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=90&auto=format&fit=crop', collection: 'architecture' },
  { src: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=900&q=90&auto=format&fit=crop', collection: 'architecture', tall: true },
  // Corporate
  { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=90&auto=format&fit=crop', collection: 'corporate' },
  { src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&q=90&auto=format&fit=crop', collection: 'corporate', tall: true },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=90&auto=format&fit=crop', collection: 'corporate' },
  { src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=900&q=90&auto=format&fit=crop', collection: 'corporate', tall: true },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=90&auto=format&fit=crop', collection: 'corporate' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=90&auto=format&fit=crop', collection: 'corporate' },
  // Films
  { src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=900&q=90&auto=format&fit=crop', collection: 'films', tall: true },
  { src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&q=90&auto=format&fit=crop', collection: 'films' },
  { src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&q=90&auto=format&fit=crop', collection: 'films', tall: true },
  { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=90&auto=format&fit=crop', collection: 'films' },
  // Events
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=90&auto=format&fit=crop', collection: 'events' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=90&auto=format&fit=crop', collection: 'events', tall: true },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=90&auto=format&fit=crop', collection: 'events' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=90&auto=format&fit=crop', collection: 'events', tall: true },
  // Fashion
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=90&auto=format&fit=crop', collection: 'fashion', tall: true },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=90&auto=format&fit=crop', collection: 'fashion' },
  { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=90&auto=format&fit=crop', collection: 'fashion', tall: true },
  { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=90&auto=format&fit=crop', collection: 'fashion' },
  // Weddings
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=90&auto=format&fit=crop', collection: 'weddings', tall: true },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=90&auto=format&fit=crop', collection: 'weddings' },
  { src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=900&q=90&auto=format&fit=crop', collection: 'weddings', tall: true },
  { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=900&q=90&auto=format&fit=crop', collection: 'weddings' },
  { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=90&auto=format&fit=crop', collection: 'weddings' },
]

type Collection = {
  id: string
  label: string
  href: string
  previews: string[]
}

const COLLECTIONS: Collection[] = [
  {
    id: 'all',
    label: 'All Work',
    href: '/gallery',
    previews: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    href: '/architecture',
    previews: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'corporate',
    label: 'Corporate',
    href: '/corporate',
    previews: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560472355-536de3962603?w=200&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'films',
    label: 'Films',
    href: '/films',
    previews: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    previews: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'fashion',
    label: 'Fashion',
    href: '/fashion',
    previews: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'weddings',
    label: 'Weddings',
    href: '/wedding',
    previews: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=200&q=80&auto=format&fit=crop',
    ],
  },
]

/* ── Sidebar collection row ── */
function CollectionRow({
  col,
  active,
  onClick,
}: {
  col: Collection
  active: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const count = col.id === 'all'
    ? ITEMS.length
    : ITEMS.filter(i => i.collection === col.id).length

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClick}
        className="w-full text-left px-3 py-2 rounded-lg transition-colors duration-150 font-sans text-[14px] flex items-center justify-between group"
        style={{
          background: active ? T.hover : 'transparent',
          color: active ? T.ink : T.muted,
          fontWeight: active ? 500 : 400,
        }}
      >
        <span>{col.label}</span>
        <span
          className="font-sans text-[11px]"
          style={{ color: active ? T.accent : '#C5BFB8' }}
        >
          {count}
        </span>
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-full top-0 ml-3 z-50 pointer-events-none"
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: '14px',
              width: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            }}
          >
            <p className="font-sans text-[13px] font-medium mb-0.5" style={{ color: T.ink }}>{col.label}</p>
            <p className="font-sans text-[11px] mb-3" style={{ color: T.muted }}>{count} items</p>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {col.previews.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="font-sans text-[10px]" style={{ color: '#C5BFB8' }}>Eleven25 Studio</p>
              <Link
                to={col.href}
                className="pointer-events-auto"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={11} style={{ color: T.accent }} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── View toggle button ── */
function ViewToggle({ view, onToggle }: { view: 'collection' | 'dome'; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="fixed z-50 flex items-center gap-2 font-sans text-[12px] tracking-wide px-4 py-2.5 rounded-full shadow-lg transition-colors duration-200"
      style={{
        bottom: 28,
        right: 28,
        background: '#0E0E0C',
        color: '#F5F1EA',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {view === 'collection' ? (
        <><Globe size={13} /> Dome View</>
      ) : (
        <><LayoutGrid size={13} /> Collection View</>
      )}
    </motion.button>
  )
}

/* ── Main page ── */
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 900,
        background: 'rgba(0,0,0,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 24, right: 28,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}
      >
        CLOSE
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <line x1="1" y1="1" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="12" y1="1" x2="1" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '88vw', maxHeight: '88vh',
          objectFit: 'contain', display: 'block',
        }}
      />
    </motion.div>
  )
}

export default function GalleryPage() {
  const [view, setView] = useState<'collection' | 'dome'>('collection')
  const [activeCollection, setActiveCollection] = useState('all')
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const filtered = activeCollection === 'all'
    ? ITEMS
    : ITEMS.filter(i => i.collection === activeCollection)

  if (view === 'dome') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#F5F1EA' }}>
        <DomeGallery
          images={DOME_IMAGES}
          grayscale={false}
          overlayBlurColor="#F5F1EA"
          imageBorderRadius="10px"
          openedImageBorderRadius="14px"
          openedImageWidth="460px"
          openedImageHeight="580px"
          fit={0.92}
          fitBasis="min"
          minRadius={400}
          dragSensitivity={18}
          dragDampening={1.8}
        />
        <ViewToggle view="dome" onToggle={() => setView('collection')} />
      </div>
    )
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      <div
        className="flex"
        style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', paddingTop: 80 }}
      >
        {/* ── Sidebar ── */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            position: 'sticky',
            top: 80,
            height: 'calc(100vh - 80px)',
            paddingTop: 40,
            paddingBottom: 32,
            overflowY: 'auto',
            borderRight: `1px solid ${T.border}`,
            paddingRight: 24,
          }}
        >
          {/* Studio identity */}
          <div className="mb-8">
            <div
              className="font-display font-light italic mb-1"
              style={{ fontSize: 22, color: T.ink, lineHeight: 1.1 }}
            >
              Eleven<span className="font-medium not-italic">25</span>
            </div>
            <p className="font-sans text-[11px] mb-3" style={{ color: T.muted }}>
              @eleven25studios
            </p>
            <p className="font-sans text-[12px] leading-relaxed mb-3" style={{ color: T.muted }}>
              Architecture, photography & film studio based in Bangalore, India.
            </p>
            <div className="flex items-center gap-1.5">
              <MapPin size={10} style={{ color: T.accent }} />
              <p className="font-sans text-[11px] tracking-wide uppercase" style={{ color: T.accent }}>
                Bangalore, India
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2 mb-8">
            <Link
              to="/contact"
              className="flex-1 text-center font-sans text-[11px] tracking-wide py-2 rounded-lg transition-colors duration-150"
              style={{ background: T.ink, color: '#F5F1EA' }}
            >
              Enquire
            </Link>
            <a
              href="https://www.instagram.com/eleven25studios"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-sans text-[11px] tracking-wide py-2 rounded-lg transition-colors duration-150"
              style={{ background: T.hover, color: T.ink, border: `1px solid ${T.border}` }}
            >
              Instagram
            </a>
          </div>

          {/* Collections */}
          <div>
            <p
              className="font-sans text-[10px] tracking-[0.25em] uppercase mb-3 px-3"
              style={{ color: '#C5BFB8' }}
            >
              Collections
            </p>
            <div className="flex flex-col gap-0.5">
              {COLLECTIONS.map(col => (
                <CollectionRow
                  key={col.id}
                  col={col}
                  active={activeCollection === col.id}
                  onClick={() => setActiveCollection(col.id)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Masonry grid ── */}
        <main style={{ flex: 1, paddingLeft: 24, paddingTop: 40, paddingBottom: 60 }}>
          {/* Header bar */}
          <div
            className="flex items-center justify-between mb-6"
            style={{ borderBottom: `1px solid ${T.border}`, paddingBottom: 16 }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-sans text-[13px] font-medium"
                style={{ color: T.ink }}
              >
                {COLLECTIONS.find(c => c.id === activeCollection)?.label}
              </span>
              <span
                className="font-sans text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: T.hover, color: T.muted }}
              >
                {filtered.length} items
              </span>
            </div>
            <p className="font-sans text-[11px]" style={{ color: '#C5BFB8' }}>
              Eleven25 Studio · Bangalore
            </p>
          </div>

          {/* Columns masonry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCollection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                columns: '3 220px',
                columnGap: 10,
              }}
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
                  style={{ breakInside: 'avoid', marginBottom: 10 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightbox({ src: item.src.replace('w=900', 'w=1600'), alt: item.collection })}
                >
                  <img
                    src={item.src}
                    alt={item.collection}
                    loading={i < 6 ? 'eager' : 'lazy'}
                    style={{
                      width: '100%',
                      aspectRatio: item.tall ? '3/4' : '4/3',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-[1.03]"
                  />
                  {/* Hover label */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                    style={{ background: 'linear-gradient(to top, rgba(14,14,12,0.45) 0%, transparent 60%)' }}
                  >
                    <span
                      className="font-sans text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.85)' }}
                    >
                      {item.collection}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <ViewToggle view="collection" onToggle={() => setView('dome')} />

      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
