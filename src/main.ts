/*
 * @Descripttion:
 * @Author: julyer
 * @Date: 2022-04-12 09:15:19
 * @LastEditors: julyer
 * @LastEditTime: 2022-05-09 16:48:36
 * @FilePath: \vue-standard-framework\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from '@/store'
import './assets/style/common.less'
import '@varlet/touch-emulator'
const app = createApp(App)
app.use(router).use(store).mount('#app')
