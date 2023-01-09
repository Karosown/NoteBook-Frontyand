<template>

  <div id="UserCenter">
<!--      <h1>登录成功！</h1>-->
<!--    <button type="button" class="btn btn-primary" @click="logout">退出登录</button>-->
    <el-container>
      <el-aside  width="15%" style="position:fixed;">
        <u-center-left/>
      </el-aside>
      <el-aside  width="15%">
      </el-aside>
      <el-main>
      <router-view></router-view>
      </el-main>
    </el-container>
  </div>

</template>

<script>

import router from "@/router";
import {sys_logout} from "@/config/apiconfig";
import UCenterLeft from "@/components/usercentercomp/uCenterLeft";
// import Vue from "vue";
// import {userRegister} from "@/config/config";
export default {
  name: "UserCenter",
  components: {UCenterLeft},
  data(){
    return{
      loginStatus:"",
    }
  },
  methods: {
    logout(){
      this.axios.post(sys_logout).then(res=>{
        console.log(res.data.message)
        router.push({path: '/LogReg'})
        this.$message({
          message:"退出成功！",
          type:"success"
        })
      })
    }
  },

    beforeCreate() {
      // this.axios.get(sys_getlogin)
      //     .then(res =>{
      //       if (res.data.data==null) {
      //         console.log(res.data.message)
      //         router.push({path: '/LogReg'})
      //       }
      //       else{
      //         this.loginStatus=res.data.data;
      //         Vue.prototype.$loginStatus=this.loginStatus
      //
      //         console.log(this.loginStatus);
      //       }
      //     })
    }

}
</script>

<style scoped>

</style>