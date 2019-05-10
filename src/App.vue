<template>
  <div id="app">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- @someSwiperEvent="callback" -->
      <!-- slides -->
      <swiper-slide>
        <img src="./assets/images/swipeImg1.jpg" class="swiper" :style="'height: ' + swiperHeight + 'px'" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="./assets/images/swipeImg1.jpg" class="swiper" :style="'height: ' + swiperHeight + 'px'" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="./assets/images/swipeImg1.jpg" class="swiper" :style="'height: ' + swiperHeight + 'px'" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  name: 'App',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 1000,
          disableOnInteraction: true
        },
        speed: 2000,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        scroolbar: false
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
      swiperHeight: 260
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
  },
  mounted() {
    this.swiperHeight = document.getElementsByClassName('swiper')[0].width * 0.75;
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.swiper{
  width: 95%;
  border-radius: 5%;
}
</style>
