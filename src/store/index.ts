/*
 * @Descripttion:
 * @Author: julyer
 * @Date: 2022-05-29 10:55:03
 * @LastEditors: julyer
 * @LastEditTime: 2022-05-29 10:57:08
 * @FilePath: \lavenir-star\src\store\index.ts
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPluginPersist)

export { store }
