import AboutOpening from '../components/about/AboutOpening'
import AboutStory from '../components/about/AboutStory'
import AboutStats from '../components/about/AboutStats'
import AboutDisciplines from '../components/about/AboutDisciplines'
import AboutFilms from '../components/about/AboutFilms'
import AboutPress from '../components/about/AboutPress'
import AboutCollaborate from '../components/about/AboutCollaborate'

export default function AboutPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <AboutOpening />
      <AboutStory />
      <AboutStats />
      <AboutDisciplines />
      <AboutFilms />
      <AboutPress />
      <AboutCollaborate />
    </main>
  )
}
