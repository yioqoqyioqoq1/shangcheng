import axios from "axios"

import { ElMessage,  } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
ElMessage({type:"warning",message:e.response.data.msg})
  return Promise.reject(e)
})


export default http