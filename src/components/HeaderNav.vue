<template>
<div id="HeaderNav">
  <div id="nav-pc">
    <el-menu  :default-active="activeIndex" class="el-menu-nav-header" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="/notescenter">我的日记</el-menu-item>
      <el-submenu index="2">
        <template slot="title">日记广场</template>
        <el-menu-item index="2-1">日记推荐</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">树洞</el-menu-item>
      <el-menu-item index="4">给未来自己的话</el-menu-item>
      <el-menu-item index="/about" >关于我们</el-menu-item>
      <div class="nav-toolbox-endl">
        <div class="nav-tool">
          <el-col :span="20" style="margin-top: 10px; margin-right: 3px">
            <el-input
                placeholder="我要搜一下^_^"
                prefix-icon="el-icon-search"
                v-model="searchText" width="40" @keyup.enter.native="search">
            </el-input>
          </el-col>
          <el-col :span="2" style="margin-top: 10px;">
            <el-button  type="primary" icon="el-icon-edit" @click="insert">新增日记</el-button>
          </el-col>
        </div>
        <div class="nav-endl">
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
      </div>
    </el-menu>
  </div>
  <div id="nav-pe">
    <el-menu  :default-active="activeIndex" class="el-menu-nav-header" mode="horizontal" @select="handleSelect" :router="true">
      <el-dropdown  style="margin-top: 10px;margin-left:10px;float: left">
         <span class="el-dropdown-link">
       <i class="el-icon-menu" style="font-size: 45px;color: #409EFF"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
        <el-menu-item index="/notescenter">我的日记</el-menu-item>
        <el-submenu index="2">
          <template slot="title">日记广场</template>
          <el-menu-item index="2-1">日记推荐</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">树洞</el-menu-item>
        <el-menu-item index="4">给未来自己的话</el-menu-item>
        <el-menu-item index="/about" >关于我们</el-menu-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="nav-toolbox-endl">
        <div class="nav-tool">
          <el-col :span="18" style="margin-top: 10px;">
            <el-input
                placeholder="我要搜一下^_^"
                prefix-icon="el-icon-search"
                v-model="searchText" width="40" @keyup.enter.native="search">
            </el-input>
          </el-col>
          <el-col :span="2" style="margin-top: 0px;margin-right: 15px;">
            <el-button  type="text" icon="el-icon-circle-plus-outline" style="font-size:35px" @click="insert"></el-button>
          </el-col>
        </div>
        <div class="nav-endl">
          <el-menu-item v-show="loginStatus.id==null" index="/logreg" style="float: right;margin-top: 3px;">登录/注册</el-menu-item>
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
      </div>
    </el-menu>
  </div>
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
              sessionStorage.setItem('isSearchOrFavorite',true)
              this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
            })
        this.isSearchOrFavorite=true;
      }
      else{
        this.axios.get(get_noteslist_byuserid+JSON.parse(sessionStorage.getItem('loginStatus')).id)
            .then(res=>{
              sessionStorage.setItem('isSearchOrFavorite',false)
              this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
            })
        this.isSearchOrFavorite=false;
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
  .nav-toolbox-endl{
    float: right;
    position: relative;
    height: 100%;
    z-index: 10000;
  }
  .nav-tool{
    width: 35vw;
    margin-right: 108px;
  }
  .nav-endl *{
    float: right;
    /*display: block;*/
  }
  .el-menu-nav-header{
    margin: 0;
    padding:0;
  }
  #nav-pe{
    display: none;
  }
  @media (min-width: 796px) {
    .nav-tool{
      margin-right: 20vw;
      width: 25vw;
    }
  }

/*@media (min-width: 1136px) {*/
/*  .nav-tool{*/
/*    margin-right: 10vw;*/
/*  }*/
/*}*/
  @media (max-width: 934px) {
    .nav-tool{
      width: 74vw;
      margin-right: 54px;
    }
   #nav-pe{
     display: block;
   }
    #nav-pc{
      display: none;
    }
  }
  @media (max-width: 534px) {
    .nav-tool{
      width: 66vw;
      margin-right: 73px;
    }
  }
  @media (max-width: 426px) {
    .nav-tool{
      width: 60vw;
      margin-right: 74px;
    }
    .nav-endl li{
      margin: 3px -10px;
    }
  }
  @media (max-width: 340px) {
    .nav-tool{
      width: 60vw;
      margin-right: 74px;
    }
    .nav-endl li{
      margin: 3px -10px;
    }
  }
  /*@media (max-width: 280px) {*/
  /*  .nav-tool{*/
  /*    width: 60vw;*/
  /*    margin-right: 74px;*/
  /*  }*/
  /*  .nav-endl li{*/
  /*    margin: -5px;*/
  /*  }*/
  /*}*/
  @media (max-width: 320px) {
    .nav-tool{
      width: 50vw;
      margin-right: 84px;
    }
    .nav-endl li{
      margin: 3px -10px;
    }
  }
</style>