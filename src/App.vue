
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { StyleProvider, Themes } from '@varlet/ui'
import { useThemeStore } from '@/store/modules/theme'
const themeStore = useThemeStore()
const getDarkTheme = computed(() => {
  return themeStore.theme
})
// import canvasBG from '@/components/canvasBG/index.vue'

const BgRef = ref<any>()
// <!-- <p @click="play">play</p>
//     <p @click="stop">stop</p> -->
const play = () => {
  BgRef.value.play()
}
const stop = () => {
  BgRef.value.stop()
}
</script>
<template>
  <var-style-provider :style-vars="getDarkTheme">
    <!-- <var-button block style="margin-top: 10px" type="primary" @click="toggleTheme">
      切换样式变量
    </var-button> -->
    <RouterView />
  </var-style-provider>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  z-index: 1;
}

.red {
  color: var(--test-color);
}
</style>
