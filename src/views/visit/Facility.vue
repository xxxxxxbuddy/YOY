<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="项目推荐"></Header>

        <el-tabs v-model="activeTab" stretch style="background-color: #fff">
            <el-tab-pane label="按距离推荐" name="distance">
                <el-card class="card" v-for="item in distanceList" :key="item.ProjectID">
                    <img class="image" src="@/assets/images/buyTicketBG.jpg">
                        <div style="margin-left: 35vw">
                            <span class="name">{{item.ProjectName}}</span><br>
                            <span class="info">{{item.distance}}</span>
                            <span>开放时间：{{item.OpenningTime}}</span><br>
                            <span>适合人群：{{item.ProjectForPeople}}</span><br>
                            <i class="el-icon-star-on" style="color: rgba(255, 141, 26, 1)"></i>
                            <span>{{item.ProjectAttention}}</span><br>
                            <i class="el-icon-location" style="color: rgba(42, 130, 228, 0.84)"></i>
                            <span>地址</span>
                        </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="按等待时间推荐" name="waittime"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Header from '@/components/header';

export default {
  components: {
    Header
  },
  data() {
    return {
      activeTab: 'distance',
      distanceList: [
        {
          ProjectID: 1,
          ProjectName: '中世纪城堡',
          distance: '300m',
          OpenningTime: '9:00-18:30',
          ProjectForPeople: '青少年、成人',
          ProjectAttention: '恐高、有心脏病等不适合加入'
        },
        {
          ProjectID: 2,
          ProjectName: '中世纪城堡',
          distance: '300m',
          OpenningTime: '9:00-18:30',
          ProjectForPeople: '青少年、成人',
          ProjectAttention: '恐高、有心脏病等不适合加入'
        }
      ],
      waittimeList: []
    }
  },
  created() {
    // this.$axios.post('/Amusement.svc/getBetterProject', {
    //   location: ''
    // }).then(res => {
    //   if(res.data.code === 1) {
    //     this.distanceList = res.data.distance;
    //     this.waittimeList = res.data.waittime;    
    //   }
    // })
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
    width: 99vw;
    margin: 0 auto;
    position: relative;
    margin-bottom: 1vh;
}
.card i{
    font-size: 1.25rem;
}
.card span{
    font-size: 1rem;
}
.name{
    font-size: 1.5rem !important;
}
.info{
    position: absolute;
    right: 22px;
    top: 22px;
}
</style>
