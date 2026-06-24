import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#1C1814' }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-20 pb-10">

        {/* Top */}
        <div
          className="flex flex-col md:flex-row justify-between gap-12 pb-16"
          style={{ borderBottom: '1px solid rgba(253,252,250,0.08)' }}
        >
          <div className="max-w-xs">
            <div
              className="font-display text-[36px] md:text-[44px] font-light italic mb-4 leading-none"
              style={{ color: '#FDFCFA' }}
            >
              Eleven<span className="font-medium not-italic">25</span>
            </div>
            <p className="font-sans text-[14px] leading-relaxed mb-6" style={{ color: '#8A847C' }}>
              Architecture, Photography, Films & Experiences — crafted with intention under one creative studio.
            </p>
            <p className="font-sans text-[12px] tracking-wider uppercase" style={{ color: '#B8956A' }}>
              Bangalore, India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[13px]">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8A847C' }}>Studio</p>
              <nav className="flex flex-col gap-3">
                {[
                  { label: 'Architecture', to: '/architecture' },
                  { label: 'Films', to: '/films' },
                  { label: 'Corporate', to: '/corporate' },
                  { label: 'Gallery', to: '/gallery' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="nav-link transition-colors duration-200"
                    style={{ color: 'rgba(253,252,250,0.5)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FDFCFA')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,252,250,0.5)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8A847C' }}>More</p>
              <nav className="flex flex-col gap-3">
                {[
                  { label: 'Weddings', to: '/wedding' },
                  { label: 'Fashion', to: '/fashion' },
                  { label: 'Events', to: '/events' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="nav-link transition-colors duration-200"
                    style={{ color: 'rgba(253,252,250,0.5)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FDFCFA')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,252,250,0.5)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8A847C' }}>Contact</p>
              <nav className="flex flex-col gap-3">
                <a
                  href="tel:+918660108065"
                  className="transition-colors duration-200"
                  style={{ color: 'rgba(253,252,250,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FDFCFA')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,252,250,0.5)')}
                >
                  +91 86601 08065
                </a>
                <a
                  href="mailto:eleven25studios@gmail.com"
                  className="transition-colors duration-200"
                  style={{ color: 'rgba(253,252,250,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FDFCFA')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,252,250,0.5)')}
                >
                  eleven25studios@gmail.com
                </a>
              </nav>
            </div>

            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8A847C' }}>Follow</p>
              <nav className="flex flex-col gap-3">
                {[
                  { label: 'Instagram', href: 'https://instagram.com' },
                  { label: 'LinkedIn', href: 'https://linkedin.com' },
                  { label: 'YouTube', href: 'https://youtube.com' },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200"
                    style={{ color: 'rgba(253,252,250,0.5)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FDFCFA')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,252,250,0.5)')}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8">
          <p className="font-sans text-[11px] tracking-wide" style={{ color: '#4A4540' }}>
            © {new Date().getFullYear()} Eleven25 Studios. All rights reserved.
          </p>
          <p className="font-sans text-[11px] tracking-widest uppercase" style={{ color: '#4A4540' }}>
            Architecture · Photography · Film · Events
          </p>
        </div>
      </div>
    </footer>
  )
}
