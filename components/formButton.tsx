import { cls } from '../utils'

interface Props {
  children: string
  type?: 'button' | 'submit'
  bgColor?: string
  border?: string
  textColor?: string
}

export default function FormButton({
  children,
  type = 'button',
  bgColor = 'bg-theme1',
  border = '',
  textColor = 'text-white',
}: Props) {
  return (
    <button
      ref={null}
      type={type}
      className={`${cls('w-full h-12 rounded-md select-none', bgColor, border, textColor)}`}
    >
      {children}
    </button>
  )
}
