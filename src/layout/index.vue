<!--
 * @Descripttion: 
 * @Author: julyer
 * @Date: 2022-05-09 16:44:47
 * @LastEditors: julyer
 * @LastEditTime: 2022-05-10 10:36:51
 * @FilePath: \vue-standard-framework\src\layout\index.vue
-->
<script setup lang="ts" name="layout">
import HeaderCom from './components/header.vue'
</script>
<template>
  <div class="layout">
    <HeaderCom />
    <div class="layoutView">
      <RouterView />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  .layoutView {
    margin: 0 auto;
    width: 64vw;
    height: calc(100vh - 90px);
    overflow: hidden;
  }
}
</style>
