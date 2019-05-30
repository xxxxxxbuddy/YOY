<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);min-height: 100vh">
        <Header title="通知"></Header>
        <el-tabs v-model="activeTab" stretch >
            <el-tab-pane label="发布通知" name="PubNotice">
                <form>
                    <label for="NoticeType">通知类型:</label>
                    <el-select placeholder="请选择" v-model="noticeID" id="NoticeType" style="width: 60vw;">
                        <el-option v-for="item in noticeTypes" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select><br>
                    <label for="Time">发生时间:</label>
                    <el-input id="Time" v-model="time" style="width: 60vw"></el-input>
                    <br>
                    <label for="Location">地点:</label>
                    <el-input id="Location" v-model="location" type="textarea" :rows="2" style="width: 60vw;vertical-align: text-top;"></el-input>
                    <br>
                    <label for="Description">描述:</label>
                    <el-input id="Description" v-model="description" :rows="5" type="textarea" style="width: 60vw;vertical-align: text-top;"></el-input>
                    <br>
                    <div class="submit" @click="pubNotice">提交</div>
                </form>
            </el-tab-pane>
            <el-tab-pane label="我的通知" name="MyNotice">
              <div id="notice">
                <span class="no-item" v-if="noticeList.length === 0">暂无通知嗷ヾ(≧O≦)〃</span>
                <transition-group name="notice">
                  <el-card v-for="item in noticeList" :key="item.NoticeID" class="notice-card">
                    <span class="notice-type">{{item.NoticeType}}</span>
                    <el-button type="danger" round @click="deleteNotice" :data-id="item.NoticeID">删除</el-button>
                    <span class="notice-status">{{item.NoticeStatus}}</span>
                    <span class="content-time">时间: {{item.OccurTime}}</span>
                    <span class="address">地点: {{item.OccurAddress}}</span>
                    <div style="width: 100%">
                      <span class="info-label">描述:&nbsp;</span>
                      <span class="info">{{item.NoticeDetail}}</span>
                    </div>
                  </el-card>
                </transition-group>
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
      activeTab: 'PubNotice',
      noticeTypes: [
        {
          label: '寻人通知',
          id: 0
        },
        {
          label: '寻物通知',
          id: 1
        },
        {
          label: '园内提醒',
          id: 3
        }
      ],
      noticeID: '',
      time: '',
      location: '',
      description: '',
      noticeList: []
    }
  },
  mounted() {
    this.getMyNotice();
  },
  methods: {
    getMyNotice() {
      this.$axios.post('NoticeManagement.svc/GetMyNotice', {
        VisitorID: window.sessionStorage.getItem('VisitorID')
      })
        .then(res => {
          if(res.data.code === 1) {
            res.data.result.reverse();
            res.data.result.forEach(item => {
              switch(item.NoticeStatus) {
                case 0: item.NoticeStatus = '未审核'; break;
                case 1: item.NoticeStatus = '已通过'; break;
                case 2: item.NoticeStatus = '已拒绝'; break;
                case 3: item.NoticeStatus = '已失效'; break;
              };
              switch(item.NoticeType) {
                case 0: item.NoticeType = '寻人通知'; break;
                case 1: item.NoticeType = '寻物通知'; break;
              };
              this.noticeList = res.data.result;
              this.$nextTick(() => {
                var noticeListDom = document.getElementsByClassName('notice-card');
                Array.prototype.forEach.call(noticeListDom, (item) => {
                  if(item.children[0].children[2].innerText === '已失效') {
                    item.children[0].children[1].classList.add('useless-button');
                  }
                })
              })
            })
          }else {
            console.error(res.data.errMsg);
          }
        })
    },
    pubNotice() {
      if(this.noticeID !== '' && this.time && this.location && this.description) {
        this.$axios.post('/NoticeManagement.svc/PublishNotice', {
          VisitorID: window.sessionStorage.getItem('VisitorID') || '',
          NoticeType: this.noticeID,
          OccurTime: this.time,
          OccurAddress: this.location,
          NoticeDetail: this.description
        })
          .then(res => {
            if(res.data.code === 1) {
              MessageBox({
                type: 'success',
                message: '提交成功！管理员会尽快审核您的通知内容并发布'
              });
              this.getMyNotice();
            }else {
              MessageBox({
                type: 'error',
                message: `发送失败${res.data.errMsg}`
              })
            }
          })
          .catch(e => {
            MessageBox({
              type: 'error',
              message: `发送失败${e.message}`
            })
          })
      } else {
        MessageBox({
          type: 'info',
          message: '请填写完整信息'
        })
      }
    },
    deleteNotice(e) {
      this.$axios.post('/NoticeManagement.svc/DelMyNotice', {
        VisitorID: window.sessionStorage.getItem('VisitorID'),
        NoticeID: e.target.parentElement.dataset.id
      })
        .then(res => {
          if(res.data.code === 1) {
            e.target.parentElement.classList.add('useless-button')
            e.target.parentElement.setAttribute('disabled', 'disabled');
          }else{
            MessageBox({
              type: 'info',
              message: res.data.errMsg
            })
          }
        })
      console.log(e)
    }
  }
}
</script>

<style>
form{
  margin: 1vh auto;
  text-align: center;
}
form label{
  width: 20vw;
  display: inline-block;
  font-size: 1.25rem;
  line-height: 3;
}
.submit{
  color: #fff;
  font-size: 2rem;
  background-color: #409EFF;
  width: 80vw;
  margin: 2vh auto;
  padding: 1rem;
  border-radius: 8px;
}
.el-tabs__nav-wrap {
  background-color: #fff !important;
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
.notice-type{
  float: left;
  font-size: 1.5rem;
}
.notice-status, .notice-card button {
  float: right;
  margin-right: 2vw;
  line-height: 2.5rem;
}
.notice-status{
  font-size: 1.25rem;
  color: rgba(0,0,0,0.7);
}
.notice-card button{
  box-sizing: border-box;
  height: 2.5rem;
}
.notice-card .el-button--small, .notice-card .el-button--small.is-round {
  padding: 0px 15px;
}
.useless-button{
  border-color: #909399 !important;
  background-color: #909399 !important;
}
</style>
