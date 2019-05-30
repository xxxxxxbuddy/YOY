<template>
    <div class="container" style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="提交订单"></Header>

        <div class="tickets">
          <div class="base-info">
            <span>游无忧游乐园</span>
            <span>游玩日期：{{baseDate.date}} {{baseDate.day}}</span>
          </div>
          <div class="ticket-type" v-for="item in ticketsType" :key="item.TicketID">
              <img class="ticket-image" src="../../assets/images/adult.png" alt> 
              <!-- :src="require('../assets/images/' + item.TicketPic)" -->
              <span class="ticket-name">{{item.TicketName}}</span>
              <span class="ticket-num">X{{ticketNum[item.TicketID]}}</span>
              <span class="ticket-description">{{item.TicketInfo}}</span>
              <span class="ticket-price">￥{{item.TicketPrice}}</span>
          </div>
        </div>

        <div class="info">
            <h2>购票人信息</h2>
            <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="28vw" label-position="left">
                <el-form-item label="姓名" prop="Name">
                    <el-input v-model="infoForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" prop="UID">
                    <el-input v-model="infoForm.UID"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="PhoneNumber" style="white-space: nowrap;">
                    <el-input v-model="infoForm.PhoneNumber" style="width: 32vw"></el-input>
                    <el-button type="primary" round>发送验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="VerifyNumber">
                    <el-input v-model="infoForm.VerifyNumber"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <div class="tip">
          <el-checkbox label="已阅读并勾选同意《购票须知》和《入园须知》" v-model="tip"></el-checkbox>
        </div>
        <div class="handle-bar">
            <div class="total-price">
                <div>合计：{{totalPrice}}元</div>
            </div>
            <el-button type="primary" class="confirm" size="medium" @click="order">确认预定</el-button>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import Header from '../../components/header';

export default {
  components: {
    Header
  },
  data() {
    return {
      totalPrice: 0,
      infoForm: {
        Name: '',
        UID: '',
        PhoneNumber: '',
        VerifyNumber: ''
      },
      rules: {
        Name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在2-10个字符内', trigger: 'blur'}
        ],
        UID: [
          {required: true, message: '请输入身份证号码', trigger: 'blur'},
          {min: 18, max: 18, message: '号码无效', trigger: 'blur'}
        ],
        PhoneNumber: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 11, max: 11, message: '手机号码长度有误', trigger: 'blur'}
        ],
        VerifyNumber: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 6, max: 6, message: '验证码有误', trigger: 'blur'}
        ]
      },
      ticketsType: [],
      ticketNum: {},
      orderDate: '',
      tip: false,
      baseDate: {
        date: '',
        day: ''
      }
    }
  },
  created() {
    console.log(this.$route.params);
    try {
      this.ticketsType = this.$route.params.ticketsType;
      this.ticketNum = this.$route.params.ticketNum;
      this.totalPrice = this.$route.params.totalPrice;
      this.orderDate = this.$route.params.orderDate;
      let day = this.$route.params.orderDate.getDay();
      switch(day) {
        case 1: day = "星期一"; break;
        case 2: day = "星期二"; break;
        case 3: day = "星期三"; break;
        case 4: day = "星期四"; break;
        case 5: day = "星期五"; break;
        case 6: day = "星期六"; break;
        case 7: day = "星期日"; break;
      }
      this.baseDate.date = this.$route.params.orderDate.toLocaleDateString().replace(/\//g, '-');
      this.baseDate.day = day;
    }catch(e) {
      this.$router.push('BuyTicket');
    }
  },
  methods: {
    /**
     * @description 确认预定 进入付款页面
     */
    order() {
      this.$refs.infoForm.validate(valid => {
        if(valid) {
          if(this.tip) {
            let orders = [];
            this.ticketsType.forEach(item => {
              orders.push({
                CommodityID: item.TicketID,
                CommodityNum: this.ticketNum[item.TicketID]
              })
            });
            this.$router.push({
              name: 'payment',
              params: {
                time: new Date(),
                totalPrice: 240,
                ticketsType: this.ticketsType,
                ticketNum: this.ticketNum,
                userInfo: this.infoForm,
                orderDate: this.orderDate
              }
            })
          } else {
            MessageBox({
              type: 'error',
              message: '请勾选同意《购票须知》和《入园须知》'
            })
          }
        } else {
          MessageBox({
            type: 'error',
            message: '请填写个人信息'
          })
        }
      })
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.tickets {
  width: 100%;
  margin: 0 0 10px 0;
  background-color: #fff;
}
.base-info{
  padding: 2vw;
}
.base-info> span:first-of-type{
  font-size: 1.75rem;
  display: block;
  margin: 1vh 0;
}
.base-info>span:last-of-type{
  font-size: 1.25rem;
  color: rgba(80, 80, 80, 1);
}
.ticket-type {
  height: 13vh;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  margin: 2vw 0;
}
.ticket-type:first-child{
    margin-top: 0;
}
.ticket-image,
.ticket-name,
.ticket-description,
.ticket-num,
.ticket-price {
  float: left;
  margin: 1vw 0;
}
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
  width: 50vw;
}
.ticket-num{
  font-size: 1rem;
  color: rgba(80, 80, 80, 1);
}
.ticket-description {
  font-size: 1rem;
  color: rgba(80, 80, 80, 1);
}
.ticket-price {
  width: 20vw;
  font-size: 1rem;
  color: rgba(212, 48, 48, 1);
}
.info{
    width: 88vw;
    margin: 10vw auto;
    background-color: #fff;
    border-radius: 5px;
    padding: 4vw;
}
.el-form-item{
    width: 80vw;
}
.tip{
  position: fixed;
  bottom: 7vh;
  width: 100%;
  text-align: center;
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
