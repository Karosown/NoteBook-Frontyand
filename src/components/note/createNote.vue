<template>
  <div id="createNote">
    <el-container>
    <el-header>
        <el-row>
        <el-col :span="24">
          <el-input  placeholder="请输入日记标题" v-model="addNoteBody.noteTitle"></el-input>
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
          v-model="addNoteBody.noteText"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
      />
    </div>
      </el-main>
      <el-footer style="z-index: 0">
        <el-checkbox :true-label="1" :false-label="0" v-model="addNoteBody.isPublic" style="float: left">公开</el-checkbox>
        <el-button id="save" type="primary" @click="submit">保存</el-button>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import "@wangeditor/editor/dist/css/style.css"
import {addNoteBody} from "@/config/config";
import {add_notes} from "@/config/apiconfig";
import {editorConfig} from "@/components/note/EditConfig";
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'

Boot.registerModule(markdownModule)

export default {
  name: "createNote",
  components: { Editor, Toolbar },
  data: function () {
    return {
      editor: null,
      toolbarConfig: {},
      editorConfig: editorConfig,
      mode: 'default', // or 'simple'
      addNoteBody:addNoteBody
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      this.editor.getConfig();
    },
  submit(){
    this.axios.post(add_notes,addNoteBody)
        .then(res=>{
          if (!res.data.code){
            this.$message.success(res.data.message)
            document.getElementById('save').setAttribute('disabled',true)
            window.location.reload();
            this.$router.push({path:'/mynotes'});
          }
          else {
            this.$message.error(res.data.message)
          }
        })
        .catch(err=>{
          this.$message.info(err.data)
        })
  }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.addNoteBody.userId=JSON.parse(sessionStorage.getItem('loginStatus')).id
      this.addNoteBody.noteText = '<p style="text-align: left"><br></p>'
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