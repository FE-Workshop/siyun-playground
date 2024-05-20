type InfoProps = {
  label: string
  info: { label: string; value: string | null }[]
}

const Info = ({ label, info }: InfoProps) => (
  <div className='flex flex-col gap-5 border-b-[2px] border-[#F7F7F7] pb-[30px]'>
    <div className='font-bold text-lg'>{label}</div>

    <div className='flex flex-col gap-2'>
      {info.map(({ label, value }) => {
        return (
          <div key={label} className='flex'>
            <div className=' text-[#797979] w-[100px]'>{label}</div>
            <div>{value}</div>
          </div>
        )
      })}
    </div>
  </div>
)

export default Info
