import { SubmitHandler, useForm } from 'react-hook-form'
import { emailCheck } from '../utils'
import { JoinForm } from '../types'
import FormInput from '../components/formInput'
import ErrorMessage from '../components/errorMessage'
import FormButton from '../components/formButton'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/layout'

export default function Join() {
  const isAuth = false
  const router = useRouter()

  useEffect(() => {
    isAuth && router.replace('/')
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>({ mode: 'onBlur' })

  const onValid: SubmitHandler<JoinForm> = (data: JoinForm) => {
    console.log(data)
  }

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className='flex flex-col items-center h-screen gap-5 px-4 pt-16 w-full max-w-sm'
      >
        <span className='mb-4 text-lg'>회원가입</span>
        <div className='w-full'>
          <FormInput
            register={register('email', {
              required: '이메일을 입력해주세요.',
              validate: { emailCheck },
            })}
            placeholder='이메일'
            type='text'
            label='이메일'
            invalid={errors.email}
          />
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <FormInput
            register={register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
            placeholder='비밀번호'
            type='password'
            label='비밀번호'
            invalid={errors.password}
          />
          <ErrorMessage message={errors.password?.message} />
          <FormInput
            register={register('passwordCheck', {
              required: '비밀번호가 일치하지 않습니다.',
            })}
            placeholder='비밀번호 재입력'
            type='password'
            invalid={errors.password}
          />
          <ErrorMessage message={errors.passwordCheck?.message} />
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <FormInput
            register={register('nickname', {
              required: '닉네임을 입력해주세요.',
            })}
            placeholder='닉네임'
            type='text'
            label='닉네임'
            invalid={errors.nickname}
          />
          <ErrorMessage message={errors.nickname?.message} />
        </div>

        <div className='mt-6 flex flex-col gap-2 w-full'>
          <FormButton type='submit'>가입하기</FormButton>
        </div>
      </form>
    </Layout>
  )
}
