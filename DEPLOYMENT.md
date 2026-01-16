# 部署指南

## 部署前准备

### 1. 环境要求

**服务器环境**
- Node.js >= 16.0.0
- npm >= 7.0.0
- 支持HTTPS的Web服务器（如Nginx、Apache）

**域名和SSL证书**
- 已备案的域名
- SSL证书（推荐使用Let's Encrypt免费证书）

### 2. 配置文件检查

在部署前，请检查以下配置文件：

**环境变量配置**
```bash
# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_TITLE=小兔鲜电商平台
```

**Vite生产配置**
```javascript
// vite.config.js
export default defineConfig({
  base: '/', // 根据部署路径调整
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false // 生产环境关闭sourcemap
  }
})
```

## 构建流程

### 1. 本地构建测试

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 2. 构建产物分析

构建完成后，检查 `dist` 目录结构：

```
dist/
├── assets/
│   ├── js/
│   │   ├── index.[hash].js
│   │   ├── vendor.[hash].js
│   │   └── element-plus.[hash].js
│   └── css/
│       └── index.[hash].css
├── index.html
└── favicon.ico
```

## 部署方式

### 1. 静态文件部署（推荐）

**Nginx配置示例**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # 重定向到HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    # SSL配置
    ssl_certificate /path/to/yourdomain.com.crt;
    ssl_certificate_key /path/to/yourdomain.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    # 静态文件根目录
    root /var/www/xiaotuxian;
    index index.html;
    
    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 缓存配置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api/ {
        proxy_pass https://api.yourdomain.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 2. Docker部署

**Dockerfile**
```dockerfile
# 构建阶段
FROM node:16-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml**
```yaml
version: '3.8'
services:
  xiaotuxian:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 3. CDN部署

**CDN配置步骤**
1. 将构建产物上传到对象存储（如阿里云OSS、腾讯云COS）
2. 配置CDN加速域名
3. 设置缓存策略
4. 配置HTTPS和HTTP/2

## 环境配置

### 1. 多环境配置

**环境变量文件**
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_ENV=development

# .env.production  
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_ENV=production
```

**代码中使用环境变量**
```javascript
// src/utils/http.js
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50000
})
```

### 2. API配置

根据环境配置不同的API地址：

```javascript
// src/config/api.js
export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 30000
  },
  production: {
    baseURL: 'https://api.yourdomain.com',
    timeout: 50000
  }
}

const config = API_CONFIG[import.meta.env.VITE_APP_ENV || 'development']
```

## 性能优化配置

### 1. 构建优化

**Vite配置优化**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus'],
          utils: ['axios', 'dayjs']
        }
      }
    },
    // 压缩优化
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

### 2. 运行时优化

**预加载关键资源**
```html
<!-- index.html -->
<link rel="preload" href="/assets/vendor.[hash].js" as="script">
<link rel="preload" href="/assets/index.[hash].css" as="style">
```

**Service Worker配置**（可选）
```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('xiaotuxian-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/assets/index.[hash].css',
        '/assets/vendor.[hash].js'
      ])
    })
  )
})
```

## 监控和日志

### 1. 错误监控

**Sentry集成**
```javascript
// src/main.js
import * as Sentry from "@sentry/vue"

Sentry.init({
  app,
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    })
  ],
  tracesSampleRate: 1.0
})
```

### 2. 性能监控

**Web Vitals监控**
```javascript
// src/utils/performance.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## 安全配置

### 1. 内容安全策略（CSP）

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### 2. HTTPS配置

确保所有资源都通过HTTPS加载：

```javascript
// 检查混合内容
if (window.location.protocol === 'https:' && 
    document.querySelector('script[src^="http:"]')) {
  console.error('发现混合内容，请修复')
}
```

## 自动化部署

### 1. GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      env:
        VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
        
    - name: Deploy to server
      uses: easingthemes/ssh-deploy@v2
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: /var/www/xiaotuxian
```

## 故障排除

### 1. 常见问题

**白屏问题**
- 检查JavaScript文件是否加载成功
- 查看浏览器控制台错误信息
- 确认路由配置正确

**资源加载失败**
- 检查CDN配置
- 确认文件路径正确
- 查看网络请求状态

**API请求失败**
- 检查API服务状态
- 确认CORS配置正确
- 查看网络请求详情

### 2. 日志分析

部署后监控以下指标：
- 页面加载时间
- API响应时间
- JavaScript错误数量
- 用户行为分析

## 备份和恢复

### 1. 数据备份

定期备份以下内容：
- 数据库数据
- 用户上传文件
- 配置文件
- 日志文件

### 2. 灾难恢复

制定灾难恢复计划：
- 定期测试恢复流程
- 准备备用服务器
- 建立监控告警机制