import * as React from 'react'
import { motion } from 'framer-motion'

interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number
  gap?: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ columns = 3, gap = 4, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          columnCount: columns,
          columnGap: `${gap * 0.25}rem`,
          ...style,
        }}
        {...props}
      >
        {React.Children.map(children, (child) => (
          <motion.div
            style={{ marginBottom: `${gap * 0.25}rem`, breakInside: 'avoid' }}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    )
  }
)

MasonryGrid.displayName = 'MasonryGrid'
