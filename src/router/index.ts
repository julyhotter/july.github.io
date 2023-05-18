/*
 * @Descripttion:
 * @Author: julyer
 * @Date: 2022-04-12 09:15:19
 * @LastEditors: julyer
 * @LastEditTime: 2022-05-10 11:21:23
 * @FilePath: \vue-standard-framework\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/**
 *  - 示例
 *  - `path`:`string`; 路由地址。
 *  - `name`:`string`; 路由名称。
 *  - `component`:`Function`; 路由文件引入。
 *  - `title`:`string`; 页面标题，通常必选。
 *  - `icon?`:`string`; 图标，一般配合菜单使用。
 *  - `auth?`:`boolean`; 是否需要登录权限。
 *  - `ignoreAuth?`:`boolean`; 是否忽略权限。
 *  - `roles?`:`RoleEnum[]`; 可以访问的角色
 *  - `keepAlive?`:`boolean`; 是否开启页面缓存
 *  - `hide?`:`boolean`; 有些路由我们并不想在菜单中显示，比如某些编辑页面。
 *  - `order?`:`number`; 菜单排序。
 *  - `frameUrl?`:`string`; 嵌套外链。
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '欢迎光临',
      keepAlive: true,
    },
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '仪表盘',
          keepAlive: true,
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout, // 注意这里要带上 文件后缀.vue
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '欢迎光临',
          keepAlive: true,
        },
        component: () => import('@/views/blog/index.vue'),
      },
      {
        path: '/intro',
        name: 'intro',
        meta: {
          title: '个人简介',
          keepAlive: true,
        },
        component: () => import('@/views/blog/info/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to, from) => {
  ;(document as any).title =
    '七月的夏天有点热-' + to.meta.title ? to.meta.title : (document as any).title
})

export default router
