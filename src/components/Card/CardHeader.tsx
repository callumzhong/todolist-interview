import React from 'react'

type CardHeaderProps = {
  children: React.ReactNode
}

export default function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="ml-5 mr-8 mt-4 border-b-2 border-[#b9c2d2] pb-3">
      {children}
    </div>
  )
}
