import React from 'react'

function Span({ children, className, onClick }:any) {
  return (
    <span onClick={onClick} className={className}>{children}</span>
  )
}

export default Span;