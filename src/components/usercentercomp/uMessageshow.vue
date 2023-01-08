<template>
<div id="uMessageshow">
<!--  <el-card class="um-box-card" >-->
<!--    <div slot="header" class="um-clearfix">-->
<!--      <span>个人信息</span>-->
<!--      <el-button style="float: right; padding: 10px 18px" type="primary" @click="updateMessage = true">修改</el-button>-->
<!--    </div>-->
<!--    <el-avatar :size="243" :src="loginStatus.userAvatar" shape="square" class="um-logo"></el-avatar>-->
<!--    <el-button style="float: right; padding: 10px 12px" type="primary" class="um-logo um-bt" @click="updateMessage = true">更换头像</el-button>-->
<!--    <div v-for="(value,i) in title" :key="value" class="um-text um-item">-->
<!--      <div v-for="(v,j) in title_en" :key="v">-->
<!--        <span  v-show="i==j">-->
<!--        <el-divider content-position="left" class="um-line">{{value +':'+'&emsp;&emsp;&emsp;'+loginStatus[v]}}</el-divider>-->
<!--</span>-->
<!--      </div>-->
<!--    </div>-->
<!--    <el-skeleton class="um-text" :rows="9" animated/>-->
<!--  </el-card>-->
  <el-card class="um-box-card" >
  <el-descriptions title="个人信息" column="2" border>
    <template slot="extra">
    <el-button style="float: right; padding: 10px 18px" type="primary" @click="updateMessage = true">修改</el-button>
      </template>
    <template>
    </template>
    <template v-for="(value,i) in title" >
      <el-descriptions-item :key="value">
        <template slot="label">
          {{ value }}
        </template>
       <template v-for="(v,j) in title_en" >
                <span v-show="i==j" :key="v">{{ loginStatus[v] }}</span>
       </template>
         </el-descriptions-item>
    </template>
    <el-descriptions-item label="用户头像" style="display: block">
      <el-avatar :size="243" :src="loginStatus.userAvatar" shape="square" class="um-logo"></el-avatar>
      <!--        <el-button style="float: right; padding: 10px 12px" type="primary" class="um-logo um-bt" @click="updateMessage = true">更换头像</el-button>-->
    </el-descriptions-item>
  </el-descriptions>
    <el-skeleton class="um-text" :rows="9" animated/>
  </el-card>


  <el-drawer
      title="信息修改"
      :visible.sync="updateMessage"
      >
    <u-message-update/>
  </el-drawer>

</div>
</template>

<script>
import {loginStatus} from "@/config/config";
import {sys_getlogin} from "@/config/apiconfig";
import UMessageUpdate from "@/components/usercentercomp/uMessageUpdate";
import Vue from "vue";
// import Vue from "vue/types/index";

export default {
  name: "uMessageshow",
  components: {UMessageUpdate},
  data(){
    return{
      /**
       *     'id',
       *     'userName',
       *     'userAccount',
       *     'userAvatar',
       *     'gender',
       *     'userRole',
       *     'userMail',
       *     'reateTime',
       *     'updateTime'
       */
        updateMessage:false,
        loginStatus:loginStatus,
        title:['用户编号' ,'用户昵称','用户账号','用户性别','所属角色','用户邮箱','注册时间','更新时间'],
        title_en:['id','userName','userAccount','gender','userRole','userMail','createTime','updateTime'],
      loading: true,
    }
  },
  mounted(){
    this.axios.get(sys_getlogin)
        .then(res=>{
          if (!res.data.code){
            this.loginStatus=res.data.data
            Vue.prototype.$loginStatus=this.loginStatus
            if (this.loginStatus.gender==null){
              this.loginStatus.gender='未知'
            }
          }
          else{
            this.$router.push({path:'/logreg'})
          }
        })
        .catch(()=>{
          this.$router.push({path:'/logreg'})
        })
    this.loading=false
  }
}
</script>

<style scoped>
.um-text {
  font-size: 14px;
}

.um-item {
  margin-bottom: 18px;
}

.um-clearfix:before,
.um-clearfix:after {
  display: table;
  content: "";
}
.um-clearfix:after {
  clear: both
}

.um-box-card {
  display: block;
  width: 80vw;
  height: 90vh;
  position: relative;
  left: 10px;
}
.um-text{
  text-align: left;
}
.um-logo{
  display: block;
  position: relative;
  /*float: right;*/
  /*right: 10vw;*/
  z-index: 100;
}
.um-bt{
  /*top: 300px;*/
  /*right: 10vw;*/
}
.um-line{
  margin-bottom: 40px;
}
</style>