<template>
    <div id="container">
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- @someSwiperEvent="callback" -->
        <!-- slides -->
        <swiper-slide>
            <img src="../assets/images/swipeImg1.jpg" class="swiper" >
        </swiper-slide>
        <swiper-slide>
            <img src="../assets/images/swipeImg2.jpg" class="swiper" >
        </swiper-slide>
        <swiper-slide>
            <img src="../assets/images/swipeImg3.jpg" class="swiper" >
        </swiper-slide>
        <swiper-slide>
            <img src="../assets/images/swipeImg4.jpg" class="swiper" >
        </swiper-slide>
        <swiper-slide>
            <img src="../assets/images/swipeImg5.jpg" class="swiper" >
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar" slot="scrollbar"></div> -->
        <!-- <div class="swiper-pagination" style="bottom: 30px"></div> -->
        </swiper>
    
        <div id="functions">
            <!-- 购票子系统 -->
            <div class="buy" @click="buyTicket" :style="'height:' + funcHeight + 'px' ">
                <span class="title">购票</span>
                <transition name="fade">
                    <div class="mask" v-show="showTicket" @click.stop="exitBuyTicket">
                        <div class="new-ticket" @click="newTicket">
                            <span>购新票</span>
                        </div>
                        <div class="my-ticket" @click="myTicket">
                            <span>查询我的票</span>
                        </div>
                    </div>
                </transition>
            </div>
            <!-- 游园子系统 -->
            <div class="visit" @click="visit" :style="'height:' + funcHeight + 'px' ">
                <span class="title">游园</span>
            </div>
            <!-- 管理 -->
            <div class="manage" @click="manage" :style="'height:' + funcHeight + 'px' ">
                <span class="title">管理</span>
            </div>
            <!-- 设置 -->
            <div class="setting" @click="setting" :style="'height:' + funcHeight + 'px' ">
                <span class="title">设置</span>
            </div>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  name: 'Main',
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
        height: '100%',
        pagination: {
          el: '.swiper-pagination'
        },
        scroolbar: false
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
      // swiperWidth: 345, // 轮播图默认宽度
      swiperHeight: 260, // 轮播图默认高度
      funcHeight: 160, // 功能模块默认高度
      showTicket: false // 显示购票子功能
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiperOption.height = document.getElementById('container').offsetWidth * 0.75;
    this.funcHeight = document.getElementsByClassName('buy')[0].offsetWidth;
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    buyTicket() {
      this.showTicket = true;
    },
    exitBuyTicket() {
      this.showTicket = false;
    },

    /**
    * @description 买新票 
    */
    newTicket() {
      this.$router.push('BuyTicket');
    },

    /**
    * @description 我的票
    */
    myTicket() {
      this.$router.push({name: 'MyTicket'});
    },

    /**
    * @description 游园
    */
    visit() {
      this.$router.push('visitorLogin'); // 
    },

    /**
    * @description 管理
    */
    manage() {
      this.$router.push('manage');
    },

    /**
    * @description 设置
    */
    setting() {
      this.$router.push('setting');
    }
  }
};
</script>

<style scoped>
body{
  font-family: 微软雅黑 ,'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin: 0;
  padding: 0;
}
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  background-color: #FEF9E5;
  height: 100%;
  min-height: 100vh;
}
.swiper{
  width: 98%;
  padding: 1%;
  border-radius: 5%;
  margin-bottom: 10px;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 30px;
}
.swiper-slide-active{ height:auto;}
#functions{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#functions>div{
  position: relative;
  width: 48%;
  border-radius: 10%;
  margin: 1%;
  cursor: pointer;
}
.title{
  position: absolute;
  left: 8%;
  top: 4%;
  color: #fff;
  font-size: 1.5rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.buy{
  background-color: rgba(255, 59, 48, 1);
  background-image: url('../assets/images/bike.png');
  background-size: 53% 67%;
  background-repeat: no-repeat;
  background-position: right 80%;
  box-shadow: 0 2px 6px 0 rgba(255, 59, 48, 1);
}
.buy .mask{
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10%;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.new-ticket, .my-ticket{
  overflow: hidden;
  position: absolute;
  width: 70%;
  background-color: rgba(250, 61, 49, 1);
  z-index: 3;
  color: #fff;
  left: 50%;
  margin-left: -36%;
  height: 30%;
  border-radius: 10px;
  padding: 1%;
  font-size: 1.1rem;
}
.new-ticket::before, .my-ticket::before{
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.buy span{
  display: inline-block;
}
.new-ticket{
  top: 24px;
}
.my-ticket{
  bottom: 24px;
}
.visit{
  background-color: rgba(121, 200, 166, 1);
  background-image: url('../assets/images/dandelion.png');
  background-size: 80% 66%;
  background-position: bottom center;
  background-repeat: no-repeat;
  box-shadow: 0 2px 6px 0 rgba(121, 200, 166, 1);
}
.manage{
  background-color: rgba(130, 198, 230, 1);
  background-image: url('../assets/images/peach.png');
  background-position: center 80%;
  background-size: 75% 54%;
  background-repeat: no-repeat;
  box-shadow: 0 2px 6px 0 rgba(130, 198, 230, 1);
}
.setting{
  background-color: rgba(9, 107, 145, 1);
  background-image: url('../assets/images/moon.png');
  background-position: center center;
  background-size: 82% 87%;
  background-repeat: no-repeat;
  box-shadow: 0 2px 6px 0 rgba(9, 107, 145, 1);
}
</style>
