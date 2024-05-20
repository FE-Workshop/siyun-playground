type FooterProps = {
  children: React.ReactNode
}

const Footer = ({ children }: FooterProps) => (
  <div className='relative h-[60px]'>
    <div className='absolute  left-1/2 transform -translate-x-1/2 '>
      {children}
    </div>
  </div>
)

export default Footer
