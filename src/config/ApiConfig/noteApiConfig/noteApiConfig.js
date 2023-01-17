const base = "/note"
//获得日记历史版本
const getNoteHistory = base+"/getHistory?id=";
//热点日记获取
const hotNoteList=base+"/list/hot"
//点赞
const do_thumb_note=base+"/thumb"
//删除日记API POST
const delete_note=base+"/delete"
//更新日记API post
const update_notes=base+"/update"
const get_note_byid=base+"/get?id="
const get_noteslist_byfavorite=base+"/list/myfavorite"
const get_noteslist_bynotetitle=base+"/list/page?sortField=createTime&noteTitle=";
//获取某个用户笔记列表
const get_noteslist_byuserid=base+"/list/page?sortField=createTime&userId=";
//新增日记api post
const add_notes=base+"/add"

export {
    getNoteHistory,
    hotNoteList,
    do_thumb_note,
    delete_note,
    get_noteslist_byfavorite,
    get_noteslist_bynotetitle,
    get_noteslist_byuserid,
    get_note_byid,
    update_notes,
    add_notes,
}