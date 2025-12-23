import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  // 1. 全局忽略配置
  { 
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'] 
  },

  // 2. JS 推荐配置 (确保 no-undef 生效)
  js.configs.recommended,

  // 3. Vue 推荐配置
  ...pluginVue.configs['flat/essential'],

  // 4. 你的自定义通用配置（应用到所有相关文件）
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // 如果你在项目用了 node 变量 (如 process, module)，加上这个
      },
    },
    
    rules: {
      // 显式开启 no-undef 报错 (虽然 recommended 里有，但手动加个保险)
      'no-undef': 'error',
      
      // 其他你可能需要的规则
      'no-unused-vars': 'warn',
    },
  },
]