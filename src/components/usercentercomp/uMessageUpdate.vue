<template>
<div id="uMessageUpdate">
  <h4 style="text-align: left;left: 5px;position: relative">个人头像：</h4>
  <el-upload
      ref="uploadlogo"
      class="avatar-uploader"
      action="#"
      :http-request="uploadAvatar"
      :on-success="handleAvatarSuccess"
      :show-file-list="true"
      list-type="picture"
      :before-upload="beforeAvatarUpload"
      :multiple="false"
      :on-exceed="limitMehtod"
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
  <br>
  <h4 style="text-align: left;left: 5px;position: relative">用户昵称修改：</h4>
  <el-input v-model="userUpdateBody.userName" style="width: 60%;display: block;margin-left: 15%;margin-bottom: 10px" placeholder="请输入昵称，不修改则留空"></el-input>
  <el-button @click="submit" type="primary">提交</el-button>
</div>
</template>

<script>
import {baseAPI} from "@/config/apiconfig";
import {userUpdateBody} from "@/config/config";
import Vue from "vue";
import {img2base64_File} from "@/config/ApiConfig/fileApiConfig/fileApiConfig";
import {user_update_message} from "@/config/ApiConfig/userApiConfig/userApiConfig";

export default {
  name: "uMessageUpdate",
  data(){
    return{
      postUrl:baseAPI+img2base64_File,
      userUpdateBody:userUpdateBody,
      loading:true
    }
  },
  methods: {
    submit(){
      this.axios.post(user_update_message,userUpdateBody)
          .then(res=>{
              if (!res.data.code){
                this.$message.success("修改成功")
              }
              else{
                this.$message.warning("修改失败"+res.data.message,)
              }
          })
          .catch(()=>{
            this.$message.error("服务器错误")
          })
    },
    handleAvatarSuccess(res) {
      this.userUpdateBody.userAvatar = res.data.data;
    },
    uploadAvatar(param) {
      var formdata = new FormData()
      formdata.append('image', param.file)
      this.axios.post(img2base64_File, formdata)
          .then(res => {
            if (!res.data.code) {
              this.userUpdateBody.userAvatar = res.data.data;
              this.$message({
                message: "上传成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "上传失败:" + res.data.message,
                type: "info"
              })
            }
          })
          .catch(err => {
            this.$message({
              message: "上传失败:" + err.data,
              type: "info"
            })
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
    }
  },
    mounted() {
    this.userUpdateBody.id=Vue.prototype.$loginStatus.id
    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>