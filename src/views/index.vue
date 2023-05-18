<!--
 * @Descripttion: 
 * @Author: julyer
 * @Date: 2022-04-12 09:15:19
 * @LastEditors: julyer
 * @LastEditTime: 2022-05-10 11:09:03
 * @FilePath: \vue-standard-framework\src\views\index.vue
-->
<template>
  <div class="index_wrapper">
    home
    <!-- <Suspense>
      <template #default>
        <asyncHelloWorld />
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense> -->
  </div>
</template>
<script setup name="home" lang="ts">
import { ref, defineAsyncComponent } from 'vue'
// import Loading from '@/components/Loading.vue'
// 配置项定义方式
// const asyncHelloWorld = defineAsyncComponent({
//   loader: () => import('@/view/text.vue'), // component配置项重新命名为loader
//   delay: 10000,
//   timeout: 3000,
//   errorComponent: Loading,
//   loadingComponent: Loading,
//   onError: (error, retry, fail, attempts) => {
//     // 错误信息  重试回调 失败回调 尝试次数
//     console.log('error', error)
//     console.log('retry', retry)
//     console.log('fail', fail)
//     console.log('attempts', attempts)
//   },
// })

// function reset(): void {
//   console.log('reset')
// }
</script>
