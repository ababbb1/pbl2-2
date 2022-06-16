import React from 'react'
import Nav from './nav'

interface Props {
  children: JSX.Element
  canGoBack?: boolean
}

export default function Layout({ children, canGoBack = true }: Props) {
  return (
    <>
      <Nav canGoBack={canGoBack} />
      <main className='flex justify-center pt-12 lg:pt-16'>{children}</main>
    </>
  )
}
