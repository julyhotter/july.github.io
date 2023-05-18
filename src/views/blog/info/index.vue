<script setup lang="ts" name="info">
import vuetyped from '@/components/typed/index.vue'
import { ref,onMounted } from 'vue'
const show = ref(false)
const typedStrings = ['欢迎光临','SIMS综合管理APP研发','SIMS综合管理APP研发']
onMounted(() => {
  setTimeout(() => {
    show.value = true
  },1000)
})
</script>
<template>
  <div class="blog_wrapper">
    <div v-if="show" class="blogTyped">
      <vuetyped v-for="(item,index) in typedStrings" :key="index" :loop="false" :show-cursor="false" :smart-backspace="false" :strings="[item]">
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
