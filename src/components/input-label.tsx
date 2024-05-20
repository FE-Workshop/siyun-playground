type InputLabelProps = {
  label: string
  id: string
  placeholder?: string
  value: string
  error?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputLabel = ({
  label,
  id,
  placeholder,
  value,
  error,
  onChange,
}: InputLabelProps) => {
  return (
    <div>
      <div className='text-[#5C5C5C] mb-3 font-bold'>{label}</div>
      <input
        type='text'
        id={id}
        autoComplete='off'
        className={`border-b border-gray-300 w-full px-1.5 py-2 text-xl placeholder-[#C9C9C9] focus:outline-none text-[#2c2c2c] ${
          error && 'border-[#F53335]'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className='text-[#F53335] font-semibold mt-2 px-1.5'>{error}</div>
      )}
    </div>
  )
}

export default InputLabel
