import React from 'react'
import { motion } from 'framer-motion'

interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) {
  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 14 }}
      >
        {[0, 1].map((rep) => (
          <React.Fragment key={rep}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                style={{
                  padding: '22px 20px',
                  borderRadius: 14,
                  border: '1px solid rgba(26,26,26,0.10)',
                  background: '#ffffff',
                  width: 272,
                  flexShrink: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 13,
                    color: 'rgba(26,26,26,0.72)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                  <img
                    src={image}
                    alt={name}
                    style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: 12,
                        color: '#1A1A1A',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: 11,
                        color: 'rgba(26,26,26,0.40)',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
