<template>
<div>
  <el-header>
      <el-col><h5 style="float:left;">{{this.item.noteTitle}}</h5></el-col>
      <el-col><p style="float:left;">作者：{{userName}} 创作时间：{{item.createTime}}  更新时间：{{item.updateTime}}</p></el-col>
  </el-header>
  <el-main>
  <div :id="nowId">
    <el-skeleton style="text-align: left"/>
  </div>
  </el-main>
  <el-footer style="float: left">
    <el-button type="text" @click="doThumb(item)">收藏量：{{item.thumbNum}}
      <b-icon-star v-if="item.hasThumb===false"></b-icon-star>
      <b-icon-star-fill v-else></b-icon-star-fill>
    </el-button>
  </el-footer>
</div>
</template>

<script>
import $ from 'jquery'

import Prism from 'prismjs';
import "@wangeditor/editor/dist/css/style.css"
import 'prismjs/themes/prism.css';
import {newstyle} from "@/components/note/EditConfig";
import {do_thumb_note, getUserNamebyID} from "@/config/apiconfig";
import {thumbNoteBody} from "@/config/config";
export default {
  name: "noteShowArticle",
  props:{
    item:null,
  },
  data(){
    return{
      nowId:this.item.id,
    }
  },
  methods:{
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
  },
  mounted() {
    this.axios.get(getUserNamebyID+this.item.userId)
        .then(res=>{
          this.userName=res.data.data
        })
      $('#'+this.nowId).load(this.item.noteUrl,()=>{
        Prism.highlightAll()
        $('#'+this.nowId).html($('#'+this.nowId).html()+newstyle)
      })
  }
}
</script>

<style scoped>
.editor-content-view {
  border: 3px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-top: 20px;
  overflow-x: auto;
}

.editor-content-view p,
.editor-content-view li {
  white-space: pre-wrap; /* 保留空格 */
}

.editor-content-view blockquote {
  border-left: 8px solid #d0e5f2;
  padding: 10px 10px;
  margin: 10px 0;
  background-color: #f1f1f1;
}

.editor-content-view code {
  font-family: monospace;
  background-color: #eee;
  padding: 3px;
  border-radius: 3px;
}
.editor-content-view pre>code {
  display: block;
  padding: 10px;
}

.editor-content-view table {
  border-collapse: collapse;
}
.editor-content-view td,
.editor-content-view th {
  border: 1px solid #ccc;
  min-width: 50px;
  height: 20px;
}
.editor-content-view th {
  background-color: #f1f1f1;
}

.editor-content-view ul,
.editor-content-view ol {
  padding-left: 20px;
}

.editor-content-view input[type="checkbox"] {
  margin-right: 5px;
}
/* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
ul, ol {
  margin: 10px 0 10px 20px;
}
</style>