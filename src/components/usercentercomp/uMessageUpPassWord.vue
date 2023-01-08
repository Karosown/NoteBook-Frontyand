<template>
<div id="uMessageUpPassWord">

     <el-card>
          <h5 style="font-family: 'Microsoft YaHei';text-align: left">
        修改密码 Update PassWord
        </h5>
       <el-input placeholder="请输入新密码"  v-model="userUpdateBody.userPassword" show-password ></el-input>
       <el-input placeholder="请确认新密码" v-model="userUpdateBody.checkPassword" show-password></el-input>
       <el-input v-model="userUpdateBody.userMail"   placeholder="请输入邮箱" ></el-input>
       <el-input v-model="checkCodeImg"    placeholder="请输入图示验证码,点击输入框进行更换"></el-input>
       <img id="checkCode" alt="验证码" style="width: 200px;height: 100px" src="@/assets/codeflash.png" @click="initCheckCode">
       <el-button  @click="sendMail">发送验证码</el-button>
       <el-input v-model="userUpdateBody.checkCode"     placeholder="请输入验证码"></el-input>
       <el-button type="primary" @click="submit">提交</el-button>
     </el-card>
</div>
</template>

<script>
// import Vue from "vue";

import {checkpack, userUpdatePassword} from "@/config/config";
import {baseAPI, checkcode_send, imgcheckcode_touch, user_update_password} from "@/config/apiconfig";
import axios from "axios";
import Vue from "vue";

export default {
  name: "uMessageUpPassWord",
  data(){
    return {
      userUpdateBody:userUpdatePassword,
      checkCodeImg:''
    }
  },
  methods:{
    initCheckCode() {
      this.dateStamp = new Date().getTime()
      var src=baseAPI+imgcheckcode_touch + this.dateStamp.toString();
      var elment=document.getElementById("checkCode");
      this.axios.get(imgcheckcode_touch + this.dateStamp.toString())
          .then(res=>{
            elment.setAttribute("src",src)
            console.log(res.data)
          })
          .catch(err=>{
            elment.setAttribute("src",this.old_src)
            console.log(err.data)
          })
    },
    sendMail() {
      checkpack.checkCode = this.checkCodeImg
      checkpack.dateStamp = this.dateStamp
      checkpack.userMail = this.userUpdateBody.userMail
      axios.post(checkcode_send, checkpack)
          .then(res => {
            if (!res.data.code) {
              alert("发送成功")
            } else
              alert(res.data.message)
          })
          .catch(err => {
            alert("服务器错误:" + err.data.toString())
          })
    },
    submit(){
      this.axios.post(user_update_password,this.userUpdateBody)
          .then(res=>{
            if (!res.data.code){
              this.$message.success(res.data.message)
            }
            else this.$message.error(res.data.message)
          })
          .catch(err=>{
            this.$message.info("ServerError:"+err.data)
          })
    }
  },
  mounted() {
    this.old_src=document.getElementById("checkCode").getAttribute("src");
    this.userUpdateBody.id=Vue.prototype.$loginStatus.id
    this.userUpdateBody.userMail=Vue.prototype.$loginStatus.userMail
    this.initCheckCode();
  }
}
</script>

<style scoped>

</style>