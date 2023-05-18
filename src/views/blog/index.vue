<script setup lang="ts">
import vuetyped from '@/components/typed/index.vue'
import { ref,onMounted } from 'vue'
import { getBrand, postBrand } from '../../api/login/login'
const show = ref(false)
onMounted(() => {
  getBrandOption()
  postBrandOption()
  setTimeout(() => {
    show.value = true
  },1000)
})
const getBrandOption = async () => {
  const res = await getBrand()
  console.log(res)
}
const postBrandOption = async () => {
  const res = await postBrand({
    test: '532111',
    code: 123
  })
  console.log(res)
}
</script>
<template>
  <div class="blog_wrapper">
    <p>blog</p>
    <div v-if="show" class="blogTyped">
      <vuetyped :loop="false" :show-cursor="false" :smart-backspace="false" :strings="['面试官你好']">
        <div class="typing" />
      </vuetyped>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .blog_wrapper{
    color: #fff;
  }
</style>
