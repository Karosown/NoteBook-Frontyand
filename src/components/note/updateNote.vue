<template>
  <div id="updateNote">
    <div id="temp" style="display:none;"></div>
    <el-container>
    <el-header>
        <el-row>
        <el-col :span="24">
          <el-input  placeholder="请输入日记标题" v-model="updateNoteBody.noteTitle"></el-input>
        </el-col>
      </el-row>
    </el-header>
      <el-main  style="z-index: 1">
    <div style="border: 1px solid #ccc;">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="updateNoteBody.noteText"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
      />
    </div>
      </el-main>
      <el-footer style="z-index: 0">
        <el-checkbox :true-label="1" :false-label="0" v-model="updateNoteBody.isPublic" style="float: left">公开</el-checkbox>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="danger" @click="Delete">删除</el-button>
        <el-button type="info" @click="openHistory=true">查看历史版本</el-button>
      </el-footer>
    </el-container>
    <el-dialog title="历史版本" :visible.sync="openHistory" :modal="false">
      <update-history :note-id="noteId"></update-history>
    </el-dialog>
  </div>
</template>


<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import "@wangeditor/editor/dist/css/style.css"
import {deleteBody, updateNoteBody} from "@/config/config";
import {delete_note, get_note_byid, update_notes} from "@/config/apiconfig";
import {editorConfig} from "@/components/note/EditConfig";
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import UpdateHistory from "@/components/note/updateHistory";

Boot.registerModule(markdownModule)

export default {
  name: "updateNote",
  components: {UpdateHistory, Editor, Toolbar },
  props:{
    noteId: null
  },
  data: function () {
    return {
      openHistory:false,
      editor: null,
      toolbarConfig: {},
      editorConfig: editorConfig,
      mode: 'default', // or 'simple'
      updateNoteBody:updateNoteBody,
      deleteBody:deleteBody,
    }
  },
  methods: {

    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      this.editor.getConfig();
    },
  submit(){
    this.axios.post(update_notes,updateNoteBody)
        .then(res=>{
          if (!res.data.code){
            this.$message.success(res.data.message)
            window.location.reload()
          }
          else {
            this.$message.error(res.data.message)
          }
        })
        .catch(err=>{
          this.$message.info(err.data)
        })
    window.location.reload()
  },
    Delete(){
        this.deleteBody.id=this.noteId;
        this.axios.post(delete_note,this.deleteBody)
            .then(res=> {
              if (!res.data.code) {
                this.$message.success(res.data.message)
                window.location.reload()
              }
              else this.$message.error(res.data.message)
            })
            .catch(err=>{
              this.$message.info(err.data)
            })
    }
  },
  mounted() {
    this.updateNoteBody.userId=JSON.parse(sessionStorage.getItem('loginStatus')).id
      if(this.noteId==null)this.updateNoteBody.noteText = '<p>在这里书写您今天的日记</p>'
      else if (JSON.parse(sessionStorage.getItem('isUpdateHistory'))==false){
        this.axios.get(get_note_byid+this.noteId)
            .then(res => {
              this.updateNoteBody.noteTitle = res.data.data.noteTitle
              this.updateNoteBody.id = res.data.data.id
              this.updateNoteBody.isPublic = res.data.data.isPublic
              this.updateNoteBody.usernoteId = res.data.data.usernoteId
              var xhr = new XMLHttpRequest();
              xhr.open('GET', res.data.data.noteUrl,true);
              xhr.send(null);
              xhr.onreadystatechange= ()=>{
                sessionStorage.setItem('updateText',xhr.responseText)
                updateNoteBody.noteText=sessionStorage.getItem('updateText')
              }
            })
      }

    window.addEventListener('setItem',()=>{
      updateNoteBody.noteText=sessionStorage.getItem('updateText')
    })
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>


<style src="@wangeditor/editor/dist/css/style.css" scoped>

</style>