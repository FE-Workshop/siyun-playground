import { UseFormRegister, FieldValues, Path } from 'react-hook-form'

type InputLabelProps<T extends FieldValues> = {
  label: string
  item: Path<T>
  placeholder?: string
  error?: string
  register: UseFormRegister<T>
}

const InputLabel = <T extends FieldValues>({
  label,
  item,
  placeholder,
  error,
  register,
}: InputLabelProps<T>) => {
  return (
    <div>
      <div className='text-[#5C5C5C] mb-3 font-bold'>{label}</div>
      <input
        type='text'
        id={item}
        autoComplete='off'
        className={`border-b border-gray-300 w-full px-1.5 py-2 text-xl placeholder-[#C9C9C9] focus:outline-none text-[#2c2c2c] ${
          error && 'border-[#F53335]'
        }`}
        placeholder={placeholder}
        {...register(item)}
      />
      {error && (
        <div className='text-[#F53335] font-semibold mt-2 px-1.5'>{error}</div>
      )}
    </div>
  )
}

export default InputLabel
