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
    this.$router.push({
      name: 'main'
    });
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
  margin-bottom: 20px;
}
</style>
