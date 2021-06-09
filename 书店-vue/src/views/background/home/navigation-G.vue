<template>
    <div>
        <!--顶部导航栏-->
        <div style="display: flex">
<!--            <el-menu-->
<!--                    class="el-menu-demo"-->
<!--                    mode="horizontal"-->
<!--                    background-color="#545c64"-->
<!--                    text-color="#fff"-->
<!--                    active-text-color="#ffd04b"-->
<!--                    :router=true-->
<!--                    :default-active="$route.name">-->
<!--                <el-menu-item index="/backgroundHome/list">商品类型</el-menu-item>-->
<!--                <el-menu-item index="/">商品列表</el-menu-item>-->
<!--                <el-menu-item index="/">用户管理</el-menu-item>-->
<!--                <el-menu-item index="/">订单管理</el-menu-item>-->
<!--                &lt;!&ndash;头像&ndash;&gt;-->
<!--                <div class="Avatar">-->
<!--                    <div class="block"><el-avatar size="large" :src="circleUrl"></el-avatar>-->
<!--&lt;!&ndash;                        <span v-if="isLogin==false"><a class="a" @click="doLogin()" href="#">未登录,请登录</a></span>&ndash;&gt;-->
<!--&lt;!&ndash;                        <span v-if="isLogin">{{userName}}</span>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </el-menu>-->
        </div>
        <!--侧边导航栏-->
        <div>
            <el-container>
                <!--顶部-->
                <el-header>
                    <div class="head">
                        <h1>后台</h1>
                        <div class="Avatar">
                            <div class="block">
                                <el-avatar size="large" v-model="img" :src="img"></el-avatar>
                                <span v-if="nickname == null"><a class="a" @click="doLogin()" href="#">未登录,请登录</a></span>
                                <span v-model="nickname">{{nickname}}</span>
                                <span v-if="nickname != null"><a class="a" @click="logout()" href="#">  退出登录</a></span>
                            </div>
                        </div>
                    </div>
                </el-header>
                <!--主体-->
                <el-main>
                    <el-row>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="22">
                            <el-row>
                                <!--导航栏-->
                                <el-col :span="4">
                                    <el-menu
                                            :default-active="$route.name"
                                            :router="true"
                                            class="el-menu-vertical-demo"
                                            @open="handleOpen"
                                            @close="handleClose"
                                            :unique-opened="true">
                                        <!--商品类型-->
                                        <el-menu-item index="/backgroundHome/typeList">
                                            <i class="el-icon-setting"></i>
                                            <span slot="title">商品类型</span>
                                        </el-menu-item>
                                        <!--商品列表-->
                                        <el-submenu index="/backgroundHome/bookList">
                                            <template slot="title">
                                                <i class="el-icon-location"></i>
                                                <span>商品列表</span>
                                            </template>
                                            <el-menu-item-group>
                                                <el-menu-item index="/backgroundHome/bookList">列表</el-menu-item>
                                                <el-menu-item index="/backgroundHome/bookAdd">添加</el-menu-item>
                                            </el-menu-item-group>
                                        </el-submenu>
                                        <!--用户管理-->
                                        <el-submenu index="/backgroundHome/userList">
                                            <template slot="title">
                                                <i class="el-icon-location"></i>
                                                <span>用户管理</span>
                                            </template>
                                            <el-menu-item-group>
                                                <el-menu-item index="/backgroundHome/admList">管理员</el-menu-item>
                                                <el-menu-item index="/backgroundHome/userList">用户</el-menu-item>
                                                <el-menu-item index="/backgroundHome/addAdmin">添加管理员</el-menu-item>
                                            </el-menu-item-group>
                                        </el-submenu>
                                        <!--订单管理-->
                                        <el-submenu index="/backgroundHome/ordList">
                                            <template slot="title">
                                                <i class="el-icon-location"></i>
                                                <span>订单管理</span>
                                            </template>
                                            <el-menu-item-group>
                                                <el-menu-item index="/backgroundHome/ordList">订单列表</el-menu-item>
                                            </el-menu-item-group>
                                        </el-submenu>
                                        <!--热销商品管理-->
                                        <el-submenu index="/backgroundHome/slideshowList">
                                            <template slot="title">
                                                <i class="el-icon-location"></i>
                                                <span>热销管理</span>
                                            </template>
                                            <el-menu-item-group>
                                                <el-menu-item index="/backgroundHome/slideshowList">轮播图</el-menu-item>
                                            </el-menu-item-group>
                                        </el-submenu>
                                    </el-menu>
                                </el-col>
                                <el-col :span="20">
                                    <router-view v-if="isRouterAlive"></router-view>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                    </el-row>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        components:{},
        name: "navigation-G",
        provide(){//注册个方法,进行刷新
            return{
                reload:this.reload
            }
        },
        data(){
            return{
                isRouterAlive:true,//路由刷新
                nickname:'',
                img:'',
                circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            }
        },
        methods: {
            //路由刷新的方法
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function() {
                    this.isRouterAlive = true
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                sessionStorage.setItem('isLogin',false);//改变登录状态
                sessionStorage.removeItem('token')//清除token
                sessionStorage.removeItem("nickname")
                this.$router.push('/home')//跳回首页
            }
        },
        mounted() {
            sessionStorage.setItem('img','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');//头像
            this.img = sessionStorage['img']
            this.nickname = sessionStorage['nickname']
        }
    }
</script>

<style scoped>
    .Avatar{
        float: right;
        margin-right: 10px;
        margin-top: 10px;
    }
    .active{
        color: orange;
    }
    .a{
        text-decoration: none;
        color: orange;
        font-size: 10px;
        margin-bottom: 10px;
        z-index: auto;
    }
    .ip{
        border-radius: 30px;
        width: 150px;
    }
    .head{
        display: flex;
        background-color: #99a9bf;
        height: 60px;
        width: 100%;
    }
</style>