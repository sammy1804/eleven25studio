import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const PURPLE = '#A78BFA'
const BOUNCE = [0.34, 1.56, 0.64, 1] as const

export default function EventContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ event: '', date: '', email: '' })
  const isMobile = useIsMobile()
  const [submitHov, setSubmitHov] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // placeholder — wire to backend later
  }

  const inputStyle = {
    width: '100%',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #DDDBD7',
    padding: '12px 0',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    fontSize: 14,
    color: '#1A1A1A',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#AAAAAA',
    display: 'block',
    marginBottom: 4,
  }

  const fields = [
    { name: 'event', label: 'Event Name / Description', type: 'text', multiline: false },
    { name: 'date',  label: 'Event Date',                type: 'date', multiline: false },
    { name: 'email', label: 'Your Email',                type: 'email', multiline: false },
  ]

  return (
    <section
      ref={ref}
      style={{ background: '#ffffff', padding: 'clamp(5rem, 10vh, 9rem) clamp(1.5rem, 5vw, 5rem)' }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2.5rem' : 'clamp(3rem, 6vw, 8rem)',
          alignItems: 'start',
        }}
      >
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: BOUNCE }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: PURPLE, marginBottom: 20 }}>
            • Book Your Event
          </p>

          <div style={{ marginBottom: 28 }}>
            {["Next event", "coming up?", "Let's talk."].map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: BOUNCE }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 300,
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: '#1A1A1A',
                  }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: '#888888', maxWidth: 360, margin: 0 }}
          >
            We cover events of all scales across India. Early booking
            recommended for weddings, large conferences, and festivals.
          </motion.p>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15, ease: BOUNCE }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {fields.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.09, ease: BOUNCE }}
              >
                <label htmlFor={f.name} style={labelStyle}>{f.label}</label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  value={form[f.name as keyof typeof form]}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder=""
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.52, ease: BOUNCE }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <button
                type="submit"
                onMouseEnter={() => setSubmitHov(true)}
                onMouseLeave={() => setSubmitHov(false)}
                style={{
                  alignSelf: 'flex-start',
                  background: submitHov ? '#222222' : '#1A1A1A',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 40,
                  padding: '14px 32px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.2s',
                  transform: submitHov ? 'translateY(-2px)' : 'none',
                }}
              >
                Get in Touch →
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a
                  href="tel:+918660108065"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: '#888888', textDecoration: 'none' }}
                >
                  +91 86601 08065
                </a>
                <a
                  href="mailto:eleven25studios@gmail.com"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: '#888888', textDecoration: 'none' }}
                >
                  eleven25studios@gmail.com
                </a>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
