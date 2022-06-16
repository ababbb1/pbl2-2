import { UseFormRegisterReturn } from 'react-hook-form'
import { cls } from '../utils'

interface InputProps {
  type: React.HTMLInputTypeAttribute | undefined
  label?: string
  placeholder?: string
  register?: UseFormRegisterReturn
  style?: string
  invalid?: any
}

export default function FormInput({
  type,
  label,
  placeholder,
  register,
  style,
  invalid,
}: InputProps) {
  return (
    <div className='w-full'>
      {label ? <p className='mx-1 my-1'>{label}</p> : null}
      <input
        ref={null}
        type={type}
        placeholder={placeholder || ''}
        {...register}
        className={`${cls(
          'w-full h-12 border rounded-md p-2',
          invalid
            ? 'border-red-400 focus:outline-red-400'
            : 'border-gray-300 focus:outline-gray-500',
        )}`}
      />
    </div>
  )
}
