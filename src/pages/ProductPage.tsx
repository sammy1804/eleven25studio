import ProductHero from '../components/product/ProductHero'
import CommercialGrid from '../components/product/CommercialGrid'
import EcommerceShowcase from '../components/product/EcommerceShowcase'
import ProductFilms from '../components/product/ProductFilms'
import ServicesBreakdown from '../components/product/ServicesBreakdown'
import ProductContactCTA from '../components/product/ProductContactCTA'

export default function ProductPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <ProductHero />
      <CommercialGrid />
      <EcommerceShowcase />
      <ProductFilms />
      <ServicesBreakdown />
      <ProductContactCTA />
    </main>
  )
}
