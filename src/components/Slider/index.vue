<template>
  <div class="box" style="height: 500px">
    <div class="xtx-slider" @mouseenter="clearTimer" @mouseleave="startTimer">
      <!-- 图片列表 -->
      <ul class="slider-body">
        <!--
          fade: 当fade类名存在 当前图片就显示 不存在就不显示
         -->
        <li
          class="slider-item"
          v-for="(item, i) in sliders"
          :key="i"
          :class="{ fade: curIndex === i }"
        >
          <img :src="item.imgUrl" alt="" />
        </li>
      </ul>
      <!-- 圆圈切换按钮 -->
      <div class="slider-indicator">
        <span
          v-for="(item, index) in sliders"
          :key="index"
          @click="curIndex = index"
          :class="{ active: curIndex === index }"
        ></span>
      </div>
      <!-- 点击切换按钮 -->
      <div class="NEXTimg" :class="{ leftPad: isNeedLeft }">
        <span
          style="position: absolute; left: 0; margin-left: 20px"
          @click="nextImg"
        >
          <svg
            t="1635993718702"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2544"
            width="45px"
            height="45px"
          >
            <path
              d="M512.269015 1024a511.992548 511.992548 0 1 1 511.73106-511.73106 512.515523 512.515523 0 0 1-511.73106 511.73106z m0-971.426105a459.695045 459.695045 0 1 0 459.433557 459.695045A460.21802 460.21802 0 0 0 512.269015 52.573895z"
              p-id="2545"
              fill="#ffffff"
            ></path>
            <path
              d="M625.236897 279.958209m17.289056 19.617485l0 0q17.289056 19.617486-2.32843 36.906542l-221.089062 194.847658q-19.617486 17.289056-36.906541-2.32843l0 0q-17.289056-19.617486 2.32843-36.906541l221.089062-194.847658q19.617486-17.289056 36.906541 2.328429Z"
              p-id="2546"
              fill="#ffffff"
            ></path>
            <path
              d="M659.589773 705.350265m-17.289056 19.617485l0 0q-17.289056 19.617486-36.906541 2.32843l-221.089061-194.847658q-19.617486-17.289056-2.32843-36.906542l0 0q17.289056-19.617486 36.906541-2.328429l221.089062 194.847658q19.617486 17.289056 2.328429 36.906541Z"
              p-id="2547"
              fill="#ffffff"
            ></path>
          </svg>
        </span>
        <span
          style="position: absolute; right: 0; margin-right: 20px"
          @click="nextImgTow"
        >
          <svg
            t="1635993818610"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3010"
            width="50px"
            height="50px"
          >
            <path
              d="M511.091 960.558c-60.438 0-119.086-11.844-174.313-35.203-53.328-22.556-101.213-54.839-142.329-95.954-41.115-41.114-73.398-89.001-95.954-142.328-23.359-55.228-35.204-113.875-35.204-174.314 0-60.438 11.844-119.086 35.204-174.313 22.555-53.328 54.839-101.213 95.954-142.329 41.115-41.115 89.001-73.398 142.329-95.954 55.228-23.359 113.875-35.204 174.313-35.204 60.439 0 119.086 11.844 174.314 35.204 53.327 22.555 101.214 54.839 142.328 95.954 41.115 41.115 73.398 89.001 95.954 142.329 23.359 55.228 35.203 113.875 35.203 174.313 0 60.439-11.844 119.086-35.203 174.314-22.556 53.327-54.839 101.214-95.954 142.328-41.114 41.115-89.001 73.398-142.328 95.954-55.227 23.359-113.875 35.203-174.314 35.203z m0-831.599c-211.627 0-383.799 172.172-383.799 383.799s172.172 383.799 383.799 383.799S894.89 724.385 894.89 512.758 722.719 128.959 511.091 128.959z"
              fill="#ffffff"
              p-id="3011"
            ></path>
            <path
              d="M606.587 480.111c8.063 0 16.133 3.028 22.357 9.107 12.643 12.349 12.881 32.609 0.532 45.252L440.485 727.96c-12.348 12.643-32.61 12.88-45.251 0.532-12.644-12.349-12.882-32.609-0.532-45.252l188.99-193.49c6.27-6.418 14.579-9.639 22.895-9.639z"
              fill="#ffffff"
              p-id="3012"
            ></path>
            <path
              d="M417.406 286.103a31.88 31.88 0 0 1 21.536 8.34l199.984 182.105c13.067 11.898 14.014 32.138 2.115 45.205-11.899 13.066-32.139 14.015-45.205 2.115L395.852 341.763c-13.067-11.898-14.015-32.138-2.115-45.205 6.314-6.933 14.978-10.455 23.669-10.455z"
              fill="#ffffff"
              p-id="3013"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/**
   目标：点击圆圈按钮 实现对应图片的切换
   思路：
    1. 图片和圆圈按钮数量是一样的 下标值是对应的
    2. 记录一下当前点击的是哪一项
    3. 需要根据记录下来的下标值 去配合:class 控制fade这个类名是否应该显示
 */

/**
    目标：图片的自动轮播功能
    思路：哪个数据变化决定了图片切换？ 从之前手动修改curIndex的值 变成一个自动修改 每隔几秒修改一下
         计时器  setInterval

 */

/**
    目标：鼠标移入暂停播放 鼠标移除再次开启
    思路：暂停 - 清除定时器  定时器id  开启 - 再执行一次定时器

 */
import { onMounted, onUnmounted, ref } from 'vue'
export default {
  name: 'XtxSlider',
  props: {
    // 数据列表
    sliders: {
      type: Array,
      default: () => {
        return []
      }
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    isNeedLeft: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const curIndex = ref(0)
    // 声明一个存放定时器的数据
    const timer = ref(null)
    function clearTimer () {
      // console.log('进入')
      clearInterval(timer.value)
    }
    function startTimer () {
      // 开启定时器  每隔2s中修改一下curIndex的值
      initLoop()
    }

    function initLoop () {
      if (!props.autoPlay) {
        return false
      }
      // 开启定时器  每隔2s中修改一下curIndex的值
      timer.value = window.setInterval(() => {
        // 最大能到多大
        // 图片总数为4 length - 1为3 只要我发现你大于3了
        // 我就会重新赋值为 0 ,永远不能到达4 最大只能等于3
        curIndex.value++
        if (curIndex.value > props.sliders.length - 1) {
          curIndex.value = 0
        }
      }, 2000)
    }
    // 点击上一页
    function nextImg () {
      if (curIndex.value === 0) {
        curIndex.value = 4
      } else {
        curIndex.value--
      }
    }
    // 点击下一页
    function nextImgTow () {
      // console.log(curIndex.value)
      if (curIndex.value === 4) {
        curIndex.value = 0
      } else {
        curIndex.value++
      }
    }
    onMounted(() => {
      initLoop()
    })
    onUnmounted(() => {
      // 清理工作
      clearInterval(timer.value)
    })
    return {
      curIndex,
      clearTimer,
      startTimer,
      nextImg,
      nextImgTow
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-slider {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .NEXTimg {
    position: absolute;
    top: 50%;
    right: 0;
    background-color: rgb(92, 179, 41);
    width: 100%;
    z-index: 1;
    display: none;
    span {
      cursor: pointer;
    }
  }
  .slider {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .slider-btn {
      opacity: 1;
    }
    .NEXTimg {
      display: block;
      &.leftPad {
        width: 80%;
      }
    }
  }
}
</style>
