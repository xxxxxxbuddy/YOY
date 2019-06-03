<template>
    <div id="container">
      <div class="logo" @click="exitBuyTicket">
        <img src="@/assets/images/LOGO.png" class="logo-icon">
        <img src="@/assets/images/logo-title.png" class="logo-title">
      </div>
      <div class="options" @click="exitBuyTicket">
        <div class="buy-tickets">
          <span class="parent-option" @click.stop="buyTicket" :style="'opacity:' + showTicket + ';display: ' + display1">前往购票
          <i class="el-icon-arrow-right"></i>
          <i class="el-icon-arrow-right"></i>
          </span>
          <span class="child-options" :style="'opacity:' + (1 - showTicket) + ';display: ' + display2">
            <span class="new-ticket" @click="newTicket" :style="'transform: translateX(' + transform1 + ')'">购新票</span>
            <span class="my-ticket" @click="myTicket" :style="'transform: translateX(' + transform2 + ')'">已购票</span>
          </span>
        </div>
        <div class="visit" @click="visit">
          快乐游园
          <i class="el-icon-arrow-right"></i>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
</template>

<script>
import {MessageBox} from 'element-ui'

export default {
  name: 'Main',
  data() {
    return {
      showTicket: 1, // 显示购票子功能
      transform1: 0,
      transform2: 0,
      display1: 'block',
      display2: 'none'
    }
  },
  mounted() {
  },
  methods: {
    buyTicket() {
      this.showTicket = 0;
      this.transform1 = "-80%";
      this.transform2 = "80%";
      setTimeout(() => {
        this.display1 = "none";
        this.display2 = "block";
      }, 100);
    },
    exitBuyTicket() {
      this.showTicket = 1;
      this.transform1 = "100%";
      this.transform2 = "-100%";
      setTimeout(() => {
        this.display1 = "block";
        this.display2 = "none";
      }, 100)
    },

    /**
    * @description 买新票 
    */
    newTicket() {
      this.$axios.get("/TicketPurchase.svc/GetTickets").then(res => {
        if (res.data.code === 0) {
          MessageBox({
            title: "数据请求失败",
            type: "error"
          });
        } else {
          var ticketNum = {};
          for(var i = 1; i < res.data.result.length + 1; i++) {
            ticketNum['T0000' + i] = 0;
          }
          this.$router.push({
            name: 'BuyTicket',
            params: {
              ticketsType: res.data.result,
              ticketNum: ticketNum
            }
          });
        }
      });
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
  background-color: rgba(131, 203, 253, 1);
  height: 100%;
  min-height: 100vh;
}
.logo{
  padding: 10vh 0;
}
.logo-icon{
  width: 40vw;
}
.logo-title{
  width: 80vw;
}
.buy-tickets, .visit{
  color: #fff;
  width: 80vw;
  height: 6rem;
  border: 2px solid #fff;
  border-radius: 3vw;
  text-align: center;
  font-size: 3rem;
  line-height: 2;
  font-weight: 500;
  margin: 5vh auto;
}
.options i{
  font-weight: 1000;
  margin-right: -2rem;
}
.buy-tickets span{
  transition: all 0.3s ease;
}
.buy-tickets{
  position: relative;
}
.parent-option{
  z-index: 2;
  display: block;
}
.child-options span{
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -4.5rem;
}
</style>
