/*
 * @Descripttion:
 * @Author: julyer
 * @Date: 2022-05-31 09:25:24
 * @LastEditors: julyer
 * @LastEditTime: 2022-06-13 11:47:36
 * @FilePath: \lavenir-star\src\store\modules\user.ts
 */
import { defineStore } from 'pinia'
import { login } from '@/api/common'

interface UserState {
  userinfo: object
  token: string
  permissions: Array<string>
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userinfo: {},
    token: '',
    permissions: [],
  }),
  getters: {
    getUserinfo(): object {
      return this.userinfo
    },
    getToken(): string {
      return this.token
    },
    getPermissions(): Array<string> {
      return this.permissions
    },
  },
  actions: {
    setPermissions(permissions) {
      this.permissions = permissions
    },
    setUserinfo(userinfo) {
      this.userinfo = userinfo
    },
    async login(userinfo) {
      const res = await login(userinfo)
      console.log('login--------------->', res)
      if (res.code === 0) {
        this.setUserinfo(res.data)
        window.sessionStorage.setItem('token', (res.data as any).token)
        this.setPermissions((res.data as any).permissions)
        return true
      }
      return false
    },
  },
})
