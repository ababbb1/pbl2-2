import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { apiErrorHandler, fetchList } from '../libs/client'
import PostCard from './postCard'
import { PencilIcon } from '@heroicons/react/outline'
import FloatingButton from '../components/floatingButton'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

const LOADING = 1
const LOADED = 2
const itemStatusMap: { [k: number]: any } = {}

const isItemLoaded = (index: number) => !!itemStatusMap[index]
const loadMoreItems = (startIndex: number, stopIndex: number) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADED
  }
}

export default function PostList(props: any) {
  const [list, setList] = useState(props.list)

  useEffect(() => {
    fetchList()
      .then((res) => {
        setList(res.data.result)
      })
      .catch((e) => {
        apiErrorHandler
      })
  }, [])

  const Row = ({ index, style }: { index: number; style: any; data: any }) => {
    return (
      <div
        className='ListItem'
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PostCard
          item={list[index]}
          token={props.session.accessToken as string}
          setList={setList}
        />
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-200 min-h-screen flex justify-center'>
      <div className='w-full'>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={list?.length}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  className='List'
                  height={height}
                  itemCount={list?.length}
                  itemSize={460}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                >
                  {Row}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
      <FloatingButton path={'/posting'}>
        <PencilIcon className='text-white w-6 h-6' />
      </FloatingButton>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const list = await fetchList()

  return {
    props: {
      session,
      list,
    },
  }
}
