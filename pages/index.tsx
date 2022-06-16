import type { NextPage } from 'next'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout canGoBack={false}>
      <div>Home</div>
    </Layout>
  )
}

export default Home
