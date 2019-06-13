<template>
    <div style="background-color: rgba(153, 153, 153, 0.19);height: 100%;min-height: 100vh">
        <Header title="队伍管理"></Header>
        <div class="map-button" @click="map">地图</div>

        <div class="invite" :style="'transform: ' + showInvite">
          <div class="search">
            <el-input placeholder="输入游客ID/名字" v-model="searchContent" style="width: 70vw" prefix-icon="el-icon-search"></el-input>
            <el-button type="primary" round style="width: 20vw;margin-left: 2vw" @click="search">搜索</el-button>
          </div>
          <div class="search-results">
            <transition-group name="invite-card">
              <el-card v-for="item in searchResults" :key="item.VisitorID" style="position: relative">
                <span style="">{{item.Name}}</span>
                <br>
                <span>ID: {{item.VisitorID}}</span>
                <el-button type="success" round @click="inviteVisitor" :data-id="item.VisitorID" class="invite-button">+邀请组队</el-button>
              </el-card>
            </transition-group>
          </div>
        </div>

        <div class="mask" @click="quitInvite" v-if="showMask"></div>

        <el-tabs v-model="activeTab" stretch>
            <el-tab-pane label="队员信息" name="info" class="member-info" >
                <el-card class="member-card" style="position: relative">
                  <el-button type="danger" style="position: absolute;right: 2vw;top: 2vh;" @click="quit">退出</el-button>
                  <span>我</span><br>
                  <span>ID:{{VisitorID}}</span><br>
                  <span>游客状态：{{myStatus.TeamerStatus}}</span><br>
                </el-card>
                <el-card v-for="item in membersList" class="member-card" :key="item.VisitorID">
                  <span>{{item.TeamerName}}</span><br>
                  <span>ID:{{item.TeamerID}}</span><br>
                  <span>游客状态：{{item.TeamerStatus}}</span><br>
                </el-card>
                <el-card class="member-card" style="text-align: center">
                  <i class="el-icon-plus" style="font-size: 16vw;opacity: 0.5" @click="invite"></i>
                </el-card>
            </el-tab-pane>

            <el-tab-pane label="组队消息" name="message">
                <span class="no-item" v-if="inviteList.length === 0">暂无组队邀请</span>
                <transition-group name="invite-card">
                    <el-card v-for="item in inviteList" :key="item.InviterID" class="invite-card" shadow="never">
                        <div style="padding: 2vw">
                            游客ID为{{item.InviterID}}的{{item.InviterName}}先生/女士邀请您加入群组<br>共享位置信息，一起游玩！
                        </div>
                        <el-button type="success" round style="margin-left: 10%" @click='confirm' :data-id="item.InviterID">接受</el-button>
                        <el-button type="danger" round style="margin-left: 37%" @click="decline" :data-id="item.InviterID">忽略</el-button>
                    </el-card>
                </transition-group>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Header from '@/components/header';
import { MessageBox } from "element-ui";

export default {
  components: {
    Header
  },
  data() {
    return {
      VisitorID: window.sessionStorage.getItem('VisitorID'),
      activeTab: 'info',
      showInvite: 'translateY(-100%)',
      showMask: false,
      inviteList: [
        // {
        //   InvitorID: 12345,
        //   InvitorName: '张雷'
        // },
        // {
        //   InvitorID: 1345,
        //   InvitorName: '张雷'
        // }
      ],
      myStatus: {},
      membersList: [
        // {
        //   VisitorID: 1,
        //   VisitorName: '张雷',
        //   VisitorState: '空闲'
        // },
        // {
        //   VisitorID: 2,
        //   VisitorName: '张雷',
        //   VisitorState: '空闲'
        // }
      ],
      searchContent: '',
      searchResults: [
        // {
        //   VisitorID: 0,
        //   VisitorName: 'test'
        // }
      ],
      GroupID: ''
    }
  },
  activated() {
    this.$axios.get('/Amusement.svc/Group/GetApplication/' + this.VisitorID).then(res => {
      if(res.data.code === 1 && !!res.data.result.length) {
        this.inviteList = res.data.result;
      }
    }).catch(e => {
      MessageBox({
        type: 'error',
        message: '网络故障，请求失败'
      })
    });
    this.getTeamerInfo();  
  },
  methods: {
    /**
     * @description 获取队伍信息
     */
    getTeamerInfo() {
      this.$axios.get('/Amusement.svc/Group/TeamerInfo/' + this.VisitorID)
        .then(res => {
          console.log(res)
          if(res.data.code === 1) {
            var TeamerInfo = [];
            if(res.data.result) {
              for(var i = 0; i < res.data.result.length; i++) {
                switch(res.data.result[i].TeamerStatus) {
                  case -1: res.data.result[i].TeamerStatus = '闲逛中'; break;
                  case 0: res.data.result[i].TeamerStatus = '项目等待中'; break;
                  case 1: res.data.result[i].TeamerStatus = `${res.data.result[i].ProjectName}游玩中`; break;
                }
                if(res.data.result[i].TeamerID === this.VisitorID) {
                  this.myStatus = res.data.result[i]
                }else {
                  TeamerInfo.push(res.data.result[i]);
                }
              }
              this.GroupID = res.data.result[0].GroupID;
            }
            this.membersList = TeamerInfo;  
          }else {
            MessageBox({
              type: 'error',
              message: '获取队伍信息失败\n' + res.data.errMsg
            })
          }
        }).catch(e => {
          console.log(e)
          MessageBox({
            type: 'error',
            message: '获取队伍信息失败\n' + e.message
          })
        });
    },
    /**
     * @description 搜索游客并邀请组队
     */
    invite() {
      this.showInvite = 'translateY(0)'
      this.showMask = true;
    },
    /**
     * @description 退出邀请
     */
    quitInvite() {
      this.showInvite = 'translateY(-100%)';
      this.showMask = false;
    },
    /**
     * @description 搜索用户
     */
    search() {
      this.$axios.get('/Amusement.svc/Group/SearchVisitor?SearchKey=' + this.searchContent).then(res => {
        if(res.data.code === 1) {
          this.searchResults = res.data.result
        }else {
          MessageBox({
            type: 'error',
            message: '搜索失败！<br>' + res.ErrorMsg
          });
        }
      }).catch(e => {
        MessageBox({
          type: 'error',
          message: '搜索失败！<br>' + e.message
        });
      })
    },
    /**
     * @description 邀请加入
     */
    inviteVisitor(e) {
      e.target.innerText = "已邀请";
      e.target.parentNode.style.background = '#909399';
      e.target.parentNode.setAttribute('disabled', 'disabled');
      this.$axios.post('/Amusement.svc/Group/Invite', {
        InviterID: this.VisitorID,
        InviteeID: e.target.parentNode.dataset.id
      }).then(res => {
        if(res.data.code === 1) {
          e.target.innerText = "已邀请";
          e.target.parentNode.style.background = '#909399';
        }
      })
    },
    /**
     * @description 接受邀请
     */
    confirm(e) {
      this.$axios.post('/Amusement.svc/Group/Agree', {
        VisitorID: this.VisitorID,
        InviterID: e.target.dataset.id
      }).then(res => {
        if(res.data.code === 1) {
          // MessageBox({
          //   type: 'success',
          //   message: '加入成功'
          // });
          e.target.innerText = "已接受";
          e.target.parentNode.style.background = '#909399';
          e.target.parentNode.setAttribute('disabled', 'disabled');
          this.getTeamerInfo();
          this.activeTab = 'info';
        }else {
          MessageBox({
            type: 'error',
            message: '加入失败' + res.data.errMsg
          });
        }
      })
    },
    /**
     * @description 拒绝邀请
     */
    decline(e) {
      this.$axios.post('/Amusement.svc/Group/Refuse', {
        VisitorID: this.VisitorID,
        InviterID: e.target.dataset.id
      })
      let index = this.inviteList.indexOf({InvitorID: e.target.dataset.id})
      e.srcElement.parentNode.parentNode.style.opacity = 0;
      setTimeout(() => {
        e.srcElement.parentNode.parentNode.style.display = 'none';
      }, 500);
    },
    /**
     * @description 进入地图
     */
    map() {
      this.$router.push({
        name: 'Map',
        params: {
          GroupID: (!this.GroupID && this.membersList.length > 0) ? '' : this.GroupID
        }
      })
    },
    quit() {
      this.$axios.get('/Amusement.svc/Group/Exit/' + this.VisitorID).then(res => {
        if(res.data.code === 1) {
          this.getTeamerInfo();
        }else {
          MessageBox({
            type: 'error',
            message: '退出队伍失败，' + res.data.errMsg
          })
        }
      }).catch(e => {
        MessageBox({
          type: 'error',
          message: '退出队伍失败，' + e.message
        })
      })
    }
  }
}
</script>

<style>
.map-button{
  position: fixed;
  top: 0;
  right: 5px;
  z-index: 1000;
  line-height: 4rem;
  font-size: 1.5rem;
  color: #409EFF;
}
.no-item{
  text-align: center;
  display: block;
}
.invite-card{
  width: 90%;
  margin: 1vh auto;
  background-color: rgba(247, 238, 214, 1);
  font-size: 1rem;
  line-height: 2;
}
.el-button.is-round {
  border-radius: 6vw;
  padding: 2vw 6vw;
  font-size: 1rem;
}
.invite-card-enter-active, .invite-card-leave-active {
  transition: opacity .5s;
}
.invite-card-enter, .invite-card-leave-to /* .invite-card-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.invite{
  position: absolute;
  box-sizing: border-box;
  transition: all 0.3s ease;
  width: 100%;
  z-index: 3;
  top: 4rem;
  background-color: #fff;
  padding: 2vw;
}
.mask{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
}
.search-results{
  margin: 2vh 2vw;
  width: 90vw;
  line-height: 2;
}
.invite-button{
  position: absolute;
  right: 2vw;
  top: 50%;
  transform: translateY(-50%);
}
.member-info{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.member-card{
  width: 40vw;
  line-height: 2;
  margin: 1vh 4vw;
  border-radius: 2vw;
}
.el-tabs__nav-wrap {
  background-color: #fff !important;
}
</style>
