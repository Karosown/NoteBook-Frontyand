<template>
  <div id="LogRegBody">
    <LoginBody v-if="logger" ref="loginn"/>
    <RegisterBody v-if="register" ref="regg"/>
    <button type="button" class="btn btn-primary" @click="login">{{logger==1?"登录":"返回登录"}}</button>
    <button type="button" class="btn btn-info" @click="regist">{{register==1?"注册":"去注册"}}</button>
  </div>
</template>

<script>
import LoginBody from "@/components/LoginBody";
import RegisterBody from "@/components/RegisterBody";
import {userlogin, userRegister} from "@/config/config";
import {user_login, user_register} from "@/config/apiconfig";

export default {
  name: "LogRegBody",
  components: {
    LoginBody,
    RegisterBody
    // HelloWorld
  },
  data(){
    return{
      logger:1,
      register:0,
      userRegister:userRegister
    }
  },
  methods: {
    login(){
      if (!this.logger){
        this.logger=1;
        this.register=0;
      }
      else{
        userlogin.userAccount=this.$refs.loginn.userAccount;
        userlogin.userPassword=this.$refs.loginn.userPassword;
        this.axios.post(user_login,userlogin).then(res => {
          if (!res.data.code){
            this.$message({
              message:"登录成功",
              type:"success"
            })
            sessionStorage.setItem('loginStatus',JSON.stringify(res.data.data))
            this.$router.push({path:"/notescenter"})
            window.location.reload()
          }
          else{
            this.$message({
              message:"登录失败！"+res.data.message,
              type:"error"
            })
          }
        })
            .catch(err => {
              this.$message({
                message:"服务器错误"+err.data,
                type:"info"
              });
            })

      }
    },
    regist(){
      if (!this.register){
        this.logger=0;
        this.register=1;
      }
      else {
        this.userRegister.checkCode=this.$refs.regg.checkCode;
        this.userRegister.userMail=this.$refs.regg.userMail
        this.userRegister.userPassword=this.$refs.regg.userPassword;
        this.userRegister.checkPassword=this.$refs.regg.userPassword;
        this.userRegister.userAccount=this.$refs.regg.userAccount;
        this.userRegister.userAvatar=this.$refs.regg.userAvatar;
        this.userRegister.userName=this.$refs.regg.userName;
        this.axios.post(user_register,this.userRegister).then(res => {
          if (!res.data.code){
            alert("注册成功，请牢记您的账号信息")
          }
          else{
            alert("注册失败！"+res.data.message)
          }
        })
            .catch(err => {
              alert("服务器错误"+err.data.message);
            })
      }
    }
  },
  mounted() {
    if (sessionStorage.isLogin=='true'){
      this.$router.push({path:"/notescenter"})
    }
  }
}
</script>

<style>
.userLogo{
  border-radius: 40%;
  border-color: aliceblue;
  height: 100px;
  width: 100px;
}
#LogRegBody{
  margin: 5px 10%;
  padding: 5%;
  border-color: aliceblue;
  border-style: solid;
}
</style>