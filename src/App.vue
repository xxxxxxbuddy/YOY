<template>
    <router-view></router-view>
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
  font-family: 微软雅黑 ,'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
