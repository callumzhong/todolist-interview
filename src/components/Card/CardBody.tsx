type CardBodyProps = {
  children: React.ReactNode
}

export default function CardBody({ children }: CardBodyProps) {
  return <div className="py-5">{children}</div>
}
