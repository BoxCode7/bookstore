<template>
    <div>
        <div>
            <el-menu
                    class="el-menu-demo active"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router=true
                    :default-active="$route.name">
                <el-menu-item index="/Home">首页</el-menu-item>
                <el-menu-item index="/">商品详情</el-menu-item>
                <!--头像-->
                <div class="Avatar">
                    <div class="block">
                        <el-avatar size="large" v-model="img" :src="img"></el-avatar>
                        <span v-if="nickname == null"><a class="a" @click="doLogin()" href="#">登录 / </a></span>
                        <span v-if="nickname == null"><a class="a" @click="register()" href="#">注册</a></span>
                        <span v-model="nickname">{{nickname}}</span>
                        <span v-if="nickname != null"><a class="a" @click="logout()" href="#">  退出登录</a></span>
                    </div>
                </div>

            </el-menu>
            <toLogin ref="toLogin"></toLogin>
            <register ref="register"></register>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import ToLogin from '../login/toLogin'
    import Register from "../login/register";
    export default {
        components:{Register, ToLogin},
        name: "navigation-p",
        inject:['reload'],//注入一个刷新的方法
        data(){
            return{
                // activeIndex:1,
                isLogin:false,
                username:'',
                nickname:'',
                img:'',
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            doLogin(){
                this.$refs.toLogin.dialogForm()
            },
            register(){
                this.$refs.register.dialogForm()
            },
            logout(){
                sessionStorage.setItem('isLogin',false);//改变登录状态
                sessionStorage.removeItem('token')//清除token
                sessionStorage.removeItem("nickname")
                this.$router.push('/')//跳回首页
                location.reload()//刷新
            }
        },
        mounted() {
            sessionStorage.setItem('img','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');//头像
            this.username = sessionStorage['username'];//用户账号
            this.img = sessionStorage['img'];//头像
            this.nickname = sessionStorage['nickname'];//用户名
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
        color:orange;
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
</style>