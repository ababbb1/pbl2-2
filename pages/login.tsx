import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../components/errorMessage'
import { LoginForm } from '../libs/types'
import Link from 'next/link'
import FormButton from '../components/formButton'
import FormInput from '../components/formInput'
import { emailCheck } from '../libs/utils'
import Layout from '../components/layout'
import { signIn, getSession, GetSessionParams } from 'next-auth/react'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onChange' })

  const onValid: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    signIn('credentials', {
      callbackUrl: '/',
      redirect: true,
      email: data.email,
      password: data.password,
    })
  }

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className='flex flex-col items-center h-screen gap-4 px-4 pt-24 w-full max-w-sm'
      >
        <span className='mb-4 text-lg'>로그인</span>

        <div className='w-full flex flex-col gap-1'>
          <FormInput
            register={register('email', {
              required: '이메일을 입력해주세요.',
              validate: { emailCheck: emailCheck },
            })}
            placeholder='이메일'
            type='text'
            invalid={errors.email}
          />
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div className='w-full flex flex-col gap-1'>
          <FormInput
            register={register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
            placeholder='비밀번호'
            type='password'
            invalid={errors.password}
          />
          <ErrorMessage message={errors.password?.message} />
        </div>

        <div className='mt-6 flex flex-col gap-2 w-full'>
          <FormButton type='submit'>로그인</FormButton>
          <Link href='/join'>
            <a>
              <FormButton bgColor='bg-white' border='border border-theme1' textColor='text-theme1'>
                회원가입
              </FormButton>
            </a>
          </Link>
        </div>
      </form>
    </Layout>
  )
}

export async function getServerSideProps(ctx: GetSessionParams) {
  const session = await getSession(ctx)
  if (session)
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }

  return {
    props: {
      session,
    },
  }
}
