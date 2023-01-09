import axios from 'axios'
import { getToken } from './token'

let marketBaseUrl = "https://market-dev.51nftcard.com/"
let gatewayBaseUrl = "https://gateway-dev.51nftcard.com/"

if (process.env.REACT_APP_ENV === "pro") {
  marketBaseUrl = "https://market.51nftcard.com/"
  gatewayBaseUrl = "https://gateway.51nftcard.com/"
}

// 初始化axios
const http = axios.create({
  baseURL: marketBaseUrl,
  timeout: 50000
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
  return Promise.reject(error)
})

// 网关
const httpGateway = axios.create({
  baseURL: gatewayBaseUrl,
  timeout: 50000
})

// 请求拦截器
httpGateway.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
httpGateway.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    window.location.href = '/#/login'
    return
  }
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数
  return Promise.reject(error)
})

export { http, httpGateway }