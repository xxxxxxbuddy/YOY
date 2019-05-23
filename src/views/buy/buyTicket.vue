<template>
  <div style="height: 100%">
      <div class="header">
        <div class="bg">
          <div class="back" @click="goBack">
            <i class="el-icon-arrow-left"></i>
          </div>
        </div>
        <div class="card">
          <div class="title">游无忧游乐园</div>
          <div class="tips">入园须知</div>
          <div class="time">
            <img src="../../assets/images/time.svg" alt>
            开放时间 9:30-21:30
          </div>
          <div class="address">
            <img src="../../assets/images/address.svg" alt>
            湖北·武汉市·关山大道
          </div>
        </div>
      </div>

    <div class="choose">
      <div class="choose-date">
        <span class="demonstration">选择日期</span>
        <el-date-picker
          v-model="orderDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>

    <div class="tickets">
      <div class="ticket-type" v-for="item in ticketsType" :key="item.TicketID">
        <img class="ticket-image" :src="item.TicketPic" alt> 
        <span class="ticket-name">{{item.TicketName}}</span>
        <span class="ticket-description">{{item.TicketInfo}}</span>
        <span class="ticket-price">￥{{item.TicketPrice}}</span>
        <el-input-number
          class="input-number"
          v-model="ticketNum[item.TicketID]"
          :precision="0"
          @change="numChange"
          :min="0"
          :max="100"
          :label="item.name"
        ></el-input-number>
      </div>
    </div>

    <div class="handle-bar">
      <div class="total-price">
        <div>合计：{{totalPrice}}元</div>
      </div>
      <el-button type="primary" class="confirm" size="medium" @click="order">确认预定</el-button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      orderDate: "",
      ticketsType: [
        {
          TicketID: 0,
          TicketName: "成人票",
          TicketPrice: 200,
          TicketInfo: "适用于成人或身高>1.5米的儿童",
          TicketPic: require("@/assets/images/adult.png")
        },
        {
          TicketID: 1,
          TicketName: "儿童票",
          TicketPrice: 150,
          TicketInfo: "适用于身高<1.5米的儿童",
          TicketPic: require("@/assets/images/child.png")
        }
      ],
      ticketNum: {
        T00001: 0,
        T00002: 0
      }
    };
  },
  methods: {
    numChange() {},
    /**
     * @description 跳转到支付确认页面
     */
    order() {
      // 先验证信息是否选择完全
      if(this.orderDate === "") {
        MessageBox({
          type: 'info',
          message: '请选择日期'
        });
      }else if(this.ticketNum.T00001 === 0 && this.ticketNum.T00002 === 0) {
        MessageBox({
          type: 'info',
          message: '请选择购票数量'
        });
      }else{
        let orderType = this.ticketsType.filter(item => this.ticketNum[item.TicketID] > 0)
        this.$router.push({
          name: 'confirm',
          params: {
            orderDate: this.orderDate,
            ticketNum: this.ticketNum,
            ticketsType: orderType,
            totalPrice: this.totalPrice
          }
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    totalPrice() {
      return (
        this.ticketNum.T00001 * this.ticketsType[0].TicketPrice +
        this.ticketNum.T00002 * this.ticketsType[1].TicketPrice
      );
    }
  },
  created() {
    const _this = this;
    this.$axios.get("http://39.98.221.147:8009/TicketPurchase.svc/GetTickets").then(res => {
      if (res.data.code === 0) {
        MessageBox({
          title: "数据请求失败",
          type: "error",
          center: true,
          callback: () => {
            this.$router.go(-1);
          }
        });
      } else {
        if (res.data.result.length > 0) {
          res.data.result.forEach(item => {
            item.TicketPic = require('@/assets/images/' + item.TicketPic);
          })
          this.ticketsType = res.data.result;
        }
      }
    });
  }
};
</script>

<style scoped>
.header {
  height: 39vh;
  width: 100%;
  position: relative;
}
.bg {
  background: url("../../assets/images/buyTicketBG.jpg");
  height: 31vh;
  width: 100%;
  z-index: -1;
  background-size: cover;
  filter: brightness(0.6);
}
.back {
  position: absolute;
  font-size: 1.5rem;
  z-index: 2;
  line-height: 3rem;
  padding: 0.25rem;
  left: 2vw;
}
.card {
  height: 28vw;
  width: 86vw;
  border-radius: 16px;
  box-shadow: 0px 6px 6px 0px rgba(203, 202, 202, 0.5);
  z-index: 2;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  left: 50%;
  margin-left: -47vw;
  padding: 6vw 4vw;
}
.title {
  float: left;
  margin-left: 25px;
  font-size: 1.75rem;
  font-weight: bold;
}
.tips {
  float: right;
  color: rgba(255, 87, 51, 1);
  margin-right: 25px;
  font-size: 1.3rem;
}
.time {
  margin-top: 6vw;
  float: left;
  color: rgba(80, 80, 80, 1);
  font-size: 1.3rem;
  clear: both;
}
.address {
  float: left;
  color: rgba(80, 80, 80, 1);
  font-size: 1.3rem;
  clear: both;
  margin-top: 4vw;
}
.time img,
.address img {
  width: 1rem;
  height: 1rem;
}
.choose-date {
  padding: 30px 0;
  text-align: center;
  border-right: 1px solid #eff2f6;
  flex: 1;
  background-color: #fff;
  box-shadow: 0px 6px 6px 0px rgba(203, 202, 202, 0.5);
  width: 96vw;
  margin: 0 auto;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.tickets {
  width: 100%;
  margin: 20px 0;
}
.ticket-type {
  height: 13vh;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  margin: 2vw 0;
}
.ticket-image,
.ticket-name,
.ticket-description,
.ticket-price {
  float: left;
  margin: 1vw 0;
}
.ticket-name,
.ticket-description {
  clear: right;
  width: 70vw;
}
.ticket-image {
  width: 20vw;
  height: 20vw;
  margin: 10px;
  clear: left;
}
.ticket-name {
  font-size: 1.25rem;
  line-height: 1.5rem;
}
.ticket-description {
  font-size: 1rem;
  color: rgba(80, 80, 80, 1);
}
.ticket-price {
  font-size: 1rem;
  color: rgba(212, 48, 48, 1);
}
.input-number {
  float: right;
  margin-right: 5vw;
}
.handle-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6vh;
  font-size: 1.25rem;
  font-size: 0;
  z-index: 10;
}
.handle-bar > * {
  display: inline-block;
  height: 6vh;
}
.total-price {
  width: 60%;
  text-align: center;
  background-color: #fff;
  line-height: 6vh;
  font-size: 1.25rem;
}
.confirm {
  width: 40%;
  font-size: 1.25rem;
  border-radius: 0;
}
</style>
