import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import XtxSlider from '@/components'
// 图片懒加载
import defineDirective from '@/directive'
// 引入样式
import '@/styles/common.less'
// 测试数据
store.commit('user/setUser')

createApp(App).use(router).use(store).use(XtxSlider).use(defineDirective).mount('#app')
