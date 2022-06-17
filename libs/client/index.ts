import { AxiosError, AxiosRequestHeaders } from 'axios'
import { NextRouter, useRouter } from 'next/router'

export const API_DOMAIN = 'http://localhost:8080'
export const contentTypeHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
export const apiErrorHandler = (e: AxiosError) => {
  console.log(e)
}
