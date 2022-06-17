import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { RefreshTokenHandler } from '../components/util/refreshTokenHandler'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [interval, setInterval] = useState(0)
  return (
    <SessionProvider session={session} refetchInterval={interval}>
      {/* {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )} */}
      <Component {...pageProps} />
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  )
}

// 클라이언트에서 세션 정보를 요청하여 응답에 따라 redirect 할 수 있도록 하는 컴포넌트입니다.
// 이 컴포넌트에 권한이 필요한 페이지의 컴포넌트를 자식으로 추가합니다.
// function Auth({ children }: {children: JSX.Element}) {
//   console.log('This component need auth')
//   const { status } = useSession()
//   const router = useRouter()

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   if (status === 'unauthenticated' && router.route !== '/login') router.replace('/login')

//   if (status === 'authenticated' && router.route === '/login' || router.route === '/join') router.replace('/')
//   return children
// }

