//通过id获取用户信息 GET
const base=base+"";
const getUserById=base+"/get?id=";
//获取用户账号
const getUserAccountbyID=base+"/get/userAccount?id=";
//获取用户昵称
const getUserNamebyID=base+"/get/userName?id=";
//获取用户头像api get
const getUserAvatarByUserAccount=base+"/get/userAvatar?useraccount=";
const getUserAvatarById=base+"/get/userAvatar?id=";
//用户密码修改API POST
const user_update_password=base+"/update/resetpassword"
//用户信息更新api - 普通信息
const user_update_message=base+"/update"




//用户注册api
const user_register=base+"/register";
export {
    getUserAvatarByUserAccount,
    getUserNamebyID,
    getUserById,
    getUserAvatarById,
    getUserAccountbyID,
    user_update_password,
    user_register,
    user_update_message
}