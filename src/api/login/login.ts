import fetch from '@/utils/fetch'
import * as T from './types'

// const loginApi: T.ILoginApi = {
//   login(params) {
//     return fetch.post('/login', params)
//   },
// }

// export default loginApi

export function getBrand() {
  return fetch.get('/api/test?test=123')
}

export function postBrand(data: any) {
  return fetch.post('/api/postTest', data)
}
