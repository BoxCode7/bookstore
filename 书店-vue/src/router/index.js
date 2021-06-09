import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

//解决重复路由跳转
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this,location).catch(err=>err)
}
//打包构建项目npm run build时要把路由import出去，然后再将dist目录下的内容复制到后端
import home from '@/views/home/home.vue';
import background_home_home from "@/views/background/home/home.vue"
import background_type_list from '@/views/background/type/list.vue'
import background_book_list from '@/views/background/book/list.vue'
import background_book_add from '@/views/background/book/add.vue'
import background_book_update from '@/views/background/book/update.vue'
import background_user_userList from '@/views/background/user/userList.vue'
import background_user_admList from '@/views/background/user/admList.vue'
import background_user_addAdmin from '@/views/background/user/addAdmin.vue'
import background_ord_list from '@/views/background/ord/list.vue'
import background_ord_addShip from '@/views/background/ord/addShip.vue'
import background_ord_detailed from '@/views/background/ord/detailed.vue'
import background_hot_slideshowList from '@/views/background/hot/slideshowList.vue'
import background_hot_add from '@/views/background/hot/add.vue'


const routes=[
    {path: '',redirect:'/home'},
    {path: '/',name: '首页',component:()=>import('@/views/home/home.vue'),meta:{title:'爪哇岛书店'}},
    {path: '/home',name: '首页1',component:()=>import('@/views/home/home.vue'),meta:{title:'爪哇岛书店'}},

    {path:'/backgroundHome',name:'后台首页',component:()=>import("@/views/background/home/home.vue"),meta:{title:'爪哇岛书店|后台管理'},
        children:[
            {path:'typeList',name:'商品类型列表',component:()=>import('@/views/background/type/list.vue')},

            {path:'bookList',name:'商品列表',component:()=>import('@/views/background/book/list.vue')},
            {path:'bookAdd',name:'添加商品',component:()=>import('@/views/background/book/add.vue')},
            {path:'bookUpdate',name:'bookUpdate',component:()=>import('@/views/background/book/update.vue')},

            {path:'userList',name:'用户列表',component:()=>import('@/views/background/user/userList.vue')},
            {path:'admList',name:'管理员列表',component:()=>import('@/views/background/user/admList.vue')},
            {path:'addAdmin',name:'添加管理员',component:()=>import('@/views/background/user/addAdmin.vue')},

            {path:'ordList',name:'订单列表',component:()=>import('@/views/background/ord/list.vue')},
            {path:'addShip',name:'addShip',component:()=>import('@/views/background/ord/addShip.vue')},
            {path:'detailed',name:'detailed',component:()=>import('@/views/background/ord/detailed.vue')},

            {path: 'slideshowList',name: '轮播图管理',component:()=>import('@/views/background/hot/slideshowList.vue')},
            {path: 'hotAdd',name: '添加热销',component:()=>import('@/views/background/hot/add.vue')},
        ]
    },

]

const router = new VueRouter({routes,linkActiveClass:'active'})
// linkActiveClass当前被激活的路由样式 要在使用组件定义样式 .active

//路由守卫
// router.beforeEach((to,from,next)=>{
//     console.log(to.meta.role)
// })

export default router