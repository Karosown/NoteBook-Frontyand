import Vue from 'vue'   //引入Vue
import VueRouter from 'vue-router'  //引入vue-router
import LogRegBody from "@/view/LogRegBody";
import UserCenter from "@/view/UserCenter";
import AboutView from "@/view/AboutView";
import uMessageshow from "@/components/usercentercomp/uMessageshow"
import uMessageUpPassWord from "@/components/usercentercomp/uMessageUpPassWord"
import uMyFavorite from "@/components/usercentercomp/uMyFavorite"
import UserNotesView from "@/view/UserNotesView";
Vue.use(VueRouter)  //Vue全局使用Router
const router = new VueRouter({
 mode:'history',//去除#号
 routes: [              //配置路由，这里是个数组
  {   //配置默认路由
    path:'/',
   component:AboutView,
   meta:{
     title:'掌印日记'
   }
  },
  {                    //每一个链接都是一个对象
   path: '/usercenter',         //链接路径
   component: UserCenter,   //对应的组件模板
   meta:{
    mustLogin:true,    //强制登录
   },
   children:[
    {
     path:'/',
     component:uMessageshow,
     meta:{
      title:'用户中心'
     }
    },
    {
     path:'/myfavorite',
     component:uMyFavorite,
     meta:{
      title: "我的收藏"
     }
    },
    {
      path:'/usermessage',
     component:uMessageshow,
     meta:{
       title:'个人资料'
     }
    },
    {
      path:'/updatemsg',
      component:uMessageUpPassWord,
     meta:{
       title: '安全设置'
     }
    }
   ]
  },
  {
   path:'/logreg',
   component: LogRegBody,
   meta:{
    title: 'Welcome to 掌印日记'
   }
  },
  {
   path:'/about',
   component:AboutView,
   meta:{
    title: '关于我们'
   }
  },
  {
   path:'/notescenter',
   component:UserNotesView,
   meta:{
    mustLogin:true,
    title: '我的日记'
   },
  }
 ]
});
export default router;
