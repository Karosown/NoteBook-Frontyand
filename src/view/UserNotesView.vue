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
import {get_noteslist_byuserid} from "@/config/apiconfig";
// import {get_noteslist_bynotetitle, get_noteslist_byuserid} from "@/config/apiconfig";
export default {
  name: "UserNotesView",
  components: {NoteShowlistByCard},

  data(){
    return{
    }
  },
  methods:{
    // search(){
    //   this.$emit('notelist',null)
    //   if (this.searchText!=""){
    //     this.axios.get(get_noteslist_bynotetitle+this.searchText)
    //         .then(res=>{
    //           this.$emit('notelist',res.data.data.records)
    //         })
    //     this.$data.isSearchOrFavorite=true;
    //   }
    //   else{
    //     this.axios.get(get_noteslist_byuserid+JSON.parse(sessionStorage.getItem('loginStatus')).id)
    //         .then(res=>{
    //           this.$emit('notelist',res.data.data.records)
    //         })
    //     this.$data.isSearchOrFavorite=false;
    //   }
    // }
  },
  mounted() {
    this.axios.get(get_noteslist_byuserid+JSON.parse(sessionStorage.getItem('loginStatus')).id)
        .then(res=>{
          sessionStorage.setItem('isSearchOrFavorite',false)
          this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
        })
  }
}
</script>

<style scoped>

</style>