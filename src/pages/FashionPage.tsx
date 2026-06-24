import FashionHero from '../components/fashion/FashionHero'
import EditorialGrid from '../components/fashion/EditorialGrid'
import FashionScrollStrip from '../components/fashion/FashionScrollStrip'
import BrandBento from '../components/fashion/BrandBento'
import FashionClips from '../components/fashion/FashionClips'
import FashionContactStrip from '../components/fashion/FashionContactStrip'

export default function FashionPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <FashionHero />
      <EditorialGrid />
      <FashionScrollStrip />
      <BrandBento />
      <FashionClips />
      <FashionContactStrip />
    </main>
  )
}
