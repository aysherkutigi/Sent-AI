import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={`font-medium rounded-lg transition-colors ${className}`}
      {...props}
    />
  )
}
