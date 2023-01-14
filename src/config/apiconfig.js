// eslint-disable-next-line no-unused-vars
var api_run="http://notebook.api.wzl1.top/api"; //运行环境接口
// eslint-disable-next-line no-unused-vars
const api_dev="http://127.0.0.1:7529/api";      //开发环境接口
//环境切换
const baseAPI=process.env.NODE_ENV ==='production'?api_run:api_dev;


const hotNoteList="/note/list/hot"
//点赞
const do_thumb_note="/note/thumb"
//删除日记API POST
const delete_note="/note/delete"
//更新日记API post
const update_notes="/note/update"
const get_note_byid="/note/get?id="
const get_noteslist_byfavorite="/note/list/myfavorite"
const get_noteslist_bynotetitle="/note/list/page?sortField=createTime&noteTitle=";
//获取某个用户笔记列表
const get_noteslist_byuserid="/note/list/page?sortField=createTime&userId=";
//新增日记api post
const add_notes="/note/add"
//用户密码修改API POST
const user_update_password="/user/update/resetpassword"
//用户信息更新api - 普通信息
const user_update_message="/user/update"
//邮箱验证码发送api
const checkcode_send = "/checkcode/send";
//用户注册api
const user_register="/user/register";
//用户登录api
const user_login="/user/login";
//图形验证码生成api
const imgcheckcode_touch="/checkcode/touch/";
//图片转base64api（文件） POST
const img2base64_File="/file/i2b/img";
//图片转base64api（链接） GET
const img2base64_URL="/file/i2b/src?url=";
//通过id获取用户信息 GET
const getUserById="/user/get?id=";
//获取用户昵称
const getUserNamebyID="/user/get/userName?id=";
//获取用户头像api get
const getUserAvatarByUserAccount="/user/get/userAvatar?useraccount=";
const getUserAvatarById="/user/get/userAvatar?id=";
//获取当前登录用户 get
const sys_getlogin="/user/get/login";
//用户注销 post
const sys_logout="/user/logout";
export {
    hotNoteList,
    do_thumb_note,
    delete_note,
    get_noteslist_byfavorite,
    get_noteslist_bynotetitle,
    get_noteslist_byuserid,
    get_note_byid,
    update_notes,
    add_notes,
    user_update_password,
    user_update_message,
    baseAPI,
    user_register,
    user_login,
    getUserNamebyID,
    getUserAvatarByUserAccount,
    getUserAvatarById,
    img2base64_File,
    img2base64_URL,
    imgcheckcode_touch,
    sys_getlogin,
    sys_logout,
    checkcode_send,
    getUserById
}