import { PlusIcon, XIcon } from '@heroicons/react/outline'
import axios, { AxiosRequestConfig } from 'axios'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import ErrorMessage from '../../components/errorMessage'
import FormButton from '../../components/formButton'
import Layout from '../../components/layout'
import SelectPostLayout from '../../components/selectPostLayout'
import { apiErrorHandler, API_DOMAIN, authHeaders, contentTypeHeaders } from '../../libs/client'
import { LayoutType, PostForm } from '../../libs/types'
import { cls } from '../../libs/utils'

export default function Posting({ session }: { session: Session }) {
  const { register, handleSubmit, watch, resetField, setValue, getValues, formState } =
    useForm<PostForm>({ mode: 'onChange' })

  const router = useRouter()
  const contentResetBtn = useRef<HTMLDivElement>(null)
  const token = session.accessToken

  const [previewImg, setPreviewImg] = useState('')
  const [layoutState, setLayoutState] = useState<LayoutType>('default')
  const [contentResetBtnState, setContentResetBtnState] = useState<'flex' | 'hidden'>('hidden')
  const images = watch('images')

  useEffect(() => {
    if (images && images.length > 0) {
      const file: any = images[0]
      setPreviewImg(URL.createObjectURL(file))
    }
  }, [images])

  const onValid: SubmitHandler<PostForm> = (data: PostForm) => {
    const formData = new FormData()
    formData.append('content', data.content)
    formData.append('image', data.images[0])
    formData.append('layout', data.layout)

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${API_DOMAIN}/api/post`,
      data: formData,
      headers: Object.assign(contentTypeHeaders, authHeaders(token as string)),
    }
    console.log(authHeaders(token as string))

    axios(config)
      .then(() => {
        alert(`게시글이 등록되었습니다.`)
        router.replace('/')
      })
      .catch(apiErrorHandler)
  }

  const handleImageResetBtn = () => {
    setPreviewImg('')
    resetField('images')
  }

  const handleContentResetBtn = () => {
    resetField('content')
    setContentResetBtnState('hidden')
  }

  const handleContentChange = () => {
    watch('content') ? setContentResetBtnState('flex') : setContentResetBtnState('hidden')
  }

  return (
    <Layout>
    <form
      onSubmit={handleSubmit(onValid)}
      className='flex flex-col items-center gap-6 px-4 py-16 w-full md:max-w-md'
    >
      <div className='w-full flex flex-col items-center gap-2'>
        <ErrorMessage message={formState.errors.layout?.message} />
        <SelectPostLayout
          register={register('layout', {
            required: '레이아웃을 선택해주세요.',
          })}
          setLayoutState={setLayoutState}
        />
      </div>

      <div
        className={cls(
          'flex gap-4 w-full min-h-[20rem]',
          layoutState === 'default' ? 'flex-col' : layoutState === 'left' ? 'flex-row-reverse' : '',
        )}
      >
        <div className='w-full relative'>
          <textarea
            placeholder='무슨 생각을 하고 계신가요?'
            className={cls(
              'w-full h-full min-h-[8rem] md:min-h-[12rem] resize-none py-5 px-7 border rounded-md',
              formState.errors.content
                ? 'border-red-400 focus:outline-red-400'
                : 'border-gray-300 focus:outline-gray-500',
            )}
            {...register('content', {
              required: true,
              onChange: handleContentChange,
            })}
          />
          <div
            ref={contentResetBtn}
            onClick={handleContentResetBtn}
            className={cls(
              contentResetBtnState,
              'absolute w-5 h-5 top-2 right-2 bg-slate-200 rounded-full shadow-sm justify-center items-center hover:cursor-pointer',
            )}
          >
            <XIcon className='w-4 h-4 text-slate-600' />
          </div>
        </div>

        <div className='w-full border h-[40vh] border-gray-300 rounded-md p-2'>
          <div className='w-full h-full max-h-[20rem]'>
            {previewImg ? (
              <div className='h-full w-full relative'>
                <Image src={previewImg} alt='preview-img' layout='fill' className='rounded-md' />
                <div
                  onClick={handleImageResetBtn}
                  className='absolute w-5 h-5 top-2 right-2 bg-slate-200 rounded-full shadow-sm flex justify-center items-center hover:cursor-pointer'
                >
                  <XIcon className='w-4 h-4 text-slate-600' />
                </div>
              </div>
            ) : (
              <label
                htmlFor='file'
                className='w-full h-full min-h-[10rem] rounded-md bg-gray-100 flex items-center justify-center gap-2 hover:cursor-pointer'
              >
                <span className='font-semibold text-gray-700 mt-0.5 select-none'>사진 추가</span>
                <PlusIcon className='w-5 h-5 text-gray-700' />
              </label>
            )}
          </div>
          <input
            id='file'
            type='file'
            className='hidden'
            accept='image/*'
            {...register('images', {
              required: '이미지를 업로드해주세요.',
            })}
          />
          <ErrorMessage message={formState.errors.images?.message} />
        </div>
      </div>

      <FormButton type='submit'>게시</FormButton>
    </form>
    </Layout>
  )
}

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
