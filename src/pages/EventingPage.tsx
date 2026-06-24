import EventHero from '../components/eventing/EventHero'
import EventPhotoGrid from '../components/eventing/EventPhotoGrid'
import EventVideoStrip from '../components/eventing/EventVideoStrip'
import EventTypeList from '../components/eventing/EventTypeList'
import EventContactCTA from '../components/eventing/EventContactCTA'

export default function EventingPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <EventHero />
      <EventPhotoGrid />
      <EventVideoStrip />
      <EventTypeList />
      <EventContactCTA />
    </main>
  )
}
