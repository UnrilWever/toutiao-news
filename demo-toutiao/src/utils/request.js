import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'

// 调用 axios.create() 函数，创建一个 axios 的实例对象，用 request 来接收
const request = axios.create({
  // 指定请求的根路径
  // baseURL: 'http://www.liulongbin.top:8000'
  baseURL: 'https://toutiao-news-cors-node-js.vercel.app'
})

// 请求拦截器
// 注意：在我们的项目中，是基于 instance 实例来发起 ajax 请求的，因此一定要为 instance 实例绑定请求拦截器
request.interceptors.request.use(
  config => {
    // 1. 获取 token 值
    const tokenStr = store.state.tokenInfo.token
    // 展示 loading 效果
    // 2. 判断 tokenStr 的值是否为空
    if (tokenStr) {
      // 3. 添加身份认证字段
      config.headers.Authorization = `Bearer ${tokenStr}`
    }
    Toast.loading({
      message: '加载中...', // 文本内容
      duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器（注意：响应拦截器也应该绑定给 instance 实例）
request.interceptors.response.use(
  response => {
    // 隐藏 loading 效果
    Toast.clear()
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
