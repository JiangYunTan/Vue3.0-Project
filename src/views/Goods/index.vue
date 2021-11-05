<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goodData && goodData.brand">
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片预览区 -->
          <XtxImageView :image-list="goodData.mainPictures" />
          <!-- 统计数量 -->
          <GoodSale :good="goodData"/>
        </div>
        <div class="spec">
          <!-- 商品信息区 -->
          <GoodInfo :good="goodData" />
          <!-- sku组件 -->
          <XtxGoodSku :goods="goodData" @change="skuChange"/>
          <!-- 数据组件 -->
          <XtxNumbox v-model="num" :min="1" :max="10"></XtxNumbox>
          <!-- 按钮组件 -->
          <XtxButton type="primary" style="margin-top: 20px"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品详情 -->
          <GoodDetail :goods="goodData"/>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
            <GoodHot></GoodHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodSale from './components/good-sale.vue'
import GoodInfo from './components/good-info.vue'
import GoodDetail from './components/goods-tabs.vue'
import GoodHot from './components/goods-hot.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/goods'
export default {
  components: {
    GoodSale,
    GoodInfo,
    GoodDetail,
    GoodHot
  },
  setup () {
    function skuChange (sku) {
      console.log(sku)
    }

    // 获取商品信息
    const num = 1
    const route = useRoute()
    const goodData = ref({})
    async function loadGoodData () {
      const res = await findGoods(route.params.id)
      goodData.value = res.result
      // console.log(res.result)
    }
    onMounted(() => {
      loadGoodData()
    })
    return {
      goodData,
      num,
      skuChange
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-goods-page {
  padding-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
