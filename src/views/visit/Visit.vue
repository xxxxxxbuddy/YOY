<template>
    <div>

    </div>
</template>

<script>
import {MessageBox} from 'element-ui';

export default {
  data() {
    return {

    }
  },
  created() {
    this.$axios.get('Visit.svc/getNotice', {
      VisitorID: this.$params.VisitorId
    }).then(res => {
      if(res.data.code === 1) {
      
      } else {
        MessageBox({
          type: 'error',
          message: '查询通知失败,请稍后再试'
        })
      }
    }).catch(e => {
      MessageBox({
        type: 'error',
        message: '查询通知失败,请稍后再试'
      })
    })
  }
}
</script>

<style scoped>

</style>
