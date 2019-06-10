<template>
 <div id="container">
      <div class="back" @click="goBack">
            <i class="el-icon-arrow-left"></i>
      </div>
       <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>
              <img :src="require('@/assets/images/swipeImg1.jpg')" class="swiper" >
          </swiper-slide>
          <swiper-slide>
              <img :src="require('@/assets/images/swipeImg2.jpg')" class="swiper" >
          </swiper-slide>
          <swiper-slide>
              <img :src="require('@/assets/images/swipeImg3.jpg')" class="swiper" >
          </swiper-slide>
          <swiper-slide>
              <img :src="require('@/assets/images/swipeImg4.jpg')" class="swiper" >
          </swiper-slide>
          <swiper-slide>
              <img :src="require('@/assets/images/swipeImg5.jpg')" class="swiper" >
          </swiper-slide>
        <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

         <div class="info">
            <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="28vw" class="infoForm" label-position="left">
                <el-form-item label="手机号码" prop="PhoneNumber">
                    <el-input v-model="infoForm.PhoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" prop="UID">
                    <el-input v-model="infoForm.UID"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div>
          <div class="myticket-login" @click="login">
          <img :src="require('@/assets/images/login.png')" alt="登录">
          <i class="el-icon-right"></i>
        </div>
        </div>
 </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { MessageBox } from "element-ui";
export default {
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
        height: "100%",
        pagination: {
          el: ".swiper-pagination"
        },
        scroolbar: false
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
      // swiperWidth: 345, // 轮播图默认宽度
      swiperHeight: 260, // 轮播图默认高度
      infoForm: {
        PhoneNumber: "",
        UID: ""
      },
      rules: {
        UID: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { min: 18, max: 18, message: "号码无效", trigger: "blur" }
        ],
        PhoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "手机号码长度有误", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiperOption.height =
      document.getElementById("container").offsetWidth * 0.75;
    this.funcHeight =
      document.getElementsByClassName("back")[0].offsetWidth * 0.1;
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    login() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.$axios.post("/TicketPurchase.svc/Login", {
            user: {
              PhoneNumber: this.infoForm.PhoneNumber,
              UID: this.infoForm.UID
            }
          })
            .then(res => {
              if (res.data.code === 1) {
                window.sessionStorage.setItem('PhoneNumber', this.infoForm.PhoneNumber);
                MessageBox({
                  type: "success",
                  message: "登录成功"
                });
                this.$router.push("availTickets"); 
              } else {
                MessageBox({
                  type: "error",
                  message: "信息有误，登录失败"
                });
              }
            })
            .catch(e => {
              MessageBox({
                type: "error",
                message: "登录失败\n" + e.message
              });
            });
        } else {
          MessageBox({
            type: "error",
            message: "请填写个人信息"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
#container {
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
.back {
  position: absolute;
  font-size: 2.5rem;
  z-index: 2;
  line-height: 3rem;
  padding: 0.25rem;
  left: 2vw;
}
.swiper {
  width: 98%;
  padding: 1%;
  border-radius: 5%;
  margin-bottom: 10px;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 30px;
}
.swiper-slide-active {
  height: auto;
}
#functions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.info {
  width: 88vw;
  margin: 10vw auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 4vw;
}
.el-form-item {
  width: 80vw;
}
.myticket-login {
  border-radius: 10vw;
  height: 6rem;;
  background-color: rgba(131, 203, 253, 1);
  width: 90vw;
  margin: 2vh 5vw;
  float: left;
}
.myticket-login img{
  height: 6rem;
  vertical-align: bottom;
}
.myticket-login i{
  line-height: 6rem;
  font-size: 6rem;
  color: #fff;
}
</style>
