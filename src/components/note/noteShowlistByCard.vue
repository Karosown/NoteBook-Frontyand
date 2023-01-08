<template>
  <!--      todo:循环-->
  <div id="noteShowlistByCard" >
    <div  v-for="(item,key) in list" :key="key">
    <el-card class="box-card" shadow="hover" style="margin-bottom: 5px">
      <div slot="header" class="clearfix">
        <span style="float: left">{{item.noteTitle}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-if="!isSearch" @click="update=true,noteId=item.id">修改</el-button>
        <span style="float: right; padding: 3px 0" type="text"  v-else>{{getUserName(item)}}{{"Author: "+item.userName}}</span>
      </div>
      <div  class="text item">
<!--        <note-show-article noteurl="http://7n.cdn.wzl1.top/notebook/noteFile/cb7d4a16489f0a838e7d94c0332efe8c.html?datestamp=167243851936"></note-show-article>-->
       <note-show-article :noteurl="item.noteUrl" :now-id="item.id" :key="new Date().getTime()"></note-show-article>
      </div>
      <div class="clearfix">
        <span style="float: left">发表日期：{{item.createTime}} </span>
        <el-button type="text" @click="doThumb(item)">点赞：{{item.thumbNum}}
        <b-icon-hand-thumbs-up v-if="item.hasThumb===false"></b-icon-hand-thumbs-up>
        <b-icon-hand-thumbs-up-fill v-else></b-icon-hand-thumbs-up-fill>
      </el-button>
      </div>
    </el-card>
    </div>
    <el-drawer
        title="修改日记"
        :visible.sync="update"
        direction="ltr"
        size="100%"
    >
      <update-note :noteId="noteId" v-if="update"/>
    </el-drawer>
  </div>
</template>

<script>
import NoteShowArticle from "@/components/note/noteShowArticle";
import {do_thumb_note, getUserNamebyID} from "@/config/apiconfig";
import UpdateNote from "@/components/note/updateNote";
import {thumbNoteBody} from "@/config/config";
export default {
  name: "noteShowlistByCard",
  data() {
    return {
      isSearch:false,
      update:false,
      noteId:null,
      list:sessionStorage.getItem('notelist')
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: {UpdateNote, NoteShowArticle},
  methods: {
    handlerClose(){

    },
  doThumb(item){
    var thumbNote=thumbNoteBody;
    thumbNote.noteId=item.id
    this.axios.post(do_thumb_note,thumbNote)
        .then(res => {
          this.$message.success(res.data.message)
          item.hasThumb=res.data.data;
          item.thumbNum+=((res.data.data===false)?-1:1)
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
        this.isSearch=JSON.parse(sessionStorage.getItem('isSearch'))
      })

    }
}
</script>

<style scoped>

</style>