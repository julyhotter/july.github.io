import { defineStore } from 'pinia'
import { themeDefault } from '@/assets/style/themeDefault'
import { themeDark } from '@/assets/style/themeDark'
import { themeScyn } from '@/assets/style/themeScyn'
import { StyleProvider, Themes } from '@varlet/ui'
export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: {},
  }),
  getters: {
    getTheme(): Object {
      return this.theme
    },
  },
  actions: {
    setTheme(theme: string) {
      switch (theme) {
        case 'dark':
          this.theme = themeDark
          break
        case 'sync':
          this.theme = themeScyn
          break
        default:
          this.theme = themeDefault
      }
      StyleProvider(this.theme)
    },
  },
})
