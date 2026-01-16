# 小兔鲜电商平台

一个基于Vue 3的现代化电商前端项目，提供完整的购物体验。

## 🚀 项目特色

- **现代化技术栈**：Vue 3 + Vite + Pinia + Element Plus
- **响应式设计**：完美适配PC和移动端
- **性能优化**：路由懒加载、代码分割、构建优化
- **用户体验**：流畅的购物流程，丰富的交互效果

## 📋 功能模块

### 🏠 首页
- 轮播图展示
- 商品分类导航
- 新品推荐
- 人气商品展示

### 🛍️ 商品分类
- 一级分类展示
- 二级分类筛选
- 商品列表展示

### 🔍 商品详情
- 商品信息展示
- 规格选择
- 加入购物车
- 商品评价

### 🛒 购物车
- 商品管理（增删改查）
- 数量调整
- 价格计算
- 全选/反选

### 💳 结算流程
- 订单确认
- 地址管理
- 支付集成
- 订单状态跟踪

### 👤 用户中心
- 个人信息管理
- 订单历史
- 收货地址管理

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器

### 状态管理
- **Pinia** - Vue官方推荐的状态管理库
- **Pinia Plugin Persistedstate** - 状态持久化

### UI组件库
- **Element Plus** - 基于Vue 3的组件库
- **自定义组件** - 业务组件封装

### 工具库
- **Axios** - HTTP请求库
- **Day.js** - 日期处理库
- **@vueuse/core** - Vue组合式API工具集

### 开发工具
- **ESLint** - 代码规范检查
- **Sass/SCSS** - CSS预处理器

## 📁 项目结构

```
src/
├── apis/                 # API接口管理
│   ├── cart.js          # 购物车接口
│   ├── category.js      # 分类接口
│   ├── detail.js        # 商品详情接口
│   └── ...
├── assets/              # 静态资源
│   ├── images/          # 图片资源
│   └── base.css         # 基础样式
├── components/          # 公共组件
│   ├── ImageView/       # 图片预览组件
│   └── XtxSku/          # 商品规格组件
├── composables/         # 组合式函数
│   └── useCountDown.js  # 倒计时功能
├── directives/          # 自定义指令
│   └── Lazy/            # 图片懒加载
├── router/              # 路由配置
│   └── index.js
├── stores/              # 状态管理
│   ├── cartStore.js     # 购物车状态
│   ├── categoryStore.js # 分类状态
│   └── userStore.js     # 用户状态
├── styles/              # 样式文件
│   ├── common.scss      # 通用样式
│   └── element/         # Element Plus定制
├── utils/               # 工具函数
│   └── http.js          # HTTP请求封装
└── views/               # 页面组件
    ├── Home/            # 首页
    ├── Category/        # 分类页
    ├── Detail/          # 详情页
    ├── CartList/        # 购物车
    ├── Checkout/        # 结算页
    ├── Pay/             # 支付页
    ├── Member/          # 用户中心
    └── ...
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## ⚙️ 配置说明

### API配置

项目使用统一的HTTP请求封装，配置文件位于 `src/utils/http.js`：

```javascript
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})
```

### 路由配置

支持路由懒加载，提升应用性能：

```javascript
const Home = () => import('@/views/Home/index.vue')
const Category = () => import('@/views/Category/index.vue')
```

### 状态管理

使用Pinia进行状态管理，支持持久化存储：

```javascript
export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  // ...状态和方法
})
```

## 🎯 核心功能实现

### 商品规格选择

使用组合式API实现商品规格选择功能：

```vue
<script setup>
const skuObj = ref({})
const skuChange = (sku) => {
  skuObj.value = sku
}
</script>

<template>
  <XtxSku :goods="goods" @change="skuChange" />
</template>
```

### 购物车管理

购物车状态管理，支持本地和登录状态：

```javascript
const addCart = async (goods) => {
  if (isLogin.value) {
    // 登录状态：调用API
    await insertCartAPI({ skuId, count })
  } else {
    // 本地状态：直接操作
    const item = cartList.value.find(item => item.skuId === goods.skuId)
    if (item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }
}
```

### 图片懒加载

自定义指令实现图片懒加载：

```javascript
app.directive('lazy', {
  mounted(el, binding) {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = binding.value
        observer.unobserve(el)
      }
    })
    observer.observe(el)
  }
})
```

## 🔧 性能优化

### 构建优化

- **代码分割**：路由级别和组件级别分割
- **Tree Shaking**：移除未使用代码
- **压缩优化**：CSS/JS文件压缩
- **预构建**：依赖预构建提升构建速度

### 运行时优化

- **组件懒加载**：按需加载页面组件
- **图片优化**：懒加载和压缩
- **缓存策略**：API请求缓存
- **错误处理**：统一错误处理机制

## 🐛 常见问题

### Q: 路由切换不生效？
A: 检查路由配置和组件文件路径，确保使用正确的文件扩展名。

### Q: API请求失败？
A: 检查网络连接和API配置，确认接口地址正确。

### Q: 样式不生效？
A: 确认SCSS文件正确导入，检查样式文件路径。

## 📞 联系方式

如有问题或建议，请联系项目维护者。

## 📄 许可证

MIT License