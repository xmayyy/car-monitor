import { getAxios, postAxios } from '@/utils/axios'
const url = '/auth/register'

export const register = (data) => {
  return postAxios({url, data} )
}