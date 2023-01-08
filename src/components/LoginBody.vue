<template>
  <div id="LoginBody">
    <img alt="user logo" class="userLogo" >
    <el-input v-model="userAccount"   placeholder="请输入账号" ></el-input>
    <el-input v-model="userPassword"   placeholder="请输入密码" @focus="input" show-password></el-input>
<!--    <span>-->
<!--      <input type="checkbox"  @change="Enter()">-->
<!--      确认无误-->
<!--    </span>-->
  </div>
</template>

<script>

import {BASE64HEADER, DEFAULTLOGO} from "@/config/config";
import {baseAPI, getUserAvatarByUserAccount} from "@/config/apiconfig";

export default {
  name: "LoginBody",
  data() {
    return {
      "userAccount": "",
      "userPassword": "",
      "old_logo":""
    }

  },
  methods:{

    input(){
      var srcc=baseAPI+getUserAvatarByUserAccount+this.userAccount;
      var logo=document.getElementsByClassName("userLogo");
      this.axios.get(getUserAvatarByUserAccount+this.userAccount)
          .then(res =>{
        if (!res.data.code) {
          logo[0].setAttribute("src",srcc);
        }
        else{
          logo[0].setAttribute("src",this.old_logo);
          console.log(res.data.message);
        }
      })
          .catch(err=>{
            logo[0].setAttribute("src",this.old_logo);
            console.log(err.data);
          })


    },
    // Enter(){
    //   this.conf.userAccount=this.userAccount;
    //   this.conf.userPassword=this.userPassword;
    // }
  },
  mounted() {
    this.old_logo=BASE64HEADER+DEFAULTLOGO;
    document.getElementsByClassName("userLogo")[0].setAttribute("src",this.old_logo)
  }
}
</script>

<style>
  #LoginBody{
    margin:5px 40%;

  }
  #LoginBody input{
    margin: 5px;
  }

  @media screen and (max-width: 960px){
    #LoginBody{
      margin:5px 5%;

    }
    #LoginBody input{
      margin: 5px;
    }
  }
</style>