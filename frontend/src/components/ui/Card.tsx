import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-200'

    const variantStyles = {
      default: 'bg-white shadow-md',
      elevated: 'bg-white shadow-lg hover:shadow-xl',
      outlined: 'bg-transparent border border-gray-200',
    }

    const computedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

    return (
      <div
        ref={ref}
        className={computedClassName}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export default Card
