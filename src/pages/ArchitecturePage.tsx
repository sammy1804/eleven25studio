import ArchHero from '../components/architecture/ArchHero'
import ExteriorScroll from '../components/architecture/ExteriorScroll'
import InteriorMasonry from '../components/architecture/InteriorMasonry'
import ArchGallerySection from '../components/architecture/ArchGallerySection'
import FilmGrid from '../components/architecture/FilmGrid'
import ArchContactStrip from '../components/architecture/ArchContactStrip'

export default function ArchitecturePage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ArchHero />
      <ExteriorScroll />
      <InteriorMasonry />
      <ArchGallerySection />
      <FilmGrid />
      <ArchContactStrip />
    </main>
  )
}
