import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function useAuth(shouldRedirect: boolean = true) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      alert('인증에 실패했습니다. 다시 로그인해주세요.')
      signOut({ callbackUrl: '/login', redirect: shouldRedirect })
    }

    if (!session) {
      if (router.route !== '/login' && router.route !== '/' && router.route !== '/join') {
        router.replace('/login')
      }
      setIsAuthenticated(false)
    } else {
      if (router.route === '/login' || router.route === '/join') {
        router.replace('/')
      }
      setIsAuthenticated(true)
    }
  }, [session])

  return { isAuth: isAuthenticated, loading: status === 'loading' }
}
