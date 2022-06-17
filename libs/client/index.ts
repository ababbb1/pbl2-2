import axios, { AxiosError, AxiosRequestHeaders } from 'axios'
import { IPost } from '../types'

export const API_DOMAIN = 'http://localhost:8080'
export const contentTypeHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
export const apiErrorHandler = (e: AxiosError) => {
  console.log(e)
}

export const authHeaders = (token: string): AxiosRequestHeaders => ({
  Authorization: `Bearer ${token}`,
})

export const fetchList = async () => {
  const res = await axios.get(`${API_DOMAIN}/api/post`).catch(apiErrorHandler)

  return res?.data.result
}

export const fetchItem = async (postId: number, token: string) => {
  const res: any = await axios({
    url: `${API_DOMAIN}/api/post/${postId}`,
    headers: authHeaders(token),
  }).catch(apiErrorHandler)

  const item: IPost = res.data.result
  return item
}
