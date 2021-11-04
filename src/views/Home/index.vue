<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner/>
        <!-- 新鲜好物 -->
        <HomeNew/>
        <!-- 新鲜好物 -->
        <HomeHot/>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-categroy.vue'
import HomeBanner from './components/home-banner.vue'
// 新鲜好物
import HomeNew from './components/home-new.vue'
// 人气推荐
import HomeHot from './components/home-hot.vue'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot }
}
</script>
