type LayoutProps = {
  children: React.ReactNode
}

const MobileLayout = ({ children }: LayoutProps) => (
  <div className='flex justify-center pt-[50px]'>
    <div className='w-[410px] h-[900px]  shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl  '>
      {children}
    </div>
  </div>
)

export default MobileLayout
