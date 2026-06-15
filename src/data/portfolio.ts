export type Category =
  | 'architecture'
  | 'films'
  | 'corporate'
  | 'wedding'
  | 'fashion'
  | 'events'

export interface PortfolioItem {
  id: string
  category: Category
  src: string
  alt: string
  aspectRatio?: 'landscape' | 'portrait' | 'square'
  isFilm?: boolean
  title?: string
}

export const architectureItems: PortfolioItem[] = [
  {
    id: 'arch-1',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=85&auto=format&fit=crop',
    alt: 'Concrete modernist building at golden hour',
    aspectRatio: 'landscape',
  },
  {
    id: 'arch-2',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=85&auto=format&fit=crop',
    alt: 'White minimal architecture facade',
    aspectRatio: 'portrait',
  },
  {
    id: 'arch-3',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
    alt: 'Luxury modern home exterior',
    aspectRatio: 'landscape',
  },
  {
    id: 'arch-4',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop',
    alt: 'Contemporary residential architecture',
    aspectRatio: 'portrait',
  },
  {
    id: 'arch-5',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1400&q=85&auto=format&fit=crop',
    alt: 'Dramatic interior architecture with natural light',
    aspectRatio: 'landscape',
  },
  {
    id: 'arch-6',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=900&q=85&auto=format&fit=crop',
    alt: 'Steel and glass architectural bridge',
    aspectRatio: 'portrait',
  },
  {
    id: 'arch-7',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1400&q=85&auto=format&fit=crop',
    alt: 'Reflective glass skyscraper facade',
    aspectRatio: 'landscape',
  },
  {
    id: 'arch-8',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=900&q=85&auto=format&fit=crop',
    alt: 'Urban cityscape with modern towers',
    aspectRatio: 'portrait',
  },
  {
    id: 'arch-9',
    category: 'architecture',
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=85&auto=format&fit=crop',
    alt: 'Geometric architecture from aerial view',
    aspectRatio: 'square',
  },
]

export const filmItems: PortfolioItem[] = [
  {
    id: 'film-1',
    category: 'films',
    src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1400&q=85&auto=format&fit=crop',
    alt: 'Architecture film — The Concrete Canvas',
    aspectRatio: 'landscape',
    isFilm: true,
    title: 'The Concrete Canvas',
  },
  {
    id: 'film-2',
    category: 'films',
    src: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1400&q=85&auto=format&fit=crop',
    alt: 'Architecture film — Light & Shadow',
    aspectRatio: 'landscape',
    isFilm: true,
    title: 'Light & Shadow',
  },
  {
    id: 'film-3',
    category: 'films',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85&auto=format&fit=crop',
    alt: 'Architecture film — Skyward',
    aspectRatio: 'landscape',
    isFilm: true,
    title: 'Skyward',
  },
  {
    id: 'film-4',
    category: 'films',
    src: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1400&q=85&auto=format&fit=crop',
    alt: 'Architecture film — Museum Studies',
    aspectRatio: 'landscape',
    isFilm: true,
    title: 'Museum Studies',
  },
]

export const corporateItems: PortfolioItem[] = [
  {
    id: 'corp-1',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=85&auto=format&fit=crop',
    alt: 'Corporate team in modern office',
    aspectRatio: 'landscape',
  },
  {
    id: 'corp-2',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=85&auto=format&fit=crop',
    alt: 'Professional business environment',
    aspectRatio: 'portrait',
  },
  {
    id: 'corp-3',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85&auto=format&fit=crop',
    alt: 'Executive team presentation',
    aspectRatio: 'landscape',
  },
  {
    id: 'corp-4',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85&auto=format&fit=crop',
    alt: 'Business meeting in glass office',
    aspectRatio: 'portrait',
  },
  {
    id: 'corp-5',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=85&auto=format&fit=crop',
    alt: 'Corporate team collaboration',
    aspectRatio: 'landscape',
  },
  {
    id: 'corp-6',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&auto=format&fit=crop',
    alt: 'Modern open-plan office interior',
    aspectRatio: 'portrait',
  },
  {
    id: 'corp-clip-1',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=85&auto=format&fit=crop',
    alt: 'Corporate film — Brand Story',
    aspectRatio: 'landscape',
    isFilm: true,
    title: 'Brand Story — Nexus Group',
  },
  {
    id: 'corp-clip-2',
    category: 'corporate',
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=85&auto=format&fit=crop',
    alt: 'Corporate film — Leadership',
    aspectRatio: 'landscape',
    isFilm: true,
    title: 'Leadership Series',
  },
]

export const weddingItems: PortfolioItem[] = [
  {
    id: 'wed-1',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85&auto=format&fit=crop',
    alt: 'Bride and groom at ceremony',
    aspectRatio: 'portrait',
  },
  {
    id: 'wed-2',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=85&auto=format&fit=crop',
    alt: 'Wedding couple portrait',
    aspectRatio: 'landscape',
  },
  {
    id: 'wed-3',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=85&auto=format&fit=crop',
    alt: 'Wedding venue decoration',
    aspectRatio: 'portrait',
  },
  {
    id: 'wed-4',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1511795409834-432f7b1728b2?w=1400&q=85&auto=format&fit=crop',
    alt: 'Joyful wedding celebration',
    aspectRatio: 'landscape',
  },
  {
    id: 'wed-5',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=85&auto=format&fit=crop',
    alt: 'Wedding flowers and details',
    aspectRatio: 'portrait',
  },
  {
    id: 'wed-6',
    category: 'wedding',
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1400&q=85&auto=format&fit=crop',
    alt: 'Golden hour wedding portrait',
    aspectRatio: 'landscape',
  },
]

export const fashionItems: PortfolioItem[] = [
  {
    id: 'fash-1',
    category: 'fashion',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85&auto=format&fit=crop',
    alt: 'Fashion editorial outdoor',
    aspectRatio: 'portrait',
  },
  {
    id: 'fash-2',
    category: 'fashion',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85&auto=format&fit=crop',
    alt: 'High fashion editorial',
    aspectRatio: 'portrait',
  },
  {
    id: 'fash-3',
    category: 'fashion',
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=85&auto=format&fit=crop',
    alt: 'Fashion lifestyle editorial',
    aspectRatio: 'landscape',
  },
  {
    id: 'fash-4',
    category: 'fashion',
    src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85&auto=format&fit=crop',
    alt: 'Model in urban setting',
    aspectRatio: 'portrait',
  },
  {
    id: 'fash-5',
    category: 'fashion',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&q=85&auto=format&fit=crop',
    alt: 'Fashion portrait studio',
    aspectRatio: 'landscape',
  },
  {
    id: 'fash-6',
    category: 'fashion',
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85&auto=format&fit=crop',
    alt: 'Editorial fashion lookbook',
    aspectRatio: 'portrait',
  },
]

export const eventItems: PortfolioItem[] = [
  {
    id: 'evt-1',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=85&auto=format&fit=crop',
    alt: 'Live event concert atmosphere',
    aspectRatio: 'landscape',
  },
  {
    id: 'evt-2',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=85&auto=format&fit=crop',
    alt: 'Corporate gala event',
    aspectRatio: 'landscape',
  },
  {
    id: 'evt-3',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=85&auto=format&fit=crop',
    alt: 'Conference and speaker event',
    aspectRatio: 'portrait',
  },
  {
    id: 'evt-4',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=85&auto=format&fit=crop',
    alt: 'Evening social event',
    aspectRatio: 'landscape',
  },
  {
    id: 'evt-5',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=85&auto=format&fit=crop',
    alt: 'Music festival crowd',
    aspectRatio: 'portrait',
  },
  {
    id: 'evt-6',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1400&q=85&auto=format&fit=crop',
    alt: 'Award ceremony event',
    aspectRatio: 'landscape',
  },
]
