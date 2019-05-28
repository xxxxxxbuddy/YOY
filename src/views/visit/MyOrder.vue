<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="已支付订单"></Header>
        <el-tabs stretch v-model="activeTab">
            <el-tab-pane label="未取货订单" name="Unused" class="tab">
                <div class="order-detail" v-show="!!UnusedList.length">
                    <span class="store-name">桃花阉饮吧</span>
                    <div v-for="item in UnusedList" :key="item.FoodID" class="food">
                        <img class="image" src="@/assets/images/FoodBG.jpg">
                        <span class="food-name">{{item.FoodName}}</span>
                        <el-button round type="primary" :class="foodButton">退款</el-button>
                        <span class="food-price">￥{{item.FoodPrice}}</span>
                        <br>
                        <span class="food-description">描述：{{item.FoodDescription}}</span>
                        <span class="food-number">×{{item.FoodNum}}</span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="历史订单" name="History">
                <div class="order-detail" v-show="!!HistoryList.length">
                    <span class="store-name">桃花阉饮吧</span>
                    <div v-for="item in HistoryList" :key="item.FoodID" class="food">
                        <img class="image" src="@/assets/images/FoodBG.jpg">
                        <span class="food-name">{{item.FoodName}}</span>
                        <el-button round disabled="disabled" :class="foodButton">已取货</el-button>
                        <span class="food-price">￥{{item.FoodPrice}}</span><br>
                        <span class="food-description">描述：{{item.FoodDescription}}</span>
                        <span class="food-number">×{{item.FoodNum}}</span>
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

export default {
  components: {
    Header
  },
  data() {
    return {
      activeTab: 'Unused',
      foodButton: "food-button",
      UnusedList: [
        {
          FoodID: 1,
          FoodPrice: 20,
          FoodName: '肥宅快乐水',
          FoodDescription: '描述：冰冰凉凉，非常好喝',
          FoodNum: 1
        }
      ],
      HistoryList: [
        {
          FoodID: 1,
          FoodPrice: 20,
          FoodName: '肥宅快乐水',
          FoodDescription: '描述：冰冰凉凉，非常好喝',
          FoodNum: 1
        }
      ],
      PlayList: []
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
