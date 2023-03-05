import clsx from 'clsx'
import React from 'react'

type AlertProps = {
  children: React.ReactNode
  className?: string
}

export default function Alert({ children, className }: AlertProps) {
  return (
    <div
      className={clsx(
        'rounded border-l-[6px] border-[#7b90c9] bg-white py-2 px-3',
        className
      )}>
      {children}
    </div>
  )
}
