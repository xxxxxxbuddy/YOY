<!--
 * @Date: 2019-05-19 00:34:29
 * @Author: Rawlence
 * @LastEditTime: 2019-06-03 21:14:13
 * @Description: 游客登录页
 -->
<template>
  <div v-loading="loginning">
    <div class="header">
      <div class="bg">
        <div class="back" @click="goBack">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
      <img src="@/assets/images/welcome.png" class="logo">
    </div>
    <div class="banner">
        登录
    </div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="28vw" class="loginForm" label-position="left">
      <el-form-item label="登陆账号" prop="Account">
          <el-input v-model="loginForm.Account"  suffix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="Password">
          <el-input v-model="loginForm.Password" type="password"  suffix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="Name">
          <el-input v-model="loginForm.Name"  suffix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="Age">
          <el-input v-model="loginForm.Age" suffix-icon="el-icon-s-data" ></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="UID">
          <el-input v-model="loginForm.UID" suffix-icon="el-icon-postcard"></el-input>
      </el-form-item>
    </el-form>
    <div class="tip">
      <el-checkbox label="已阅读并同意《游园须知》" v-model="tip"></el-checkbox>
      <div class="login" @click="login">
          <img src="@/assets/images/login.png" alt="登录">
      </div>
    </div>
  </div>
</template>

<script>
import {MessageBox} from 'element-ui';

export default {
  data() {
    return {
      loginForm: {
        Account: '',
        Password: '',
        Name: '',
        Age: '',
        UID: ''
      },
      rules: {
        Account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        Password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        Name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在2-10个字符内', trigger: 'blur'}
        ],
        Age: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {min: 1, max: 2, message: '长度有误', trigger: 'blur'}
        ],
        UID: [
          {required: true, message: '请输入身份证号码', trigger: 'blur'},
          {min: 18, max: 18, message: '号码无效', trigger: 'blur'}
        ]
      },
      tip: false,
      loginning: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    login() {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          if(this.tip) {
            this.loginning = true;
            this.$axios({
              method: 'post',
              url: '/Amusement.svc/Login',
              data: {
                visitor: {
                  VisitorID: this.loginForm.Account,
                  Password: this.loginForm.Password,
                  Name: this.loginForm.Name,
                  Age: this.loginForm.Age,
                  UID: this.loginForm.UID
                }
              },
              headers: {
                'AutomaticDecompression': 'DecompressionMethods.GZip'
              }
            }).then(res => {
              this.loginning = false;
              if(res.data.code === 1) {
                window.sessionStorage.setItem('VisitorID', this.loginForm.Account);
                this.$router.push({
                  name: 'Visit',
                  params: {
                    VisitorID: this.loginForm.Account
                  }
                })
              } else {
                this.loginning = false;
                MessageBox({
                  type: 'error',
                  message: `输入信息有误，登录失败\n${res.data.errMsg}`
                })
              }
            }).catch(e => {
              this.loginning = false;
              MessageBox({
                type: 'error',
                message: `网络错误，登录失败\n${e.message}`
              })
            })        
          } else {
            MessageBox({
              type: 'error',
              message: '请阅读并勾选同意《游园须知》'
            })
          }
        } else {
          MessageBox({
            type: 'error',
            message: '请填写登录信息'
          })
        }
      })
    }
  }
};
</script>

<style scoped>
.header {
  height: 31vh;
  width: 100%;
  position: relative;
  background-color: rgba(131, 203, 253, 1);
  position: relative;
}
.bg {
  background: url("../../assets/images/LOGO.png");
  height: 31vh;
  width: 100%;
  z-index: -1;
  background-size: 45%;
  background-repeat: no-repeat;
  background-position: center center;
  filter: opacity(0.3);
}
.logo{
  position: absolute;
  width: 80vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
.loginForm{
  padding: 2vw 10vw;
}
.el-form-item{
  width: 80vw;
}
.tip{
  width: 100%;
  text-align: center;
}
.login {
  border-radius: 10vw;
  height: 4.5rem;;
  background-color: rgba(131, 203, 253, 1);
  width: 70vw;
  margin: 5vh auto;
}
.login img{
  height: 4.5rem;
  vertical-align: bottom;
}
</style>
