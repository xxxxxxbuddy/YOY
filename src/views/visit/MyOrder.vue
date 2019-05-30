<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="已支付订单"></Header>
        <el-tabs stretch v-model="activeTab">
            <el-tab-pane label="未取货订单" name="Unused" class="tab">
                <div class="order-detail" v-show="!!UnusedList.length">
                    <span class="store-name">桃花阉饮吧</span>
                    <div v-for="item in UnusedList" :key="item.CommodityID" class="food">
                        <img class="image" :src="require(`@/assets/images/${item.CommodityPic}`)">
                        <span class="food-name">{{item.CommodityName}}</span>
                        <el-button round type="primary" :class="foodButton" :data-OrderID="item.OrderID" :data-CommodityID="item.CommodityID" @click="Refund">退款</el-button>
                        <span class="food-price">￥{{item.CommodityPrice}}</span>
                        <br>
                        <span class="food-description">描述：{{item.CommodityInfo}}</span>
                        <span class="food-number">×{{item.CommodityNum}}</span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="历史订单" name="History">
                <div class="order-detail" v-show="!!HistoryList.length">
                    <span class="store-name">桃花阉饮吧</span>
                    <div v-for="item in HistoryList" :key="item.CommodityID" class="food">
                        <img class="image" :src="require(`@/assets/images/${item.CommodityPic}`)">
                        <span class="food-name">{{item.CommodityName}}</span>
                        <el-button round disabled="disabled" :class="foodButton">已取货</el-button>
                        <span class="food-price">￥{{item.CommodityPrice}}</span><br>
                        <span class="food-description">描述：{{item.CommodityInfo}}</span>
                        <span class="food-number">×{{item.CommodityNum}}</span>
                    </div>
                </div>
                <div class="order-detail" v-show="!!PlayList.length">
                      <div v-for="item in PlayList" :key="item.FacilityID" class="food">
                        <img class="image" src="@/assets/images/FoodBG.jpg">
                        <span class="food-name">{{item.FacilityName}}</span>
                        <span class="food-price">￥{{item.FacilityPrice}}</span><br>
                      </div>
                    </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Header from '@/components/header'
import { MessageBox } from 'element-ui';

export default {
  components: {
    Header
  },
  data() {
    return {
      activeTab: 'Unused',
      foodButton: "food-button",
      UnusedList: [],
      HistoryList: [],
      PlayList: []
    }
  },
  mounted() {
    this.$axios.get(`/Amusement.svc/Order/AvailCommodity/${window.sessionStorage.getItem('VisitorID')}`)
      .then(res => {
        if(res.data.code === 1) {
          this.UnusedList = res.data.result;
        }else {
          MessageBox({
            type: 'error',
            message: res.data.errMsg
          })
        }
      })
      .catch(e => {
        MessageBox({
          type: 'error',
          message: e.message
        })
      })

    this.$axios.get(`/Amusement.svc/Order/UnavailCommodity/${window.sessionStorage.getItem('VisitorID')}`)
      .then(res => {
        if(res.data.code === 1) {
          this.HistoryList = res.data.result;
        }else {
          MessageBox({
            type: 'error',
            message: res.data.errMsg
          })
        }
      })
      .catch(e => {
        MessageBox({
          type: 'error',
          message: e.message
        })
      })
  },
  methods: {
    Refund(e) {
      this.$axios.post('/Amusement.svc/Order/ReturnCommodity', {
        OrderID: e.target.dataset.OrderID,
        CommodityID: e.target.dataset.CommodityID
      }).then(res => {
        if(res.data.code === 1) {
          e.target.innerText = "已退货";
          e.target.parentNode.style.background = '#909399';
          e.target.parentNode.setAttribute('disabled', 'disabled');
          MessageBox({
            type: 'success',
            message: `退货成功！${res.data.ReturnAmount}元已退回您的卡中`
          })
        }else {
          MessageBox({
            type: 'error',
            message: res.data.errMsg
          })
        }
      }).catch(e => {
        MessageBox({
          type: 'error',
          message: e.message
        })
      })
    }
  }
}
</script>

<style>
.food{
  width: 98vw;
  margin: 2vh auto;
  height: 14vh;
  font-size: 1rem;
  line-height: 2;
}
.order-detail{
  background-color: #fff;
  margin: 1vh 0;
  padding: 2vw;
}
.store-name{
  font-size: 1.5rem;
}
.food-name{
  font-size: 1.25rem;
}
.food-description{
  color: rgba(128, 128, 128, 1);
}
.food-button,.food-number, .food-price{
  float: right;
  margin-right: 5vw;
}
.food-button{
  margin-top: -6px;
}
.food img{
  float: left;
  width: 25vw;
  height: 13vh;
  clear: both;
  margin-right: 2vw;
}
.el-tabs__nav-wrap {
  background-color: #fff !important;
}
</style>
