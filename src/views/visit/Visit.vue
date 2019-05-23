<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="我的YOY之旅" color='rgba(88, 176, 81, 1)'></Header>

        <div id="options">
          <div class="option" @click="Route">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xianlu"></use>
              </svg>
              <span>线路推荐</span>
          </div>
          <div class="option" @click="Facility">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-project"></use>
              </svg>
              <span>项目推荐</span>
          </div>
          <div class="option" @click="Food">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-meishi"></use>
              </svg>
              <span>美食推荐</span>
          </div>
          <div class="option" @click="Team">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shiziduiwu"></use>
              </svg>
              <span>队伍管理</span>
          </div>
          <div class="option" @click="Order">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dingdan"></use>
              </svg>
              <span>我的订单</span>
          </div>
          <div class="option" @click="Route">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yue"></use>
              </svg>
              <span>余额</span>
          </div>
        </div>

        <div id="notice">
          <span class="no-item" v-if="noticeList.length === 0">暂无通知嗷ヾ(≧O≦)〃</span>
          <transition-group name="notice">
            <el-card v-for="item in noticeList" :key="item.NoticeID" class="notice-card">
              <span class="title">{{item.NoticeTitle}}</span>
              <span class="pub-time">{{item.NoticeTime}}</span>
              <span class="content-time">时间: {{item.ContentTime}}</span>
              <span class="address">地点: {{item.NoticeAddress}}</span>
              <div style="width: 100%">
                <span class="info-label">描述:&nbsp;</span>
                <span class="info">{{item.NoticeInfo}}</span>
              </div>
            </el-card>
          </transition-group>
        </div>
    </div>
</template>

<script>
import {MessageBox} from 'element-ui';
import Header from '../../components/header';
import {formatDate} from '@/util/format';
import '../../assets/js/iconfont';

var INTERVAL = 0;
var freshTime = new Date();
export default {
  components: {
    Header
  },
  data() {
    return {
      noticeList: []
    }
  },
  created() {
    // this.getLatestNotice('');
    this.getLatestNotice(formatDate(new Date("2019-05-20"), 'yyyy-MM-dd hh:mm:ss'));
    INTERVAL = setInterval(() => { // eslint-disable-next-line
      this.getLatestNotice(formatDate(freshTime, 'yyyy-MM-dd hh:mm:ss'));
    }, 10000);
  },
  methods: {
    /**
     * @description 获取最新通知
     */
    getLatestNotice(time) {
      this.$axios.post('/Amusement.svc/GetNotice', {
        LastGetTime: time
      }).then(res => {
        if(res.data.code === 1) {
          this.noticeList.unshift(...res.data.result);
          freshTime = new Date();
        } else {
          MessageBox({
            type: 'error',
            message: '查询通知失败,请稍后再试'
          });
        }
      }).catch(e => {
        MessageBox({
          type: 'error',
          message: '查询通知失败,请稍后再试'
        });
      })
    },
    /**
     * @description 线路推荐
     */
    Route() {
      this.$router.push('Route')
    },

    /**
     * @description 项目推荐
     */
    Facility() {
      this.$router.push('Facility')
    },
    
    /**
     * @description 美食推荐
     */
    Food() {
      this.$router.push('Food')
    },

    /**
     * @description 队伍管理
     */
    Team() {
      this.$router.push('Team')
    },

    /**
     * @description 我的订单
     */
    Order() {
      this.$router.push('MyOrder')
    }
  },
  beforeDestroy() {
    clearInterval(INTERVAL);
  }
}
</script>

<style scoped>
.icon {
  width: 15vw;
  height: 15vw;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#options{
  display: flex;
  justify-content: flex-start;
  padding: 2vw;
  flex-wrap: wrap;
  background-color: #fff;
  margin-bottom: 1vh;
}
.option{
  width: 15vw;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 3rem;
  padding: 0px 4vw;
  cursor: pointer;
}
.option span{
  position: absolute;
  bottom: -1.75rem;;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 1.25rem;
}
.notice-card{
  width: 98%;
  margin: 1vh auto;
}
#notice{
  margin-bottom: 4vh;
}
.no-item{
  text-align: center;
  display: block;
}
#notice .title{
  float: left;
  font-size: 1.5rem;
  margin-bottom: 1vh;
}
#notice .pub-time{
  float: right;
  font-size: 1rem;
  color: rgba(128, 128, 128, 1);
}
.content-time, .address{
  clear: both;
  width: 100%;
  border-bottom: 1px dotted rgba(0,0,0,0.3);
}
.content-time, .address, .info-label, .info{
  float: left;
  font-size: 1.25rem;
  margin: 1vh 0;
  line-height: 2;
}
.info{
  width: 85%;
}
.notice-enter-active, .notice-leave-active {
  transition: opacity .5s;
}
.notice-enter, .notice-leave-to /* .notice-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
