<template>
  <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
    <div class="mask" v-show="payed"></div>
    <Header title="订单支付"></Header>
    <div v-loading="paying" class="container">
      <div class="payment-info">
        <div class="price">
          <span>在线支付：</span>
          <span>￥{{totalPrice}}</span>
        </div>
        <div class="remained-time" v-show="!payed">
          <span>剩余支付时间：</span>
          <span>{{!remainedTime.minute ? '' : remainedTime.minute + '分'}}{{remainedTime.second}}秒</span>
        </div>
        <!-- <div class="ticket-id">
          <div>票据编号:</div>
          <span v-for="item in orderId" :key="item">{{item}}</span>
        </div> -->
      </div>
      <div class="payment-ways">
        <el-radio-group v-model="waysRatio" style="width: 100%">
          <div class="way" v-for="item in paymentWays" :key="item.id">
            <img :src="item.icon" alt>
            <span>{{item.name}}</span>
            <span>{{item.activity}}</span>
            <el-radio :label="item.id">&nbsp;</el-radio>
          </div>
        </el-radio-group>
      </div>
      <div style="text-align: center;margin: 5vh 0">
        <el-button type="primary" round size="large" @click="pay">￥{{totalPrice}},立即支付</el-button>
      </div>

      <div class="toast" v-show="payed">
        <i class="el-icon-success"></i>
        <div class="ticket-id">
          <div>票据编号:</div>
          <span v-for="item in orderId" :key="item">{{item}}</span>
        </div>
        <el-button type="success" @click="navigateToPayed">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import Header from "@/components/header";
import {formatDate} from '@/util/format'

export default {
  components: {
    Header
  },
  data() {
    return {
      totalPrice: 240,
      remainedTime: {
        minute: 0,
        second: 0
      },
      paymentWays: [
        {
          id: 0,
          icon: require("@/assets/images/AliPay.png"),
          name: "支付宝",
          activity: "支付订单，赢1999元红包"
        },
        {
          id: 1,
          icon: require("@/assets/images/wechatPay.png"),
          name: "微信支付",
          activity: "工行信用卡支付，享随机立减"
        },
        {
          id: 2,
          icon: require("@/assets/images/VisaPay.png"),
          name: "银联在线支付",
          activity: ""
        }
      ],
      waysRatio: 0, // 支付方式选择
      paying: false, // 是否在处理中
      orderId: [],
      payed: false
    };
  },
  created() {
    try{
      this.totalPrice = this.$route.params.totalPrice.toFixed(2);
    }catch(e) {
      this.$router.push('/');
    }
  },
  mounted() {
    // 倒计时
    if (this.$route.params.time !== undefined) {
      var intervalID = setInterval(() => {
        var now = new Date();
        var diff = 1800000 - (now - this.$route.params.time);
        if (diff > 0) {
          diff = new Date(diff);
          this.remainedTime = {
            minute: diff.getMinutes(),
            second: diff.getSeconds()
          };
        } else {
          // 已超时
          // MessageBox({
          //   type: "error",
          //   message: "订单已超时",
          //   callback: () => {
          //     this.$router.go(-2);
          //     clearInterval(intervalID);
          //   }
          // });
        }
      }, 1000);
    }else{
      this.$router.push('/');
    }
  },
  methods: {
    /**
     * @description 支付
     */
    pay() {
      this.paying = true;
      let orders = [];
      if(this.$route.params.ticketsType) {
        // 购票
        this.$route.params.ticketsType.forEach(item => {
          orders.push({
            CommodityID: item.TicketID,
            CommodityNum: this.$route.params.ticketNum[item.TicketID]
          })
        })
        this.$axios.post('/TicketPurchase.svc/BuyTickets', {
          user: {
            PhoneNumber: this.$route.params.userInfo.PhoneNumber,
            UID: this.$route.params.userInfo.UID,
            Name: this.$route.params.userInfo.Name
          },
          DoneTime: formatDate(this.$route.params.orderDate, 'yyyy-MM-dd'),
          PaymentType: this.waysRatio,
          orders: orders,
          VerificationCode: this.$route.params.userInfo.VerifyNumber
        }).then(res => {
          console.log(res);
          this.paying = false;
          if(res.data.code === 1) {
            window.sessionStorage.setItem('PhoneNumber', this.$route.params.userInfo.PhoneNumber);
            this.orderId = res.data.result;
            this.payed = true;
          } else {
            MessageBox({
              type: 'error',
              message: `支付失败 ${res.data.errMsg}`
            })
          }
        }).catch(e => {
          console.error(e);
          MessageBox({
            type: 'error',
            message: '支付失败'
          })
        })
      } else {
        // 购买商品
        this.$axios.post('', {

        })
      } 
    },
    /** 
     *  @description 跳转到“已支付”页
     */
    navigateToPayed() {
      this.$router.push('AvailTickets');
    }
  }
};
</script>

<style scoped lang='less'>
.payment-info,
.payment-ways {
  background-color: #fff;
  width: 100%;
}
.price,
.remained-time{
  font-size: 1.5rem;
  line-height: 3rem;
  height: 3rem;
  padding: 2vw;
}
.ticket-id{
  position: relative;
}
.ticket-id>div{
  position: absolute;
  font-size: 1.5rem;
  line-height: 3rem;
  height: 3rem;
  left: 2vw;
}
.ticket-id span{
  display: block;
  font-size: 1.25rem;
  line-height: 3rem;
  margin: 0 auto;
}
.ticket-id span:last-of-type{
  margin-bottom: 7vh;
}
.price {
  border-bottom: 1px dotted rgba(0, 0, 0, 0.3);
}
.price span:last-child {
  color: rgba(44, 166, 252, 1);
}
.payment-ways {
  margin: 2vh 0;
  width: 100%;
}
.way {
  width: 100%;
  height: 8vw;
  padding: 2vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.way img {
  width: 8vw;
  height: 8vw;
  vertical-align: middle;
}
.way span:first-of-type {
  font-size: 1.5rem;
  vertical-align: bottom;
  line-height: 8vw;
  margin-right: 2vw;
}
.way span:last-of-type {
  font-size: 1.25rem;
  color: rgba(80, 80, 80, 1);
  line-height: 8vw;
  vertical-align: bottom;
}
/deep/ .el-button.is-round {
  border-radius: 6vw;
  padding: 4vw 15vw;
  font-size: 1.75rem;
}
/deep/ .el-radio {
  float: right;
  margin-right: 2vw;
  line-height: 8vw;
}
/deep/ .el-radio__inner {
  height: 6vw;
  width: 6vw;
}
/deep/ .el-radio__inner::after {
  width: 2vw !important;
  height: 2vw !important;
}
.mask{
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  width: 100vw;
  z-index: 9;
  position: absolute;
}
.toast{
  z-index: 10;
  position: absolute;
  width: 80vw;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.toast i{
  font-size: 22vw;
  color: #67C23A;
}
.toast button{
  position: absolute;
  bottom: 2vh;
  left: 50%;
  transform: translateX(-50%);
}
.container{
  height: 100%;
  min-height: 100vh - 4rem;
}
</style>
