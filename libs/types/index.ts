export interface LoginForm {
  email: string
  password: string
}

export interface JoinForm {
  nickname: string
  email: string
  password: string
  passwordCheck: string
}

export interface PostForm {
  content: string
  images: FileList
  layout: 'default' | 'left' | 'right'
}

export type LayoutType = 'default' | 'left' | 'right'

export interface IPost {
  content: string
  image: string
  likeByMe: string
  likeCount: number
  postId: number
  title: string
  userId: number
  layout: LayoutType
  nickname: string
  createdAt: string
  updatedAt: string
}

export interface IUser {
  email: string
  iat: number
  userId: number
  nickname: string
}
