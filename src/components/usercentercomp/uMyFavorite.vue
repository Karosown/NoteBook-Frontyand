<template>
<note-showlist-by-card></note-showlist-by-card>
</template>

<script>
import NoteShowlistByCard from "@/components/note/noteShowlistByCard";
import {get_noteslist_byfavorite} from "@/config/apiconfig";
export default {
  name: "uMyFavorite",
  components: {NoteShowlistByCard},
  mounted() {
    this.axios.get(get_noteslist_byfavorite)
        .then(res=>{
          sessionStorage.setItem("isSearchOrFavorite",true);
          this.resetSetItem('notelist',JSON.stringify(res.data.data.records));
        })
  }
}
</script>

<style scoped>

</style>