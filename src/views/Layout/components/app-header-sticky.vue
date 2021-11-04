<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <HeaderNav />
      <div class="left">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from './top-header.vue'
import { useWindowScroll } from '@vueuse/core'
export default {
  components: {
    HeaderNav
  },
  setup () {
    // 核心思路：
    // 1. 基于滚动事件触发
    // 2. 判断滚动距离 当到底我们要求的临界值 就显示(加show类名)
    // 控制类名显示 :class="{show: 判断条件}"

    // 解决的问题：如何能得到当前滚动的距离？ vueuse/core 提供给信息当前距离顶部滚动了多少
    const { y } = useWindowScroll()
    // y 距离顶部的距离  类型由ref函数生成的响应式对象 内部包装是一个number类型
    // 注意事项：
    // 返回的类型是什么？setup中使用必须.value  / vueuse产出的都是响应式数据
    return {
      y
    }
  }
}
</script>
<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 132px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 默认情况下完全把自己移动到上面
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  // 显示出来的类名
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url("~@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
