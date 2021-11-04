<template>
  <TopNav>顶部通栏</TopNav>
  <Header>头部</Header>
  <!-- 吸顶操作 -->
  <HeaderSticky></HeaderSticky>
  <main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </main>
  <AppFooter>底部</AppFooter>
</template>

<script>
import TopNav from './components/top-nav.vue'
import Header from './components/top-header.vue'
import AppFooter from './components/layout-footer.vue'
import HeaderSticky from './components/app-header-sticky.vue'
export default {
  name: 'xtx-layout',
  components: {
    TopNav,
    Header,
    AppFooter,
    HeaderSticky
  }
}
</script>

<style scoped lang='less'></style>
