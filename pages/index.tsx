import type { NextPage, NextPageContext } from 'next'
import Layout from '../components/layout'
import PostList from '../components/postList'
import { useAuth } from '../libs/hooks'

const Home: NextPage = () => {
  return (
    <Layout canGoBack={false}>
      <PostList />
    </Layout>
  )
}

export default Home
