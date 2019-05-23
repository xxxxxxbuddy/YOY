<template>
    <div>
        <Header title="商品"></Header>
        <el-card class="card" v-for="item in foodList" :key="item.FoodID" >
            <img class="image" src="@/assets/images/FoodBG.jpg">
                <div style="margin-left: 35vw;position: relative">
                    <span class="name">{{item.FoodName}}</span>
                    <el-input-number class="input-number" v-model="foodNum[item.FoodID]" :min="0" :max="10" :label="item.FoodName"></el-input-number><br>
                    <span class="info">￥{{item.FoodPrice}}</span><br>
                    <span>描述{{item.FoodDescription}}</span><br>     
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

export default {
  components: {
    Header
  },
  data() {
    return {
      foodList: [
        {
          FoodID: 1,
          FoodName: '肥宅快乐水',
          FoodPrice: 20,
          FoodDescription: '冰冰凉凉，超级好喝'
        },
        {
          FoodID: 2,
          FoodName: '玛丽莲冰露',
          FoodPrice: 20,
          FoodDescription: '冰冰凉凉，超级好喝'
        }
      ],
      foodNum: {
        1: 0,
        2: 0
      }
    }
  },
  computed: {
    totalPrice() {
      return this.foodNum[1] * this.foodList[0].FoodPrice + this.foodNum[2] * this.foodList[1].FoodPrice
    }
  },
  methods: {
    /**
    * @description   结算
    */
    pay() {
      this.$router.push({
        name: 'Order',
        params: {
          totalPrice: this.totalPrice
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
