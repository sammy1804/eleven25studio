import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

interface AccordionItem {
  id: string
  title: string
  sub: string
  href: string
  imageUrl: string
}

const items: AccordionItem[] = [
  {
    id: 'arch-photo',
    title: 'Architecture',
    sub: 'Photography',
    href: '/architecture',
    imageUrl:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'arch-films',
    title: 'Films',
    sub: 'Architecture & Corporate',
    href: '/films',
    imageUrl:
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'corporate',
    title: 'Corporate',
    sub: 'Photography & Clips',
    href: '/corporate',
    imageUrl:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'wedding',
    title: 'Wedding',
    sub: 'Photography',
    href: '/wedding',
    imageUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'fashion',
    title: 'Fashion',
    sub: 'Editorial',
    href: '/fashion',
    imageUrl:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'events',
    title: 'Events',
    sub: 'Coverage',
    href: '/events',
    imageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85&auto=format&fit=crop',
  },
]

interface ItemProps {
  item: AccordionItem
  isActive: boolean
  onMouseEnter: () => void
}

function AccordionPanel({ item, isActive, onMouseEnter }: ItemProps) {
  return (
    <Link
      to={item.href}
      className={`
        relative h-[500px] overflow-hidden cursor-pointer flex-shrink-0
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isActive ? 'w-[380px]' : 'w-[64px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isActive ? 'bg-[#111111]/30' : 'bg-[#111111]/55'
        }`}
      />

      {/* Active: bottom label */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#F2F0EB]/60 font-sans mb-1">
            {item.sub}
          </p>
          <div className="flex items-end justify-between">
            <p className="font-display text-[28px] font-light italic text-[#F2F0EB] leading-none">
              {item.title}
            </p>
            <div className="w-9 h-9 rounded-full border border-[#F2F0EB]/40 flex items-center justify-center">
              <ArrowUpRight size={14} className="text-[#F2F0EB]" />
            </div>
          </div>
        </div>
      )}

      {/* Inactive: rotated label */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span
            className="font-display text-[15px] font-light italic text-[#F2F0EB]/80 whitespace-nowrap"
            style={{ transform: 'rotate(90deg)' }}
          >
            {item.title}
          </span>
        </div>
      )}
    </Link>
  )
}

export default function InteractiveAccordion() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-row items-stretch gap-2 overflow-x-auto w-full p-1">
      {items.map((item, index) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  )
}
