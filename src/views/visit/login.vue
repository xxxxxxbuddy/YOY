<template>
  <div>
    <div class="header">
      <div class="bg">
        <div class="back" @click="goBack">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
    </div>
    <div class="banner">
        登录
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.header {
  height: 31vh;
  width: 100%;
  position: relative;
}
.bg {
  background: url("../../assets/images/visitorLoginBG.jpg");
  height: 31vh;
  width: 100%;
  z-index: -1;
  background-size: cover;
}
.back{
  position: absolute;
  left: 5px;
  z-index: 2;
  line-height: 3rem;
  font-size: 1.5rem;
  padding: 0.25rem;
  left: 2vw;
}
.banner{
  background-color: rgba(222, 235, 242, 1);
  font-size: 1.5rem;
  text-align: center;
  height: 4rem;
  line-height: 4rem;
  color: rgba(29, 117, 163, 1);
  font-weight: bold;
  position: relative;
}
.banner::after{
  content: '';
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: rotate(45deg);
  margin-left: -.5rem;
}
</style>
