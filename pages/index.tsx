import type { NextPage, NextPageContext } from 'next'
import Layout from '../components/layout'
import { useAuth } from '../libs/hooks'

const Home: NextPage = () => {
  return (
    <Layout canGoBack={false}>
      <div>Home</div>
    </Layout>
  )
}

export default Home
