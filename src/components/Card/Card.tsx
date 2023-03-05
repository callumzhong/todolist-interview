import clsx from 'clsx'
import React from 'react'

type CardProps = {
  children: React.ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div
      className={clsx(
        'p-5 mx-auto bg-gradient-to-b from-zumthor to-titan-white'
      )}>
      {children}
    </div>
  )
}
