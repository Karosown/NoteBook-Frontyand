<template>
<div id="updateHistory" >
  <el-table :data="updatelist">
    <el-table-column property="version" label="版本号" width="150"></el-table-column>
    <el-table-column property="userAccount" label="用户账号" width="200" :key="new Date().getTime()"></el-table-column>
    <el-table-column property="updateTime" label="操作时间"></el-table-column>
    <el-table-column property="ip" label="操作IP"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button icon="el-icon-edit"
                   type="danger"
            size="mini"
            @click="edit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {getNoteHistory, getUserAccountbyID} from "@/config/apiconfig";
import {noteupdateHistory} from "@/config/config";

export default {
  name: "updateHistory",
  props:{
    noteId:null
  },
  data(){
    /**
     * {
     * 				"id": "",
     * 				"ip": "",
     * 				"noteUrl": "",
     * 				"updateTime": "",
     * 				"userId": 0,
     * 				"version": 0
     * 			}
     */
    return{
        updatelist:[noteupdateHistory],
    }
  },
  methods:{
    edit(item){
      console.log(item)
      var xhr = new XMLHttpRequest();
      xhr.open('GET', item.noteUrl,true);
      xhr.send(null);
      xhr.onreadystatechange= ()=>{
        this.resetSetItem('updateText',xhr.responseText)
        sessionStorage.removeItem('isUpdateHistory');
        sessionStorage.setItem('isUpdateHistory',true);
      }
    }
  },
  mounted() {
      this.axios.get(getNoteHistory+this.noteId)
          .then(res => {
            if (!res.data.code) {
              this.updatelist = res.data.data.records
              for (var i = 0; i < this.updatelist.length; i++) {
                if (this.updatelist[i].userId==null){
                  this.updatelist[i].userAccount = "未知"
                }
                else{
                  const j=i;
                  this.axios.get(getUserAccountbyID + this.updatelist[j].userId)
                      .then(ress => {
                        if (!ress.data.code) {
                          this.updatelist[j].userAccount = (ress.data.data != null) ? ress.data.data : "未知"
                        } else {
                          this.updatelist[j].userAccount = "未知"
                        }
                      })
                      .catch(() => {
                        this.updatelist[j].userAccount = "未知"
                      })
                }

              }

            }
          })
  }
}
</script>

<style scoped>

</style>