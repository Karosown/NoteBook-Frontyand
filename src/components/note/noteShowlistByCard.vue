<template>
  <div id="noteShowlistByCard" >
    <el-empty description="暂时找不到您想要的结果哟~请您重新输入" v-if="list==null||!list.length" :key="new Date().getTime()"></el-empty>
    <div v-else v-for="(item,key) in list" :key="key">
      <a type="text" @click="look=true,itemFactory=item">
      <el-card class="box-card" shadow="hover" style="margin-bottom: 5px" @click="look=true,itemFactory=item">
      <div slot="header" class="clearfix">
        <img  v-bind:src="getUserAvatarById+item.userId" :class="'userAvatar'" :key="new Date().getTime()">
        <span style="float: left;margin-top:10px;margin-left:5px">
{{item.noteTitle}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-if="(!isSearchOrFavorite)||isAdmin" @click.stop="update=true,noteId=item.id">修改</el-button>
        <span style="float: right; padding: 3px 0" type="text"  v-else>{{getUserName(item)}}{{"Author: "+item.userName}}</span>
      </div>
      <div  class="text item" style="text-align: left" :key="new Date().getTime()">
<!--        <note-show-article noteurl="http://7n.cdn.wzl1.top/notebook/noteFile/cb7d4a16489f0a838e7d94c0332efe8c.html?datestamp=167243851936"></note-show-article>-->
<!--       <note-show-article :noteurl="item.noteUrl" :now-id="item.id" :key="new Date().getTime()"></note-show-article>-->
              {{((item.noteIntroduction!=null)&&(item.noteIntroduction!=''))?item.noteIntroduction:"主人还没有对文章进行更新哟，请点击查看（网站更新后，对原文进行一次任意修改即可出现简略文字，以后要看全文需要点击卡片进行查看）"}}
      </div>
      <div class="clearfix" style="margin-top: 50px">
        <span style="float: left">发表日期：{{item.createTime}} </span>
        <el-button type="text" @click.stop="doThumb(item)">收藏量：{{item.thumbNum}}
        <b-icon-star v-if="item.hasThumb===false"></b-icon-star>
        <b-icon-star-fill v-else></b-icon-star-fill>
      </el-button>
      </div>
    </el-card>
      </a>
    </div>
    <el-drawer
        title="日记欣赏"
        :visible.sync="look"
        direction="ltr"
        size="100%"
    >
      <note-show-article :item="itemFactory" :key="new Date().getTime()"/>
    </el-drawer>
    <el-drawer
        title="修改日记"
        :visible.sync="update"
        :before-close="handlerClose"
        direction="ltr"
        size="100%"
    >
      <update-note :noteId="noteId" v-if="update" :key="new Date().getTime()"/>
    </el-drawer>
  </div>
</template>

<script>
import {baseAPI, do_thumb_note, getUserAvatarById, getUserNamebyID} from "@/config/apiconfig";
import UpdateNote from "@/components/note/updateNote";
import {thumbNoteBody} from "@/config/config";
import NoteShowArticle from "@/components/note/noteShowArticle";
export default {
  name: "noteShowlistByCard",
  data() {
    return {
      isAdmin:false,
      itemFactory:null,
      isSearchOrFavorite:false,
      look:false,
      update:false,
      noteId:null,
      getUserAvatarById:baseAPI+getUserAvatarById,
      list:sessionStorage.getItem('notelist')
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: {NoteShowArticle, UpdateNote},
  methods: {
    handlerClose(done){
      sessionStorage.removeItem('isUpdateHistory');
      sessionStorage.setItem('isUpdateHistory',false);
      done();
    },
  doThumb(item){
    var thumbNote=thumbNoteBody;
    thumbNote.noteId=item.id
    this.axios.post(do_thumb_note,thumbNote)
        .then(res => {
          if (!res.data.code){
            this.$message.success(res.data.message)
            item.hasThumb=res.data.data;
            item.thumbNum+=((res.data.data===false)?-1:1)
          }
          else {
            this.$message.error(res.data.message);
            this.$router.push({path:'/LogReg'});
          }
        })
        .catch(err=>{
          var message = err.data.message;
          if (message.search("未登录")!=-1){
              this.$message.error("未登录")
            this.$router.push({path:'/LogReg'});
          }
          else{
            this.$message.info("服务器错误:"+message)
          }
        })
  }
  ,
    getUserName(item) {
      this.axios.get(getUserNamebyID + item.userId)
          .then(res => {
            this.$set(item,'userName',res.data.data)
          })
    }
  },
    mounted() {
    // this.axios.get(get_noteslist_byuserid + JSON.parse(sessionStorage.getItem('loginStatus')).id)
    //       .then(res => {
    //         this.notelist=res.data.data.records
    //       })
      window.addEventListener('setItem',()=>{
        this.list=JSON.parse(sessionStorage.getItem('notelist'))
        this.isSearchOrFavorite=JSON.parse(sessionStorage.getItem('isSearchOrFavorite'))
      })
      this.isAdmin=(JSON.parse(sessionStorage.getItem('loginStatus')).userRole=='admin')
    }
}
</script>

<style scoped>
.userAvatar{
  border:ridge 0.1px;
  border-color: #ffffff;
  border-radius: 100px 100px 100px 0px;
  height: 40px; width: 40px; line-height: 40px;
  margin: auto;
  float: left;
}
</style>