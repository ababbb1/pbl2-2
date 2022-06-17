import Link from 'next/link'
import { ReactNode } from 'react'

interface FloatingButtonProps {
  path: string
  children: ReactNode
}

export default function FloatingButton({ path, children }: FloatingButtonProps) {
  return (
    <Link href={path}>
      <div className='fixed bottom-4 right-4 w-12 h-12 rounded-full bg-theme1 flex justify-center items-center shadow-sm lg:hidden'>
        {children}
      </div>
    </Link>
  )
}
