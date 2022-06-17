import { signOut, getSession } from 'next-auth/react'
import Layout from '../components/layout'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import jwtDecode from 'jwt-decode'

const Mypage = ({ session }: { session: Session }) => {
  const user: any = jwtDecode(session.accessToken as string)
  const logoutHandler = () => {
    alert('로그아웃 되었습니다.')
    signOut({ callbackUrl: '/', redirect: true })
  }

  return (
    <Layout>
      <div className='w-full flex flex-col items-center gap-10 py-16'>
      <span>{`${user.nickname} 님`}</span>
        <div className='w-24'>
          <button
            onClick={logoutHandler}
            className='w-full h-8 bg-white text-theme1 text-sm border border-theme1'
          >
            로그아웃
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Mypage

//서버 사이드에서 세션이 유지되고 있는지 확인 후 결과에 따라 redirect 합니다.
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }

  return {
    props: {
      session,
    },
  }
}
