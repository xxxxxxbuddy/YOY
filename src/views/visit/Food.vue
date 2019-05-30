<template>
  <div>
    <Header title="美食推荐"></Header>
    <el-card class="card" v-for="item in storeList" :data-id="item.StoreID" :key="item.StoreID" @click.native="enterStore">
        <img class="image" :src="require(`@/assets/images/${item.StorePic}`)" :data-id="item.StoreID">
        <div style="margin-left: 35vw" :data-id="item.StoreID">
            <span class="name" :data-id="item.StoreID">{{item.StoreName}}</span><br>
            <i class="el-icon-star-on" style="color: rgba(255, 141, 26, 1)" :data-id="item.StoreID"></i>
            <span :data-id="item.StoreID">{{item.StoreInfo}}</span><br>     
        </div>
    </el-card>
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
      storeList: []
    }
  },
  mounted() {
    this.$axios.get('/Recommendation.svc/GetStoreInfo')
      .then(res => {
        if(res.data.code === 1) {
          this.storeList = res.data.result;
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
    /**
   * @description   进入商店
   */
    enterStore(e) {
      let foodList = [];
      this.$axios.get('/Recommendation.svc/GetMenu/' + e.target.dataset.id)
        .then(res => {
          if(res.data.code === 1) {
            console.log(res.data);
            foodList = res.data.result;
            var foodNum = {};
            for(var i = 0; i < foodList.length; i++) {
              foodNum[foodList[i].CommodityID] = 0;
            }
            this.$router.push({
              name: 'Store',
              params: {
                foodList: foodList,
                foodNum: foodNum
              }
            });
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
