/*
 * @Descripttion: 
 * @Author: julyer
 * @Date: 2022-04-12 09:15:19
 * @LastEditors: julyer
 * @LastEditTime: 2022-05-09 18:52:09
 * @FilePath: \vue-standard-framework\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// script setup模式下对当前组件命名 <script setup name="overview"></script>
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// 打包分析
import visualizer from 'rollup-plugin-visualizer'
// 兼容ie11
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
// varlet
import Components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'

console.log('*****非生产环境为undefined***************', process.env.vis)
const plugins = [
  vue(),
  VueSetupExtend(),
  legacy({
    targets: ['> 1%, last 1 version, ie >= 11'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
  }),
  Components({
    resolvers: [VarletUIResolver()],
  }),
]
// 自定义环境变量
if (process.env.vis) {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  )
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 代理
  server: {
    host: '0.0.0.0',
    // port: 3000,
    open: true,
    https: false,
    proxy: {},
  },
  // 生产环境打包配置 去除 console debugger
  build: {
    assetsDir: './static',
    minify: 'terser',
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   // external: ['vue'], // 注意看这里
    //   output: {
    //     manualChunks: {
    //       // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
    //       // vue: ['vue', 'vue-router'],
    //       // vant: ['vant'],
    //       // echarts: ['echarts'],
    //     },
    //     globals: {
    //       vue: 'vue',
    //     }
    //   },
    // },
    brotliSize: false,
  },
})
