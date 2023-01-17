// eslint-disable-next-line no-unused-vars
var api_run="http://notebook.api.wzl1.top/api"; //运行环境接口
// eslint-disable-next-line no-unused-vars
const api_dev="http://127.0.0.1:7529/api";      //开发环境接口
//环境切换
const baseAPI=process.env.NODE_ENV ==='production'?api_run:api_dev;


//用户登录api
const sys_login="/user/login";



//获取当前登录用户 get
const sys_getlogin="/user/get/login";
//用户注销 post
const sys_logout="/user/logout";
export {
    baseAPI,
    sys_login,
    sys_getlogin,
    sys_logout,
}