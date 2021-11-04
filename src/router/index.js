import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home/index')
const TopCategory = () => import('@/views/Category')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      // 增加分类路由绑定
      { path: '/category/:id', component: TopCategory },
      { path: '/product/:id', name: 'product' }
      // { path: '/cart', name: 'cart' },
      // { path: '/checkout', name: 'checkout' },
      // { path: '/pay', name: 'pay' },
      // { path: '/pay/result', name: 'result' }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
