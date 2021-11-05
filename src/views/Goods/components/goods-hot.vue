<template>
  <div class="goods-hot">
    <h3>周热榜</h3>
    <!-- 商品区块 -->
    <GoodItem v-for="good in goodsList" :key="good.id" :goods="good" />
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { findHotGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
import GoodItem from '@/views/Category/components/goods-item.vue'
export default {
  name: 'GoodsHot',
  components: {
    GoodItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    // 商品列表

    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })
    const route = useRoute()
    const goodsList = ref([])
    findHotGoods({ id: route.params.id, type: 1 }).then(data => {
      goodsList.value = data.result
    })
    return { goodsList, title }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
}
</style>
