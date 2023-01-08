<template>
<div id="uCenterLeft">
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
          default-active="4"
          class="el-menu-vertical-usercenter"
          style="padding-top: 20px"
          @open="handleOpen"
          @close="handleClose" :router="true">
        <div class="userCenterLogo">
          <el-avatar :size="100" :src="loginStatus.userAvatar"></el-avatar>
          <span>{{loginStatus.userName}}</span>
        </div>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>我的日记</span>
          </template>
          <el-submenu index="1-1">
            <template slot="title">日记本</template>
            <el-menu-item index="1-1-1" disabled>生活日记</el-menu-item>
            <el-menu-item index="1-1-2" disabled>漂流瓶</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">树洞</template>
            <el-menu-item index="1-2-1" disabled>我的树洞</el-menu-item>
            <el-menu-item index="1-2-2" disabled>烧树洞</el-menu-item>
          </el-submenu>
          <el-submenu index="1-3">
            <template slot="title">送信</template>
            <el-menu-item index="1-3-1" disabled>给未来的自己</el-menu-item>
            <el-menu-item index="1-3-2" disabled>给他人</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2" disabled>
          <i class="el-icon-menu"></i>
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-s-custom"></i>
          <span slot="title">我的好友</span>
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>个人资料</span>
          </template>
          <el-menu-item index="/usermessage">个人资料</el-menu-item>
          <el-menu-item index="/updatemsg">密码设置</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {sys_getlogin} from "@/config/apiconfig";
import {loginStatus} from "@/config/config";
import Vue from "vue";
// import Vue from "vue/types/index";

export default {
  name: "uCenterLeft",
  data(){
    return{
      loginStatus:loginStatus
    }
  },
  mounted() {
    this.axios.get(sys_getlogin)
        .then(res=>{
          if (!res.data.code){
            this.loginStatus=res.data.data
            Vue.prototype.$loginStatus=res.data.data
          }
          else{
            this.$router.push({path:'/logreg'})
          }
        })
  }
}
</script>

<style scoped>
*::-webkit-scrollbar{display: none;}
*{
  overflow: hidden;
}
.userCenterLogo *{
  display: block;
  margin: auto;
  margin-top: 5px;
}
.el-menu-vertical-usercenter{
  height: 93vh;
}
#uCenterLeft{

}
</style>