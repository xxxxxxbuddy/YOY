<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
      <Header title="卡管理"></Header>
      <span class="history" @click="HistoryRecord">历史记录</span>
      <div class="header">
        <div class="bg"></div>
        <span class="visitor-name">{{Name}}</span>
        <span class="balance">余额：{{Balance || 0}}元</span>
        <span class="visitorID">VisitorID:&nbsp;&nbsp;&nbsp;&nbsp;{{VisitorID || '获取失败'}}</span>
        <span class="UID">身份证号码:&nbsp;{{UID || '获取失败'}}</span>
      </div>

      <el-card class="top-up">
        <span class="title">选择金额</span>
        <el-radio-group v-model="money" class="choose-money">
          <el-radio :label="10" border>10元</el-radio>
          <el-radio :label="20" border>20元</el-radio>
          <el-radio :label="30" border>30元</el-radio>
          <el-radio :label="50" border>50元</el-radio>
          <el-radio :label="100" border>100元</el-radio>
          <el-radio :label="200" border>200元</el-radio>
        </el-radio-group>
        <span class="tip">
          *退款完成后，金额将按照下面选中的方式返回用户账户
        </span>
      </el-card>

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
      <div class="card-handler" style="text-align: center;width: 100%">
        <el-button type="primary" round size="large" @click="Topup">充值</el-button>
        <el-button round @click="Refund">领款</el-button>
      </div>
    </div>
</template>

<script>
import Header from "@/components/header"; 
import { MessageBox } from "element-ui";

export default {
  components: {
    Header
  },
  data() {
    return {
      money: 10,
      paymentWays: [
        {
          id: 0,
          icon: require("../../assets/images/AliPay.png"),
          name: "支付宝",
          activity: "支付订单，赢1999元红包"
        },
        {
          id: 1,
          icon: require("../../assets/images/wechatPay.png"),
          name: "微信支付",
          activity: "工行信用卡支付，享随机立减"
        },
        {
          id: 2,
          icon: require("../../assets/images/VisaPay.png"),
          name: "银联在线支付",
          activity: ""
        }
      ],
      waysRatio: 0, // 支付方式选择
      Balance: 0,
      VisitorID: window.sessionStorage.getItem('VisitorID') || '',
      UID: '',
      Name: ''
    }
  },
  created() {
    this.GetBalance();
  },
  methods: {
    /**
     * @description 充值
     */
    Topup() {
      this.$axios.post('/CardManagement.svc/Recharge', {
        VisitorID: this.VisitorID || window.sessionStorage.getItem('VisitorID'),
        Amount: this.money,
        PaymentType: this.waysRatio
      })
        .then(res => {
          if(res.data.code === 1) {
            MessageBox({
              type: 'success',
              message: `充值成功！本次充值${this.money}元`
            });
            this.Balance += this.money;
          }else {
            MessageBox({
              type: 'error',
              message: `充值失败！${res.data.errMsg}`
            })
          }
        })
        .catch(e => {
          MessageBox({
            type: 'error',
            message: `充值失败！${e.message}`
          })
        })
    },
    /**
     * @description 退款
     */
    Refund() {
      this.$axios.post('/CardManagement.svc/Refund', {
        VisitorID: this.VisitorID || window.sessionStorage.getItem('VisitorID'),
        Amount: this.money,
        PaymentType: this.waysRatio
      })
        .then(res => {
          if(res.data.code === 1) {
            MessageBox({
              type: 'success',
              message: '退款成功'
            });
            this.Balance -= this.money;
          }else {
            MessageBox({
              type: 'error',
              message: `退款失败！${res.data.errMsg}`
            })
          }
        })
        .catch(e => {
          MessageBox({
            type: 'error',
            message: `退款失败！${e.message}`
          })
        })
    },
    /**
     * @description 历史记录
     */
    HistoryRecord() {
      this.$router.push('HistoryRecord');
    },
    /**
     * @description 获取卡余额
     */
    GetBalance() {
      this.$axios.post('/CardManagement.svc/GetBalance', {
        VisitorID: this.VisitorID || window.sessionStorage.getItem('VisitorID')
      })
        .then(res => {
          console.log(res.data)
          if(res.data.code === 1) {
            if(res.data.result.length !== 0) {
              this.Balance = res.data.result[0].Balance;
              this.UID = res.data.result[0].UID;
              this.Name = res.data.result[0].Name;
            }else {
              MessageBox({
                type: 'info',
                message: '请先绑定卡',
                callback: () => {
                  this.$router.go(-1);
                }
              })
            }
          }
        })
    }
  }
}
</script>

<style>
.history{
  position: fixed;
  top: 0;
  right: 5px;
  z-index: 1000;
  line-height: 4rem;
  font-size: 1.25rem;
}
.header {
  height: 31vh;
  width: 100%;
  position: relative;
  background-color: rgba(131, 203, 253, 1);
}
.bg {
  background: url("../../assets/images/LOGO.png");
  height: 31vh;
  width: 100%;
  z-index: -1;
  background-size: 45%;
  background-repeat: no-repeat;
  background-position: center center;
  filter: opacity(0.3);
}
.header span{
  position: absolute;
}
.visitor-name{
  font-size: 2rem;
  font-weight: bold;
  left: 5vw;
  top: 5vh;
}
.balance{
  font-size: 2rem;
  font-weight: bold;
  right: 5vw;
  top: 5vh;
}
.visitorID{
  font-size: 1.25rem;
  top: 14vh;
  left: 5vw;
}
.UID{
  font-size: 1.25rem;
  top: 18vh;
  left: 5vw;
}
.top-up{
  width: 94vw;
  margin: 0 auto;
  transform: translateY(-8vh);
  z-index: 10;
}
.top-up .title{
  font-size: 1.5rem;
  padding-left: 10px;
  border-left: 2px solid rgba(212, 92, 92, 1);
  display: block;
}
.choose-money{
  margin: 2vh 0;
  width: 100%;
}
.choose-money label{
  margin: 1vh 0 1vh 2vw;
  width: 30%;
  text-align: center;
  border-radius: 1rem !important;
}
.choose-money .el-radio--small.is-bordered .el-radio__label {
  font-size: 1.25rem;
  line-height: 3rem;
}
.choose-money .el-radio--small.is-bordered {
  padding: 0 15px 0 10px;
  height: 3rem;
}
.choose-money .el-radio__input{
  display: none;
}
.choose-money .el-radio.is-bordered+.el-radio.is-bordered {
  margin-left: 2vw;
}
.payment-ways {
  background-color: #fff;
  width: 100%;
  margin: 2vh auto;
  width: 94vw;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 4px;
  transform: translateY(-8vh)
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
.card-handler .el-button.is-round {
  border-radius: 6vw;
  padding: 4vw 15vw;
  font-size: 1.75rem;
  width: 80vw;
  transform: translateY(-8vh);
  margin: 1vh;
}
.way .el-radio {
  float: right;
  margin-right: 2vw;
  line-height: 8vw;
}
.way .el-radio__inner {
  height: 6vw;
  width: 6vw;
}
.way .el-radio__inner::after {
  width: 2vw !important;
  height: 2vw !important;
}
</style>
