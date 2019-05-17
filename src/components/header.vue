<template>
    <div class="header">
        <i class="el-icon-arrow-left back" @click="goBack"></i>
        <span class="last-page" @click="goBack">{{lastPage}}</span>
        <span class="title">{{title}}</span>
    </div>
</template>

<script>
export default {
  props: {
    lastPage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.header{
  height: 3rem;
  width: 100%;
  position: relative;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
}
.back{
  position: absolute;
  left: 5px;
  z-index: 2;
  line-height: 3rem;
  font-size: 1.5rem;
  padding: 0.25rem;
}
.last-page{
  position: absolute;
  left: 2.9rem;
  line-height: 3rem;
}
.title{
  display: inline-block;
  line-height: 3rem;
  margin-left: 50%;
  transform: translateX(-50%);
  color: rgba(80, 80, 80, 1);
  font-weight: bold;
}
</style>
