import { useState, lazy, Suspense, Component, ReactNode } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import ArchitecturePage from './pages/ArchitecturePage'
import FilmsPage from './pages/FilmsPage'
import CorporatePage from './pages/CorporatePage'
import CategoryPage from './pages/CategoryPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'

// Lazy-load gallery so a WebGL crash can't affect the rest of the app
const GalleryPage = lazy(() => import('./pages/GalleryPage'))

// Error boundary isolates gallery WebGL failures
class GalleryErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) {
      return (
        <main className="bg-[#111111] min-h-screen flex items-center justify-center">
          <p className="font-sans text-[#7A7A72] text-sm">Gallery unavailable — WebGL not supported on this device.</p>
        </main>
      )
    }
    return this.props.children
  }
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] }

// Routes where Footer and page transitions are suppressed
const NO_FOOTER_ROUTES = ['/', '/gallery']

function AnimatedRoutes() {
  const location = useLocation()
  const hideFooter = NO_FOOTER_ROUTES.includes(location.pathname)

  // Gallery is full-bleed fixed — skip page transition wrapper so it fills viewport cleanly
  if (location.pathname === '/gallery') {
    return (
      <GalleryErrorBoundary>
        <Suspense fallback={
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F1EA' }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5AFA8' }}>Loading…</p>
          </div>
        }>
          <GalleryPage />
        </Suspense>
      </GalleryErrorBoundary>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/wedding" element={<CategoryPage />} />
          <Route path="/fashion" element={<CategoryPage />} />
          <Route path="/events" element={<CategoryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        {!hideFooter && <Footer />}
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <BrowserRouter>
          <Nav />
          <AnimatedRoutes />
        </BrowserRouter>
      )}
    </>
  )
}
