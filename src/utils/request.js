import { message } from 'antd'
import axios from 'axios'
import { getToken } from './token'
import '@/globalConfig'

// 初始化axios
const http = axios.create({
  baseURL: global.config.baseUrl,
  timeout: 60000
})

// 请求拦截器
http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    window.location.href = '/#/login'
    return
  }
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数
  message.error("网络错误")
  return Promise.reject(error)
})

export { http }