import { createStore, createLogger } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
// import cookie from 'cookie'

import user from './modules/user'
import cart from './modules/cart'

// 创建vuex仓库并导出
export default createStore({
  state: {
    // 数据
  },
  mutations: {
    // 改数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
    user,
    cart
  },
  getters: {
    // vuex的计算属性
  },
  plugins: [
    createLogger(),
    createPersistedstate({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        removeItem: key => Cookies.remove(key)
      },
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
