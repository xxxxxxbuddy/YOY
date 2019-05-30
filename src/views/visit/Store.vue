<template>
    <div>
        <Header title="商品"></Header>
        <el-card class="card" v-for="item in foodList" :key="item.CommodityID" >
            <img class="image" :src="require(`@/assets/images/${item.CommodityPic}`)">
                <div style="margin-left: 35vw;position: relative">
                    <span class="name">{{item.CommodityName}}</span>
                    <el-input-number class="input-number" v-model="foodNum[item.CommodityID]" :min="0" :max="10" :label="item.FoodName"></el-input-number><br>
                    <span class="info">￥{{item.CommodityPrice}}</span><br>
                    <span>描述{{item.CommodityInfo}}</span><br>     
                </div>
        </el-card>
        <div class="handle-bar">
            <div class="total-price">
                <i class="el-icon-shopping-cart-1"></i>
                <div>{{totalPrice}}元</div>
            </div>
            <el-button type="primary" class="pay" size="medium" @click="pay">去结算</el-button>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
import {MessageBox} from 'element-ui'

export default {
  components: {
    Header
  },
  data() {
    return {
      foodList: this.$route.params.foodList || [],
      foodNum: this.$route.params.foodNum || {}
    }
  },
  mounted() {
    
  },
  computed: {
    totalPrice() {
      var total = 0;
      let i = 0;
      Object.keys(this.foodNum).forEach(item => {
        total = total + this.foodNum[item] * this.foodList[i].CommodityPrice;
        i++;
      })
      return total;
    }
  },
  methods: {
    /**
    * @description   结算
    */
    pay() {
      let pieces = 0;
      let FoodList = this.foodList.filter(item => {
        if(this.foodNum[item.CommodityID] > 0) {
          item.CommodityNum = this.foodNum[item.CommodityID];
          pieces += item.CommodityNum;
          return item;
        }        
      })
      if(pieces === 0) {
        MessageBox({
          type: 'info',
          message: '您还未选择商品'
        });
        return;
      }
      this.$router.push({
        name: 'Order',
        params: {
          totalPrice: this.totalPrice,
          FoodList: FoodList,
          pieces: pieces
        }
      })
    }
  }
}
</script>

<style scoped>
.image{
    width: 35vw;
    height: 100%;
    float: left;
    margin-right: 2vw;
}
.card{
    line-height: 1.5;
    width: 96vw;
    margin: 1vh auto;
}
.card span{
    font-size: 1rem;
    line-height: 2;
}
.name{
    font-size: 1.5rem !important;
}
.input-number{
    position: absolute;
    top: 0;
    right: -4vw;
    width: 26vw;
}
.handle-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6vh;
  font-size: 1.25rem;
  font-size: 0;
  z-index: 10;
  position: absolute;
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
.total-price i{
    position: absolute;
    line-height: 6vh;
    font-size: 3.5rem;
    left: 10vw;
    color: #409EFF;
}
.pay {
  width: 40%;
  font-size: 1.25rem;
  border-radius: 0;
}
</style>
