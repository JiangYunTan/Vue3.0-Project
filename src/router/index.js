import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home/index')
const TopCategory = () => import('@/views/Category')
const Goods = () => import('@/views/Goods/index')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      // 增加分类路由绑定
      { path: '/category/:id', component: TopCategory },
      { path: '/product/:id', name: 'product' },
      // { path: '/category/sub/:id', component: SubCategory },
      { path: '/goods/:id', component: Goods }

    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
