import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  // const url = await req.nextUrl.clone()
  // const path = url.pathname
  // const session = await getSession({ req })
  // if (path === '/' || path === '/login' || path === '/join') {
  //   if (session) return NextResponse.redirect(`${url.origin}`)
  // } else {
  //   if (!session) return NextResponse.redirect(`${url.origin}/login`)
  // }
  // return NextResponse.next()
}
