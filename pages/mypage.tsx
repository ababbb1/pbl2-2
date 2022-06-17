import { signOut } from 'next-auth/react'
import Layout from '../components/layout'
import { getSession, GetSessionParams } from 'next-auth/react'

const Mypage = () => {
  const logoutHandler = () => {
    alert('로그아웃 되었습니다.')
    signOut({ callbackUrl: '/', redirect: true })
  }
  return (
    <Layout>
      <div className='w-full flex justify-center py-16'>
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
export async function getServerSideProps(ctx: GetSessionParams) {
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
      session: await getSession(ctx),
    },
  }
}
