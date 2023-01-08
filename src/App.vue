<template>
  <div id="app">

   <el-container>
     <el-header>
       <HeaderNav style="width:100%;position: fixed;margin: 0px;top: 0px;left: 0px;z-index: 999"/>
     </el-header>
     <el-main id="Main">
<!--       <div id="body" style="height:100%;display: block">-->
         <router-view></router-view>
<!--       </div>-->
     </el-main>
     <el-footer>
       ©2023 Powered by <el-link type="primary" href="https://www.wzl1.top/" target="_blank">Karos</el-link>
       <el-divider direction="vertical"></el-divider>
       <a href="http://beian.miit.gov.cn/" traget="_blank">蜀ICP备2022011626号-1</a>
       <el-divider direction="vertical"></el-divider>
       <el-button type="text" @click="warning">GitHub</el-button>
     </el-footer>
   </el-container>
    <el-drawer
        title="新建日记"
        :visible.sync="insertNote"
        direction="ltr"
        size="100%"
    >
      <create-note/>
    </el-drawer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'



import HeaderNav from "@/components/HeaderNav";
import CreateNote from "@/components/note/createNote";
export default {
  name: 'App',
  components: {
    CreateNote,
    HeaderNav,
    // HelloWorld
  },
  data(){
    return{
      insertNote:false
    }
  },
  methods:{
    warning(){
      this.$message.error('项目目前还在开发中，暂未开源')
    },
    setInsertNote(){
      this.insertNote=true
    }
  },
  mounted() {
    var header = document.getElementById("HeaderNav");
    var body = document.getElementById("body");
    body.style.marginTop=  header.style.height="61px"
      // sessionStorage.isLogin='false';
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
a:link{
  text-decoration:none;   /* 指正常的未被访问过的链接*/
}
a:visited{
  text-decoration:none; /*指已经访问过的链接*/
}
a:hover{
  text-decoration:none;/*指鼠标在链接*/
}
a:active{
  text-decoration:none;/* 指正在点的链接*/
}
footer a{
  color: #2c3e50;
}
#Main{
  margin: 0px;padding: 0px
}
@media (max-width: 1485px) {
#Main{
  margin-top: 50px;
}
}
@media (max-width: 1027px) {
  #Main{
    margin-top: 53px;
  }
}
@media (max-width: 482px) {
  #Main{
    margin-top: 90px;
  }
}
@media (max-width: 279px) {
  #Main{
    margin-top: 120px;
  }
}
</style>
