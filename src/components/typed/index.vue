<template>
  <div ref="typedElement" class="typed-element">
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import Typed from 'typed.js'
import { ref, reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { params, getEventHandlers } from './typed-component.config.js'
// 常量

const props = defineProps({
  ...params,
})
const typedElement = ref(null)
const inits = reactive(getCurrentInstance()) // 获取实例

// 变量
let typeobj = reactive({})

// 初始化
const initTypedJS = () => {
  const $typed = typedElement.value.querySelector('.typing')
  let typedConfig = inits.props
  typedConfig = getEventHandlers(inits, typedConfig)
  typeobj = new Typed($typed, props)
}
onMounted(() => {
  initTypedJS()
})
onUnmounted(() => {
  typeobj.destroy()
})
</script>

<style scoped>
.typed-element {
  display: flex;
  align-items: center;
}

.typed-cursor {
  opacity: 1;
  animation: typedjsBlink 1 s infinite;
}

@keyframes typedjsBlink {
  50% {
    opacity: 0;
  }
}
</style>
