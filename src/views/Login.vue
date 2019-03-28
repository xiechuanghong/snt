<template>
  <div class="login">
    <div class="top">
        <span class="topText">智能电房后台管理系统</span>
    </div>
    <div class="container">
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder='用户名'
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type='password'
            v-model="form.password"
            placeholder='密码'
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="login"
          >登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
import http from '../utils/HttpService'
import api from '../api/API'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods:{
    // login(){
    //   let formdata = new FormData()
    //   formdata.append("username",this.form.username)
    //   formdata.append("password",md5(this.form.password))
    //   http(api.security.login,formdata).then(res => {
    //     if(res.code == 0){
    //       window.localStorage.setItem('snt_user',JSON.stringify(res.data))
    //       let redirect = decodeURIComponent(this.$route.query.redirect || '/home')
    //       this.$router.push({
    //         path: redirect
    //       })
    //     }else{
    //       console.log(res.data)
    //     }
    //   }).catch(err =>{
    //     console.log(err)
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
//   background-color: #2f4050;
  background-image: url('../assets/image/269558552701308591.png');
  .top{
      background: url('../assets/image/889711639375594149.png') no-repeat center;
      height: 50px;
      text-align: center;
      line-height: 40px;
      .topText{
          color: #fff;
          font-size: 24px;
      }
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    // height: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: #000816;
    // background: url('../assets/image/39534056440453918.png') no-repeat;
    .login-btn {
      width: 100%;
      background-color: #0d335e;
    }
  }
}
</style>
