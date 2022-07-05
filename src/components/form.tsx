import React from 'react'

export interface FormProps {
  onSubmit: () => void
  children: React.ReactNode
  className?: string
}

function Form({ children, onSubmit, className = '' }: FormProps) {
  return (
    <form
      noValidate
      className={`flex flex-col ${className}`}
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        onSubmit()
      }}
    >
      {children}
    </form>
  )
}

export default Form
