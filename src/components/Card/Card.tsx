import clsx from 'clsx'
import React from 'react'

type CardProps = {
  children: React.ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div
      className={clsx(
        'mx-auto max-w-md bg-gradient-to-b from-[#EFF6FF] to-[#ECEDFF] py-5'
      )}>
      {children}
    </div>
  )
}
