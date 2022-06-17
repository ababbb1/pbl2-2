import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { API_DOMAIN, contentTypeHeaders } from '../../../libs/client'
import type { JWT } from 'next-auth/jwt'

//토큰을 받아서 업데이트된 새로운 'accessToken' 토큰과 'accessTokenExpires'를 반환합니다.
//오류가 발생하면 이전 토큰과 오류 속성을 반환합니다.
async function refreshAccessToken(tokenObj: JWT) {
  try {
    const res = await axios({
      url: `${API_DOMAIN}/api/token`,
      method: 'post',
      headers: contentTypeHeaders,
    })

    const refreshedToken = await res.data.result.refreshToken

    if (!res.data.result.success) {
      throw refreshedToken
    }

    return {
      ...tokenObj,
      accessToken: refreshedToken.accessToken,
      accessTokenExpiresAt: Date.now() + refreshedToken.accessTokenExpiresAt * 1000,
      refreshToken: refreshedToken.refresh_token ?? tokenObj.refreshToken,
    }
  } catch (error) {
    console.log(error)

    return {
      ...tokenObj,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios({
            method: 'post',
            url: `${API_DOMAIN}/api/login`,
            data: { email: credentials?.email, password: credentials?.password },
            headers: contentTypeHeaders,
          })

          const result = res.data.result
          if (result.accessToken) return result
          else return null
        } catch (e: any) {
          throw Error(e)
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        // 로그인 시에만 실행됩니다.
        token.accessToken = user.accessToken
        token.accessTokenExpiresAt = user.accessTokenExpiresAt
        token.refreshToken = user.refreshToken
      }

      const shouldRefreshTime = Math.round(token.accessTokenExpiresAt - Date.now())

      // 아직 유효 시간이 지나지 않았다면 토큰을 그대로 반환합니다.
      if (shouldRefreshTime > 0) {
        return Promise.resolve(token)
      }

      // 유효 시간이 지났다면 새 토큰을 요청하여 반환합니다.
      token = refreshAccessToken(token)
      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      console.log(token)
      session.accessToken = token.accessToken
      session.accessTokenExpiresAt = token.accessTokenExpiresAt
      session.error = token.error

      return Promise.resolve(session)
    },
  },
})
