<template>
  <div id="RegisterBody">
    <img alt="user logo" class="userLogo" :src="userAvatarURL">
<!--    <input  type="file" id="uploadlogo" @change="upload($event)" accept="image/*">-->
    <el-upload
        ref="uploadlogo"
        class="avatar-uploader"
        action="#"
        :http-request="uploadAvatar"
        :show-file-list="true"
        list-type="picture"
        :before-upload="beforeAvatarUpload"
        :multiple="false"
        :limit="1"
        auto-upload
        drag
    >
      <!--    :http-request="upload"-->
      <!--   :on-exceed="limit"   limit="1"-->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
<!--    <input v-model="userAvatarURL"   placeholder="请输入头像链接" @focusout="AvatarUpdate">-->
    <el-input v-model="userAccount"   placeholder="请输入账号" ></el-input>
    <el-input v-model="userPassword"   placeholder="请输入密码"  show-password></el-input>
    <el-input v-model="checkPassword"   placeholder="请输入再次密码"  show-password></el-input>
    <el-input v-model="userName"   placeholder="请输入用户昵称" ></el-input>
    <el-input v-model="userMail"   placeholder="请输入邮箱" ></el-input>
    <el-input v-model="checkCodeImg"    placeholder="请输入图示验证码,点击输入框进行更换"></el-input>
    <img id="checkCode" alt="验证码" style="width: 200px;height: 100px" src="@/assets/codeflash.png" @click="initCheckCode">
    <button type="button" class="btn btn-outline-danger" @click="sendMail">发送验证码</button>
      <el-input v-model="checkCode"     placeholder="请输入验证码"></el-input>
    <span>点击验证码图片刷新验证码</span>
    <!--    <span>-->
<!--      <input type="checkbox"  @change="Enter()">-->
<!--      确认无误-->
<!--    </span>-->
  </div>
</template>

<script>
// import {userRegister} from "@/config";

import axios from "axios";
// import {checkpack, userRegister} from "@/config";
// import $axios from "core-js/internals/queue";
import {BASE64HEADER, checkpack, DEFAULTLOGO} from "@/config/config";
// eslint-disable-next-line no-unused-vars
import {checkcode_send, imgcheckcode_touch, img2base64_File, img2base64_URL, baseAPI} from "@/config/apiconfig";
export default {
  name: "RegisterBody",
  data() {
    return {
      "old_logo":"",
      "old_src":"",
      "userAvatarURL": "",
      "checkCodeImg": "",
      "checkCode": "",
      "checkPassword": "",
      "userAccount": "",
      "userAvatar": "",
      "userMail": "",
      "userPassword": "",
      "userName":"",
      "dateStamp": 0
    };
  },
  methods: {
    uploadAvatar(param){
      var file = param.file;
      var data=new FormData();
      data.append("image",file)
      axios.post(img2base64_File,data)
          .then(res=>{
            console.log(res.data)
            if(!res.data.code){
              this.userAvatar=res.data.data
              this.userAvatarURL=BASE64HEADER+this.userAvatar
            }
            else{
              console.log(res.data.message)
            }
          })
          .catch(err=>{
            console.log(err.data)
          })
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/bmp');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像只能是 jpg、png、bmp 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // this.$refs.upload.submit();
      return isJPG && isLt2M;
    },
    limitMehtod(file,fileList) {
      // this.$alert("请先删除已选头像再重新选择")
      this.$refs.uploadlogo.clearFiles()
      fileList.push(file)
    },
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
      checkpack.userMail = this.userMail
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
    // AvatarUpdate() {
    //   axios.get(this.userAvatarURL)
    //       .then(() => {
    //         alert("图片无效，请检查图片是否正常或者是否存在防盗链")
    //         this.userAvatarURL = this.old_src;
    //         document.getElementsByClassName("userLogo")[0].setAttribute("src", this.userAvatarURL);
    //         axios.get(img2base64_URL + this.userAvatarURL)
    //             .then(res => {
    //               if (!res.data.code) {
    //                 this.userAvatar = res.data.data;
    //               } else {
    //                 console.log(res.data.message);
    //                 console.log("上传失败！" + res.data.message);
    //               }
    //             })
    //             .catch(err => {
    //               console.log("服务器错误:" + err.data.message);
    //             })
    //       })
    //       .catch(() => {
    //         document.getElementsByClassName("userLogo")[0].setAttribute("src", this.userAvatarURL);
    //         axios.get(img2base64_URL + this.userAvatarURL)
    //             .then(res => {
    //               if (!res.data.code) {
    //                 this.userAvatar = res.data.data;
    //               } else {
    //                 alert(res.data.message);
    //                 this.userAvatarURL = this.old_logo;
    //                 document.getElementsByClassName("userLogo")[0].setAttribute("src", this.userAvatarURL);
    //                 axios.get(img2base64_URL + this.userAvatarURL)
    //                     .then(res => {
    //                       if (!res.data.code) {
    //                         this.userAvatar = res.data.data;
    //                       } else {
    //                         console.log(res.data.message);
    //                         console.log("上传失败！" + res.data.message);
    //                       }
    //                     })
    //                     .catch(err => {
    //                       console.log("服务器错误:" + err.data.message);
    //                     })
    //               }
    //             })
    //             .catch(err => {
    //               console.log("服务器错误:" + err.data.message);
    //               this.userAvatarURL = this.old_logo;
    //               document.getElementsByClassName("userLogo")[0].setAttribute("src", this.userAvatarURL);
    //               axios.get(img2base64_URL + this.userAvatarURL)
    //                   .then(res => {
    //                     if (!res.data.code) {
    //                       this.userAvatar = res.data.data;
    //                     } else {
    //                       console.log(res.data.message);
    //                       console.log("上传失败！" + res.data.message);
    //                     }
    //                   })
    //                   .catch(err => {
    //                     console.log("服务器错误:" + err.data.message);
    //                   })
    //             })
    //       })
    // }
  }  ,
  mounted() {
    this.old_src=document.getElementById("checkCode").getAttribute("src");
    this.old_logo=BASE64HEADER+DEFAULTLOGO;
    this.userAvatarURL=this.old_logo;
    this.userAvatar=DEFAULTLOGO;
    this.initCheckCode();
  }
}
</script>

<style>
#RegisterBody{
  margin:5px 40%;

}
#RegisterBody input{
  margin: 5px;
}
@media screen and (max-width: 960px){
  #RegisterBody{
    margin:5px 5%;
  }
  #RegisterBody input{
    margin: 5px;
  }
}
</style>