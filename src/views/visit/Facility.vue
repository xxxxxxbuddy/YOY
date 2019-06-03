<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="项目推荐"></Header>

        <el-tabs v-model="activeTab" stretch style="background-color: #fff">
            <el-tab-pane label="按距离推荐" name="distance">
                <el-card class="card" v-for="item in projectByDistance" :key="item.ProjectID">
                    <img class="image" :src="require(`@/assets/images/${item.ProjectPic}`)">
                    <div style="margin-left: 35vw">
                        <span class="name">{{item.ProjectName}}</span><br>
                        <span class="info">{{parseInt(item.Record)}}m</span>
                        <span>开放时间：{{item.OpeningTime}}</span><br>
                        <span>适合人群：{{item.ProjectForPeople}}</span><br>
                        <i class="el-icon-star-on" style="color: rgba(255, 141, 26, 1)"></i>
                        <span>{{item.ProjectAttention}}</span><br>
                        <i class="el-icon-location" style="color: rgba(42, 130, 228, 0.84)"></i>
                        <span>地址</span>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="按等待时间推荐" name="waittime">
              <el-card class="card" v-for="item in projectByDistance" :key="item.ProjectID">
                    <img class="image" :src="require(`@/assets/images/${item.ProjectPic}`)">
                    <div style="margin-left: 35vw">
                        <span class="name">{{item.ProjectName}}</span><br>
                        <span class="info">约等待{{parseInt(item.Record)}}分钟</span>
                        <span>开放时间：{{item.OpeningTime}}</span><br>
                        <span>适合人群：{{item.ProjectForPeople}}</span><br>
                        <i class="el-icon-star-on" style="color: rgba(255, 141, 26, 1)"></i>
                        <span>{{item.ProjectAttention}}</span><br>
                        <i class="el-icon-location" style="color: rgba(42, 130, 228, 0.84)"></i>
                        <span>地址</span>
                    </div>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Header from '@/components/header';
import { MessageBox } from 'element-ui';

export default {
  components: {
    Header
  },
  data() {
    return {
      activeTab: 'distance',
      projectByDistance: [{ProjectID: "P00001", ProjectName: "海盗船", ProjectState: 1, ProjectInfo: "海盗船游乐项目", ProjectPic: "swipeImg2.jpg", OpeningTime: "hh:mm:ss-hh:mm:ss", ProjectAttention: "注意事项有blabla", ProjectForPeople: "1.2m以下儿童不适合", Record: "10"}],
      projectByWaitTime: []
    }
  },
  mounted() {
    this.$axios.post('/Recommendation.svc/ProjectRecom', {
      RecomType: 1,
      VisitorID: window.sessionStorage.getItem('VisitorID')
    })
      .then(res => {
        if(res.data.code === 1) {
          this.projectByDistance = res.data.result;
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

    this.$axios.post('/Recommendation.svc/ProjectRecom', {
      RecomType: 2,
      VisitorID: window.sessionStorage.getItem('VisitorID')
    })
      .then(res => {
        if(res.data.code === 1) {
          this.projectByWaitTime = res.data.result;
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
    line-height: 2;
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
