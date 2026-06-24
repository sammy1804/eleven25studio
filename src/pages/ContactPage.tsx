import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const T = {
  bg:     '#F5F1EA',
  bgAlt:  '#EDEAE2',
  ink:    '#0E0E0C',
  muted:  '#8A847C',
  accent: '#B8956A',
  border: '#DDD8D0',
}

const SERVICES = [
  'Architecture Photography',
  'Interior Photography',
  'Exterior Photography',
  'Architectural Films',
  'Corporate Photography',
  'Brand Films',
  'Events Coverage',
  'Wedding Photography',
  'Fashion Photography',
  'Workshop / Collaboration',
  'Other',
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New Enquiry — ${form.service || 'General'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
    )
    window.location.href = `mailto:eleven25studios@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: '#fff',
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    fontFamily: "'Open Runde', sans-serif",
    fontSize: 14,
    color: T.ink,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Open Runde', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: T.muted,
    display: 'block',
    marginBottom: 8,
  }

  return (
    <main style={{ background: T.bg, minHeight: '100vh' }}>

      {/* ══ HEADER ══ */}
      <section style={{ padding: 'clamp(7rem, 14vh, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vh, 5rem)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: T.accent }}>
              Get In Touch
            </p>
            <h1
              className="font-display font-light"
              style={{ fontSize: 'clamp(40px, 7vw, 96px)', color: T.ink, lineHeight: 1.05, letterSpacing: '-0.01em' }}
            >
              Let's start a<br />conversation.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTENT ══ */}
      <section style={{ padding: 'clamp(3rem, 6vh, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(3rem, 6vw, 8rem)',
            alignItems: 'start',
          }}
        >

          {/* ── Contact details ── */}
          <div>
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: T.accent }}>
                Contact Details
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={14} style={{ color: T.accent, flexShrink: 0 }} />
                    <p className="font-sans text-[11px] tracking-widest uppercase" style={{ color: T.muted }}>Phone</p>
                  </div>
                  <a
                    href="tel:+918660108065"
                    className="font-sans text-[22px] font-light transition-colors duration-200"
                    style={{ color: T.ink, textDecoration: 'none', letterSpacing: '-0.01em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.ink)}
                  >
                    +91 86601 08065
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={14} style={{ color: T.accent, flexShrink: 0 }} />
                    <p className="font-sans text-[11px] tracking-widest uppercase" style={{ color: T.muted }}>Email</p>
                  </div>
                  <a
                    href="mailto:eleven25studios@gmail.com"
                    className="font-sans text-[18px] md:text-[20px] font-light transition-colors duration-200 break-all"
                    style={{ color: T.ink, textDecoration: 'none', letterSpacing: '-0.01em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.ink)}
                  >
                    eleven25studios@gmail.com
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={14} style={{ color: T.accent, flexShrink: 0 }} />
                    <p className="font-sans text-[11px] tracking-widest uppercase" style={{ color: T.muted }}>Location</p>
                  </div>
                  <p className="font-sans text-[18px] font-light" style={{ color: T.ink, letterSpacing: '-0.01em' }}>
                    Bangalore, India
                  </p>
                  <p className="font-sans text-[13px] mt-1" style={{ color: T.muted }}>
                    Available across India &amp; internationally
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Socials */}
            <Reveal delay={0.1}>
              <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: `1px solid ${T.border}` }}>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: T.muted }}>
                  Social Media
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: 'Instagram', href: 'https://www.instagram.com/eleven25studios' },
                    { label: 'LinkedIn',  href: 'https://linkedin.com' },
                  ].map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-[15px] font-medium transition-colors duration-200"
                      style={{ color: T.ink, textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                      onMouseLeave={e => (e.currentTarget.style.color = T.ink)}
                    >
                      {link.label} <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Contact form ── */}
          <Reveal delay={0.1}>
            {submitted ? (
              <div
                style={{
                  padding: '3rem',
                  background: T.bgAlt,
                  border: `1px solid ${T.border}`,
                  borderRadius: 4,
                  textAlign: 'center',
                }}
              >
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: T.accent }}>
                  Message Sent
                </p>
                <p className="font-display font-light text-[28px]" style={{ color: T.ink }}>
                  Thank you. We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: T.accent }}>
                  Send a Message
                </p>

                {/* Name + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = T.accent)}
                      onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Studio / Company"
                      value={form.company}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = T.accent)}
                      onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                    />
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = T.accent)}
                      onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = T.accent)}
                      onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label style={labelStyle}>Service Required *</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const }}
                    onFocus={e => (e.currentTarget.style.borderColor = T.accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project…"
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={e => (e.currentTarget.style.borderColor = T.accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                  />
                </div>

                <button
                  type="submit"
                  className="font-sans text-[12px] tracking-widest uppercase font-medium px-8 py-4 transition-colors duration-200 text-left"
                  style={{ background: T.ink, color: '#F5F1EA', border: 'none', cursor: 'pointer', width: 'fit-content' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = T.ink)}
                >
                  Send Message →
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

    </main>
  )
}
