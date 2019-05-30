<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="确认订单"></Header>
        <div class="order-detail">
          <span class="store-name">桃花阉饮吧</span>
          <div v-for="item in foodList" :key="item.CommodityID" class="food">
            <img class="image" src="@/assets/images/FoodBG.jpg">
            <span class="food-name">{{item.CommodityName}}</span>
            <span class="food-price">￥{{item.CommodityPrice}}</span><br>
            <span class="food-description">描述：{{item.CommodityInfo}}</span>
            <span class="food-number">×{{item.CommodityNum}}</span>
          </div>
        </div>

        <div class="handle-bar">
            <div class="total-price">
                <div>共{{pieces}}件，合计：{{totalPrice}}元</div>
            </div>
            <el-button type="primary" class="confirm" size="medium" @click="pay">确认支付</el-button>
        </div>
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

    }
  },
  created() {
    this.foodList = this.$route.params.FoodList;
    this.totalPrice = this.$route.params.totalPrice;
    this.pieces = this.$route.params.pieces;
  },
  methods: {
    pay() {
      var list = this.foodList.map(item => {
        return {
          CommodityID: item.CommodityID,
          CommodityNum: item.CommodityNum
        }
      })
      this.$axios.post('/Recommendation.svc/BuyCommodity', {
        VisitorID: window.sessionStorage.getItem('VisitorID'),
        orders: list,
        PaymentType: 4
      }).then(res => {
        if(res.data.code === 1) {
          MessageBox({
            type: 'success',
            message: '支付成功',
            callback: () => {
              this.$route.push('MyOrder')
            }
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

<style scoped>
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
.food-price,.food-number{
  float: right;
  margin-right: 5vw;
}
.food img{
  float: left;
  width: 25vw;
  height: 13vh;
  clear: both;
  margin-right: 2vw;
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
