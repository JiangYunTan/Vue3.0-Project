<template>
  <div class='top-category'>
    <div class="container">
      <div>
        <XtxSlider :sliders="bannerList"/>
      </div>

      <!-- <div style="height:500px"></div> -->
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in categroyAllList" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div
          class="ref-goods"
          v-for="item in categroyAllList"
          :key="item.id"
          >
          <div class="head">
            <h3>- {{ item.name }} -</h3>
            <XtxMore to="/" />
          </div>
          <div class="body">
            <!-- <a href="#" v-for="good in item.goods" :key="good.id">{{good}}</a> -->
            <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item.vue'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { findBanner } from '@/api/home'
// import { onMounted, ref } from 'vue'
// export default {
//   name: 'HomeBanner',
//   setup () {
//     const bannerList = ref([])
//     async function loadBannerList () {
//       // 参数修改
//       // ajax
//       const res = await findBanner()
//       bannerList.value = res.result
//     }
//     onMounted(() => {
//       // 调用函数
//       loadBannerList()
//     })
//     return {
//       bannerList
//     }
//   }
// }
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup () {
    const bannerList = ref([])
    async function loadBannerList () {
      // 参数修改
      // ajax
      const res = await findBanner()
      bannerList.value = res.result
    }
    // 全部分类逻辑实现
    const categroyAllList = ref([])
    // const categroyName = ref([])
    const route = useRoute() // route this.$route  route.params.id
    async function loadCategoryList (id) {
      const res = await findTopCategory(id)
      categroyAllList.value = res.result.children
      // breadName.value = res.result.name
    }
    onMounted(() => {
      loadCategoryList(route.params.id)
      // 调用函数
      loadBannerList()
    })
    // 在路由跳转之后更新之前自动执行
    // beforeEach((to,from,next)=>{})
    onBeforeRouteUpdate((to) => {
      // to指代的是目标路由对象 to拿到最新的路由参数id
      // 使用最新id获取数据
      loadCategoryList(to.params.id)
    })
    return {
      categroyAllList,
      bannerList
    }
  }
}
</script>

<style scoped lang="less">

.top-category {

  // height: 1500px;
  .goods-item {
    display: block;
    width: 220px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }
    p {
      padding-top: 10px;
    }
    .name {
      font-size: 16px;
    }
    .desc {
      color: #999;
      height: 29px;
    }
    .price {
      color: @priceColor;
      font-size: 20px;
    }
  }
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    // border: 1px solid #000;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }
}
</style>
