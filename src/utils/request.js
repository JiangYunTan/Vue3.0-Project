import axios from 'axios'
import store from '@/store'
import router from '@/router'
// baseURL 超时时间配置
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 全局注入token
instance.interceptors.request.use(config => {
  // 1. 获取token
  const { token } = store.state.user.profile
  // 2. 请求头设置token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, e => Promise.reject(e))

// token失效跳回到登录页
instance.interceptors.response.use(res => res.data, e => {
  if (e.response && e.response.status === 401) {
    const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + redirectUrl)
  }
  return Promise.reject(e)
})

/**
 * @param {String} - url  请求地址
 * @param {String} - method  请求类型
 * @param {Object} - submitData  对象类型，提交数据
 */
const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
