<template>
    <h2 style="text-align: center">请使用手机、平板等移动端设备访问本页面</h2>
</template>

<script>
export default {
  created() {
    if('ontouchstart' in document) {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
