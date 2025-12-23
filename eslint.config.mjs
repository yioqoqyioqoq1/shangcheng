import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  // 1. 全局忽略 (对应 .eslintignore)
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  // 2. 基础 JS 配置 (包含关键的 no-undef 规则)
  js.configs.recommended,

  // 3. Vue 核心配置 (处理 .vue 文件解析)
  ...pluginVue.configs['flat/essential'],

  // 4. 项目具体配置 (整合在一起，确保优先级最高)
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
    
      }
    },
    rules: {
      // 必须有这行，且必须是 'error'
      'no-undef': 'error', 
    }
  }
]