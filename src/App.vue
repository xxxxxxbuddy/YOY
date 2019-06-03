<template>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  computed: {

  },
  created() {
    const isMobile = 'ontouchstart' in document;
    if(!isMobile) {
      this.$router.push('DeviceNotSupport');
    }
  },
  methods: {
    
  }
};
</script>

<style>
body{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  margin: 0;
  padding: 0;
}
</style>
