import { useUserStore } from "@/stores/userStore"
import axios from "axios"
import router from '@/router'
import { ElMessage,  } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

// 创建axios实例
const http = axios.create({
baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net', 
  timeout: 50000
})

// axios请求拦截器
http.interceptors.request.use(config => {

    // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
ElMessage({type:"warning",message:e.response?.data?.msg || '网络服务异常，请稍后再试'})

  if (e.response.status === 401) {
        // 1.清除本地用户数据
        userStore.clearUserInfo()
        // 2.跳转到登录页
        router.push('/login')
    }
  return Promise.reject(e)

})


export default http