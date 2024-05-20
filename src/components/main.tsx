type MainProps = {
  children: React.ReactNode
}

const Main = ({ children }: MainProps) => (
  <div className='h-[710px] py-[30px] px-[20px]'>{children}</div>
)

export default Main
