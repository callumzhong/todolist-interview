import clsx from 'clsx'

type CardBodyProps = {
  children: React.ReactNode
  className?: string
}

export default function CardBody({ children, className }: CardBodyProps) {
  return <div className={clsx('py-5', className)}>{children}</div>
}
