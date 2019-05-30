<template>
  <div style="height: 100%;min-height: 100vh">
    <Header title="已支付"></Header>
    <el-tabs stretch v-model="activeTab">
      <el-tab-pane label="未出行订单" name="Unused">
        <el-card v-for="item in UnusedTickets" :key="item.OrderID" class="card">
          <div class="title">
            <span>游玩时间：{{item.PlayTime}}</span>
            <span class="price">￥{{item.TicketPrice}}</span>
          </div>
          <div class="info">
            <el-button type="primary" round @click="Refund" :data-id="item.OrderID">退票</el-button>
            <span>游客ID：{{item.VisitorID}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{{item.TicketName}}</span><br>
            <span>游园密码：{{item.Password}}</span>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="历史订单" name="History">
        <el-card v-for="item in HistoryTickets" :key="item.OrderID" class="card">
          <div class="title">
            <span>游玩时间：{{item.PlayTime}}</span>
            <span class="price">￥{{item.TicketPrice}}</span>
          </div>
          <div class="info">
            <el-button type="info" disabled round>已消费</el-button>
            <span>游客ID：{{item.VisitorID}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>{{item.TicketName}}</span><br>
              <span>游园密码：{{item.Password}}</span>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import Header from '@/components/header';
export default {
  components: {
    Header
  },
  created() {
    let PhoneNumber = window.sessionStorage.getItem('PhoneNumber');
    this.$axios.get('/TicketPurchase.svc/AvailTickets/' + PhoneNumber).then(res => {
      if(res.data.code === 1) {
        this.UnusedTickets = res.data.result;
      }else {
        MessageBox({
          type: 'error',
          message: '查询失败'
        })
      }
    }).catch(e => {
      MessageBox({
        type: 'error',
        message: '查询失败\n' + e.message
      })
    })

    this.$axios.get('/TicketPurchase.svc/UnavailTickets/' + PhoneNumber).then(res => {
      if(res.data.code === 1) {
        this.HistoryTickets = res.data.result;
      }else {
        MessageBox({
          type: 'error',
          message: '查询失败'
        })
      }
    }).catch(e => {
      MessageBox({
        type: 'error',
        message: '查询失败\n' + e.message
      })
    })
  },
  data() {
    return {
      activeTab: "Unused",
      UnusedTickets: [
        // {
        //   "OrderID": "O2019051500001",
        //   "TicketName": "成人票",
        //   "VisitorID": "V201906020001",
        //   "Password": "140614",
        //   TicketPrice: "240.00",
        //   "PlayTime": "2019-06-02"
        // },
        // {
        //   "OrderID": "O2019051500002",
        //   "TicketName": "成人票",
        //   "VisitorID": "V201906020002",
        //   "Password": "140614",
        //   "PlayTime": "2019-06-02"
        // },
        // {
        //   "OrderID": "O2019051500003",
        //   "TicketName": "儿童票",
        //   "VisitorID": "V201906020003",
        //   "Password": "140614",
        //   "PlayTime": "2019-06-02"
        // }
      ],
      HistoryTickets: [
        // {
        //   "OrderID": "O2019051500001",
        //   "TicketName": "成人票",
        //   "VisitorID": "V201906020001",
        //   "Password": "140614",
        //   TicketPrice: "240.00",
        //   "PlayTime": "2019-06-02"
        // },
        // {
        //   "OrderID": "O2019051500002",
        //   "TicketName": "成人票",
        //   "VisitorID": "V201906020002",
        //   "Password": "140614",
        //   "PlayTime": "2019-06-02"
        // },
        // {
        //   "OrderID": "O2019051500003",
        //   "TicketName": "儿童票",
        //   "VisitorID": "V201906020003",
        //   "Password": "140614",
        //   "PlayTime": "2019-06-02"
        // }
      ]
    }
  },
  methods: {
    Refund(e) {
      this.$axios.get(`/TicketPurchase.svc/Refund/${e.target.dataset.id}`).then(res => {
        if(res.data.code === 1) {
          e.target.innerText = "已退票";
          e.target.parentNode.style.background = '#909399';
          e.target.parentNode.setAttribute('disabled', 'disabled');
        }else {
          MessageBox({
            type: 'error',
            message: '退票失败，' + res.data.errMsg
          })
        }
      }).catch(e => {
        MessageBox({
          type: 'error',
          message: '退票失败，' + e.message
        })
      })
    }
  }
};
</script>

<style scoped>
.card{
  width: 96vw;
  margin: 2vh auto;
}
.card .title{
  border-bottom: 1px dotted rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  line-height: 2;
}
.price{
  float: right;
  color: #409EFF;
}
.info{
  margin: 1vh 0;
  font-size: 1.25rem;
  line-height: 2;
}
.info button{
  float: right;
  margin-right: 7vw;
}
</style>
