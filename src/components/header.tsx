type HeaderProps = {
  label?: string
  progressPercent?: string
}

const Header = ({ label, progressPercent }: HeaderProps) => (
  <div className='relative flex items-end h-[80px] w-full'>
    {label && <div className='mb-[14px] ml-[20px] font-bold'>{label}</div>}

    {progressPercent && (
      <div className='absolute bottom-0 bg-[#E5E5E5] w-full h-[3px]'>
        <div className='bg-black h-[3px]' style={{ width: progressPercent }} />
      </div>
    )}
  </div>
)

export default Header
