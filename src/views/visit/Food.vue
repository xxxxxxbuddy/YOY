<template>
  <div>
    <Header title="美食推荐"></Header>
    <el-card class="card" v-for="item in storeList" :key="item.StoreID" @click.native="enterStore">
        <img class="image" src="@/assets/images/StoreBG.jpg">
        <div style="margin-left: 35vw">
            <span class="name">{{item.StoreName}}</span><br>
            <span class="info">人均消费：￥{{item.AverageConsumption}}</span>
            <i class="el-icon-star-on" style="color: rgba(255, 141, 26, 1);margin-left: 15vw;"></i>
            <span>{{item.Commodity}}</span><br>     
            <i class="el-icon-location" style="color: rgba(42, 130, 228, 0.84)"></i>
            <span>地址</span>
        </div>
    </el-card>
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
      storeList: [
        {
          StoreID: 1,
          StoreName: '桃花阉饮吧',
          AverageConsumption: '20',
          Commodity: '饮品'
        },
        {
          StoreID: 2,
          StoreName: '桃花阉饮吧',
          AverageConsumption: '20',
          Commodity: '饮品'
        }
      ]
    }
  },
  methods: {
    /**
   * @description   进入商店
   */
    enterStore() {
      this.$router.push('Store');
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
.card i{
    font-size: 1.25rem;
}
.card span{
    font-size: 1rem;
    line-height: 2;
}
.name{
    font-size: 1.5rem !important;
}
</style>
