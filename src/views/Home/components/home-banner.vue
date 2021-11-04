<template>
  <div class="home-banner">
    <XtxSlider :sliders="bannerList" :is-need-left="true"/>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { onMounted, ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const bannerList = ref([])
    async function loadBannerList () {
      // 参数修改
      // ajax
      const res = await findBanner()
      bannerList.value = res.result
    }
    onMounted(() => {
      // 调用函数
      loadBannerList()
    })
    return {
      bannerList
    }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.NEXTimg {
  width: 80% !important;
}
</style>
