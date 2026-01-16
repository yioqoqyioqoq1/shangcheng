# 开发指南

## 开发环境配置

### 1. 开发工具推荐

**IDE配置**
- VS Code + Vue Language Features (Volar)
- ESLint 插件
- Prettier 插件
- Auto Rename Tag 插件

**浏览器插件**
- Vue.js devtools
- Redux DevTools (用于调试Pinia状态)

### 2. 项目初始化

```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd xiaotuxian

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 代码规范

### 1. 文件命名规范

- **组件文件**：PascalCase，如 `HomeBanner.vue`
- **工具函数**：camelCase，如 `formatPrice.js`
- **样式文件**：kebab-case，如 `common.scss`

### 2. 代码风格

**Vue组件结构**
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
// 导入语句
import { ref } from 'vue'

// 响应式数据
const count = ref(0)

// 函数定义
const increment = () => {
  count.value++
}
</script>

<style scoped lang="scss">
/* 组件样式 */
.container {
  padding: 20px;
}
</style>
```

**JavaScript规范**
- 使用ES6+语法
- 优先使用const，避免使用var
- 使用箭头函数
- 使用模板字符串

### 3. 组件开发规范

**Props定义**
```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})
</script>
```

**事件发射**
```vue
<script setup>
const emit = defineEmits(['change', 'update'])

const handleClick = () => {
  emit('change', newValue)
}
</script>
```

## API开发指南

### 1. API文件结构

```javascript
// src/apis/category.js
import http from '@/utils/http'

// 获取分类列表
export const getCategoryAPI = (id) => {
  return http.get(`/category/${id}`)
}

// 添加分类
export const addCategoryAPI = (data) => {
  return http.post('/category', data)
}
```

### 2. 错误处理

```javascript
// 在组件中使用
try {
  const data = await getCategoryAPI(id)
  // 处理成功数据
} catch (error) {
  // 统一错误处理
  ElMessage.error('请求失败')
}
```

## 状态管理指南

### 1. Store定义规范

```javascript
// src/stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 状态
  const cartList = ref([])
  
  // getters
  const totalCount = computed(() => {
    return cartList.value.reduce((total, item) => total + item.count, 0)
  })
  
  // actions
  const addToCart = (goods) => {
    // 业务逻辑
  }
  
  return {
    cartList,
    totalCount,
    addToCart
  }
})
```

### 2. Store使用规范

```vue
<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

// 在组件中使用
const handleAddCart = () => {
  cartStore.addToCart(goods)
}
</script>
```

## 路由开发指南

### 1. 路由配置

```javascript
// src/router/index.js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        }
      ]
    }
  ]
})
```

### 2. 路由使用

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 获取路由参数
const categoryId = route.params.id

// 路由跳转
const goToDetail = (id) => {
  router.push(`/detail/${id}`)
}
</script>
```

## 样式开发指南

### 1. SCSS规范

**变量定义**
```scss
// src/styles/var.scss
$primary-color: #27ba9b;
$text-color: #333;
$border-color: #e4e4e4;
```

**混合器定义**
```scss
// src/styles/mixins.scss
@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin multi-ellipsis($lines) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
  overflow: hidden;
}
```

### 2. 组件样式

```vue
<style scoped lang="scss">
@import "@/styles/var.scss";

.container {
  padding: 20px;
  
  .title {
    color: $primary-color;
    font-size: 18px;
  }
  
  .content {
    @include ellipsis;
  }
}
</style>
```

## 性能优化指南

### 1. 组件优化

**使用异步组件**
```javascript
const AsyncComponent = defineAsyncComponent(() => 
  import('./AsyncComponent.vue')
)
```

**使用keep-alive**
```vue
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

### 2. 图片优化

**使用懒加载**
```vue
<template>
  <img v-lazy="imageUrl" alt="商品图片">
</template>

<script setup>
import { useLazyLoad } from '@/directives/Lazy'
</script>
```

## 测试指南

### 1. 单元测试

```javascript
// tests/unit/example.spec.js
import { mount } from '@vue/test-utils'
import Component from '@/components/Component.vue'

describe('Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('Hello')
  })
})
```

### 2. E2E测试

```javascript
// tests/e2e/specs/test.js
describe('购物流程', () => {
  it('应该能够成功添加商品到购物车', () => {
    cy.visit('/')
    cy.get('.add-cart-btn').click()
    cy.get('.cart-count').should('contain', '1')
  })
})
```

## 调试技巧

### 1. Vue DevTools

- 查看组件层次结构
- 检查组件props和状态
- 跟踪事件发射

### 2. 浏览器调试

```javascript
// 在代码中插入调试语句
console.log('当前状态:', state)
console.table('商品列表:', goodsList)
```

## 常见问题解决

### 1. 热重载不生效
- 检查文件保存编码
- 确认Vite配置正确
- 重启开发服务器

### 2. 样式不生效
- 检查scoped样式作用域
- 确认SCSS文件导入正确
- 检查样式优先级

### 3. 路由跳转问题
- 检查路由配置路径
- 确认组件文件存在
- 检查路由守卫逻辑