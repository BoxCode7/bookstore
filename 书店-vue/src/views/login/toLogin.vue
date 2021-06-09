<template>
    <div>
<!--        <div v-show="dialogFormVisible==true" class="div">-->
<!--            <h1 class="h">欢迎登录</h1>-->
<!--            <el-form :model="login" class="h">-->
<!--                账号：<el-input placeholder="请输入账号" v-model="login.username" clearable style="width: 180px"></el-input><br/>-->
<!--                密码：<el-input placeholder="请输入密码" v-model="login.password" show-password style="width:180px;margin-top:10px;"></el-input><br/>-->
<!--                <el-button type="success" round style="margin-top: 10px;" @click="doLogin()">登录</el-button>-->
<!--            </el-form>-->
<!--        </div>-->
        <el-dialog :visible.sync="dialogFormVisible">
            <h1 class="h">欢迎登录</h1>
            <el-form :model="login" class="h">
                账号：<el-input placeholder="请输入账号" v-model="login.username" clearable style="width: 180px"></el-input><br/>
                密码：<el-input placeholder="请输入密码" v-model="login.password" show-password style="width:180px;margin-top:10px;"></el-input><br/>
                <el-button type="success" round style="margin-top: 10px;" @click="doLogin()">登录</el-button>
            </el-form>
        </el-dialog>
        <router-view></router-view>
    </div>
</template>

<script>
    import {$get, $postX} from "../../ajax/index";
    import {Message} from 'element-ui'
    export default {
        name: "login",
        components: {},
        inject:['reload'],//注入一个刷新的方法
        data(){
            return{
                dialogFormVisible:false,
                login:{
                    username:'',
                    password:'',
                    grant_type:'password',
                    client_id:'sobook4',
                    client_secret:'444444',
                }
            }
        },
        methods:{
            dialogForm(){
                this.dialogFormVisible = true
                console.log("登录调用")
            },
            doLogin(){
                var that=this
                that.dialogFormVisible = false
                $postX('/oauth/token',that.login)
                    .then(resp=>{
                        Message({message:"登录成功",type:'success'})
                        sessionStorage.setItem('token',resp.data.access_token)//保存token
                        $get('/api/info/getUser')
                        .then(resp=>{
                            sessionStorage.setItem('img',resp.data.img)//保存头像
                            sessionStorage.setItem('nickname',resp.data.nickname)//保存用户名
                            sessionStorage.setItem('username',resp.data.username)//保存账号
                            if(resp.data.role=='G'){
                                this.$router.push('/backgroundHome')
                            }else {
                                // this.$router.push('/home')
                                // this.reload()//刷新
                                location.reload()//刷新
                            }
                        })
                    }).catch(err=>{
                    Message.error('登录失败');
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>
    .div{
        width: 400px;
        height: 230px;
        background-color: rgba(225,225,225,0.5);
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.5);
        margin:0px auto;
        margin-top: 200px;
        z-index: auto;
    }
    .h{
        text-align: center;
    }
</style>