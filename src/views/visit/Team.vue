<template>
    <div>
        <Header title="队伍管理"></Header>

        <el-tabs v-model="activeTab" stretch>
            <el-tab-pane label="组队消息" name="message">
                <span class="no-item" v-if="inviteList.length === 0">暂无组队邀请</span>
                <transition-group name="invite-card">
                    <el-card v-for="item in inviteList" :key="item.InvitorID" class="invite-card" shadow="never">
                        <div style="padding: 2vw">
                            游客ID为{{item.InvitorID}}的{{item.InvitorName}}先生/女士邀请您加入群组<br>共享位置信息，一起游玩！
                        </div>
                        <el-button type="success" round style="margin-left: 10%" @click='confirm' :data-id="item.InvitorID">接受</el-button>
                        <el-button type="danger" round style="margin-left: 37%" @click="decline" :data-id="item.InvitorID">忽略</el-button>
                    </el-card>
                </transition-group>
            </el-tab-pane>

            <el-tab-pane label="队员信息" name="info">
                
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
      activeTab: 'message',
      inviteList: [
        {
          InvitorID: 12345,
          InvitorName: '张雷'
        },
        {
          InvitorID: 1345,
          InvitorName: '张雷'
        }
      ]
    }
  },
  created() {
    // this.$axios.post('getApplyNotice', {
    //   VisitorID: ''
    // }).then(res => {
    //   if(res.data.code === 1 && !!res.data.result.length) {
    //     this.inviteList = res.data.result;
    //   }
    // }).catch(e => {
    //   MessageBox({
    //     type: 'error',
    //     message: '网络故障，请求失败'
    //   })
    // })
  },
  methods: {
    /**
     * @description 接受邀请
     */
    confirm(e) {
      this.$axios.post('JoinTeam', {
        VisitorID: '',
        InvitorID: e.target.dataset.id
      }).then(res => {
        if(res.data.code === 1) {
          MessageBox({
            type: 'success',
            message: '加入成功'
          });
          this.activeTab = 'info';
        }else {
          MessageBox({
            type: 'error',
            message: '加入失败'
          });
        }
      })
    },
    /**
     * @description 拒绝邀请
     */
    decline(e) {
      this.$axios.post('IgnoreNotice', {
        VisitorID: '',
        InvitorID: e.target.dataset.id
      })
      let index = this.inviteList.indexOf({InvitorID: e.target.dataset.id})
      e.srcElement.parentNode.parentNode.style.opacity = 0;
      setTimeout(() => {
        e.srcElement.parentNode.parentNode.style.display = 'none';
      }, 500);
    }
  }
}
</script>

<style scoped>
.no-item{
  text-align: center;
  display: block;
}
.invite-card{
  width: 98%;
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
</style>
