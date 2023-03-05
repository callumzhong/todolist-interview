import React from 'react'

type CardHeaderProps = {
  children: React.ReactNode
}

export default function CardHeader({ children }: CardHeaderProps) {
  return <div className="border-b-2 border-[#b9c2d2] pb-3">{children}</div>
}
