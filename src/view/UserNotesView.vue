<template>
<div id="UserNotesView">
  <br>
  <el-container>
    <el-main>
      <note-showlist-by-card></note-showlist-by-card>
    </el-main>
  </el-container>

</div>
</template>

<script>
import NoteShowlistByCard from "@/components/note/noteShowlistByCard";
import {hotNoteList} from "@/config/apiconfig";
// import {get_noteslist_bynotetitle, get_noteslist_byuserid} from "@/config/apiconfig";
export default {
  name: "UserNotesView",
  components: {NoteShowlistByCard},

  data(){
    return{
    }
  },
  methods:{

  },
  beforeCreate() {
    this.axios.get(hotNoteList)
        .then(res=>{
          sessionStorage.setItem('isSearchOrFavorite',true)
          this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
        })
  },
  mounted() {
    // this.axios.get(get_noteslist_byuserid+JSON.parse(sessionStorage.getItem('loginStatus')).id)
    //     .then(res=>{
    //       sessionStorage.setItem('isSearchOrFavorite',false)
    //       this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
    //     })
  }
}
</script>

<style scoped>

</style>