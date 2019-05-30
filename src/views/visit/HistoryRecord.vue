<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="历史记录"></Header>
        <el-table :data="historyRecord" style="width: 96vw;margin: 1vh auto" stripe >
          <el-table-column prop="PaymentTime" label="日期" width="200"></el-table-column>
          <el-table-column prop="PaymentAmount" label="金额"></el-table-column>
          <el-table-column prop="PaymentType" label="充值/退款方式"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import Header from '@/components/header'
import { MessageBox } from 'element-ui';
import {formatDate} from '@/util/format.js'

export default {
  components: {
    Header
  },
  data() {
    return {
      historyRecord: [
        {
          OrderID: "123",
          OrderState: 1,
          Amount: 20,
          PaymentType: 0,
          PaymentTime: "xxxx"
        },
        {
          OrderID: "1234",
          OrderState: 1,
          Amount: 20,
          PaymentType: 0,
          PaymentTime: 'xxxx'
        } 
      ]
    }
  },
  mounted() {
    this.$axios.post('/CardManagement.svc/CardRecord', {
      VisitorID: window.sessionStorage.getItem('VisitorID') // 'V201905140001'
    })
      .then(res => {
        console.log(res)
        if(res.data.code === 1) {
          res.data.result.forEach(item => {
            item.PaymentTime = formatDate(new Date(item.PaymentTime), 'yyyy-MM-dd hh:mm:ss');
            item.PaymentType = this.getPaymentType(item.OrderState, item.PaymentType);
          })
          this.historyRecord = res.data.result;
        }else {
          MessageBox({
            type: 'error',
            message: `获取信息失败${res.data.errMsg}`
          })
        }
      })
      .catch(e => {
        MessageBox({
          type: 'error',
          message: `获取信息失败${e.message}`
        })
      })
  },
  methods: {
    getPaymentType(state, type) {
      let str = '';
      switch(type) {
        case 0: str = '支付宝'; break;
        case 1: str = '微信'; break;
        case 2: str = '银联'; break;
        case 3: str = '现金'; break;
      }
      if(state === 1) {
        return str + '充值';
      }else {
        return str + '退款';
      }
    }
  }
}
</script>

<style>
.records{
  background-color: #fff;
  width: 98vw;
  height: 3rem;
  margin: 1vh auto;
}
.records span{
  float: left;
  margin: 0 5vw 0 2vw;
  line-height: 3rem;
  font-size: 1.25rem;
}
</style>
