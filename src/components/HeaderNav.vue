<template>
<div id="HeaderNav">
  <el-menu  :default-active="activeIndex" class="el-menu-nav-header" mode="horizontal" @select="handleSelect" :router="true">
    <el-menu-item index="/notescenter">我的日记</el-menu-item>
    <el-submenu index="2">
      <template slot="title">日记广场</template>
      <el-menu-item index="2-1">日记推荐</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">树洞</el-menu-item>
    <el-menu-item index="4">给未来自己的话</el-menu-item>
    <el-menu-item index="/about" >关于我们</el-menu-item>
    <el-col :span="12" style="margin-top: 10px">
      <el-input
          placeholder="我要搜一下^_^"
          prefix-icon="el-icon-search"
          v-model="searchText" width="40" @keyup.enter.native="search">
      </el-input>
    </el-col>
    <el-col :span="2" style="margin-top: 10px">
      <el-button  type="primary" icon="el-icon-edit" @click="insert">新增日记</el-button>
    </el-col>
    <div id="nav-endl">
    <el-menu-item v-show="loginStatus.id==null" index="/logreg" style="float: right">登录/注册</el-menu-item>
    <el-submenu v-show="loginStatus.id!=null" index="/usercenter"  style="float: right" id="userbox">
      <template slot="title">
        <el-avatar :size="50" :src="loginStatus.userAvatar" id="userLogo_nav"></el-avatar>
          <!--        <img :src="loginStatus.userAvatar!=null?loginStatus.userAvatar:defaultlogo" id="userLogo_nav"/>-->
      </template>
      <el-menu-item index="/usercenter" >{{loginStatus.userName}}</el-menu-item>
      <el-menu-item index="/usercenter" >个人中心</el-menu-item>
      <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-submenu>
    </div>
  </el-menu>
</div>

</template>

<script>
import {get_noteslist_bynotetitle, get_noteslist_byuserid, sys_getlogin, sys_logout} from "@/config/apiconfig";
import {DEFAULTLOGO} from "@/config/config";
import Vue from "vue";

export default {
  name: "HeaderNav",
  data() {
    return {
      activeIndex: '/about',
      loginStatus: Vue.prototype.$loginStatus,
      defaultlogo:DEFAULTLOGO,
      searchText:""
    };
  },
  methods: {
    insert(){
      if (sessionStorage.getItem('loginStatus'))      this.$root.$children[0].setInsertNote()
      else this.$message.error("请先登录后再写日记")
    },
    handleSelect(key, keyPath) {
      if (!sessionStorage.getItem('loginStatus')){
        this.axios.get(sys_getlogin)
            .then(res =>{
              if (res.data.data!=null){
                sessionStorage.setItem('loginStatus',JSON.stringify(res.data.data))
                console.log(this.loginStatus);
              }
              else{
                this.loginStatus=null
              }
            })
      }
      this.loginStatus=(JSON.parse(sessionStorage.getItem('loginStatus')));
      console.log(key, keyPath);
    },
    logout(){
      this.axios.post(sys_logout).then(res=>{
        console.log(res.data.message)
        this.$message({
          message:"退出成功！",
          type:"success"
        })
        this.loginStatus=null;
        sessionStorage.removeItem('loginStatus')
        this.$forceUpdate()
        this.$router.push({path: '/LogReg'})
      })
    },
    search(){
      this.$router.push('/notescenter')
      this.notelist=null
      if (this.searchText!=""){
        this.axios.get(get_noteslist_bynotetitle+this.searchText)
            .then(res=>{
              sessionStorage.setItem('isSearch',true)
              this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
            })
        this.isSearch=true;
      }
      else{
        this.axios.get(get_noteslist_byuserid+JSON.parse(sessionStorage.getItem('loginStatus')).id)
            .then(res=>{
              sessionStorage.setItem('isSearch',false)
              this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
            })
        this.isSearch=false;
      }
    }
  },
  mounted() {
    if (this.$route.params!=null)this.activeIndex=this.$route.params
    this.axios.get(sys_getlogin)
      .then(res =>{
        if (res.data.data!=null){
          this.loginStatus=res.data.data;
          Vue.prototype.$loginStatus=this.loginStatus
          console.log(this.loginStatus);
      }
      else{
      sessionStorage.islogin='false';
    }
      })
    this.search()
  }
}
</script>

<style scoped>
  #userLogo_nav{
    /*border-radius: 100%;*/
    border-style: solid;
    border-color: #e7e7e7;
    /*height: 50px;*/
    /*width: 50px;*/
    margin-top: 6px;
    margin-right: 15px ;
  }
  #nav-endl *{
    float: right;
    /*display: block;*/
    position: relative;
    height: 100%;
    z-index: 10000;
  }
  .el-menu-nav-header{
    margin: 0;
    padding:0;
  }

</style>