import React from 'react'
import './buttons.scss'

export const Button = ({ className, onClick, children }) => {
  return (
    <button 
        className={`btn ${className}`} 
        onClick={onClick ? () => onClick() : null}
    >
        {children}
    </button>
  )
}

export const OutlineButton = ({ className, onClick, children }) => {
    return (
      <Button
        className={`btn-outline ${className}`} 
        onClick={onClick ? () => onClick() : null}
      >
        {children}
      </Button>
    )
  }

export default Button