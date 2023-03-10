type CardFooterProps = {
  children: React.ReactNode
}

export default function CardFooter({ children }: CardFooterProps) {
  return (
    <div className="ml-5 mr-8 border-t-2 border-[#b9c2d2] pt-3">{children}</div>
  )
}
