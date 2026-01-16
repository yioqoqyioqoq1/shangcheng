import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // 启用响应式语法糖
      reactivityTransform: true
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      // 自动导入常用API
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@vueuse/core': [
            'useMouse',
            'useLocalStorage',
            'useDebounceFn'
          ]
        }
      ],
      dts: true
    }),
    Components({
      resolvers: [ElementPlusResolver({importStyle:"sass"})],
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
   css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    },
    // CSS优化 - 使用Vite内置压缩
    devSourcemap: false,
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
