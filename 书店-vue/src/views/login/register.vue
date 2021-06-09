<template>
    <div>
        <el-dialog :visible.sync="dialogFormVisible">
            <h1 class="h">欢迎注册</h1>
            <el-form :model="register" status-icon ref="register" label-width="100px" class="register">
                <el-form-item label="账号" prop="rule">
                    <el-input v-model="register.account"></el-input>
                </el-form-item>
                <el-form-item label="名字" prop="rule">
                    <el-input v-model="register.nickname"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="rule">
                    <el-input v-model="register.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="register.password" autocomplete="off"></el-input>
                </el-form-item>
<!--                <el-form-item label="确认密码" prop="checkPass">-->
<!--                    <el-input type="password" v-model="register.checkPass" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('register')">注册</el-button>
                    <el-button @click="resetForm('register')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <p>注册并登录</p>
                    <el-switch
                            v-model="value"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
        </el-dialog>
        <router-view></router-view>
    </div>
</template>

<script>
    import {$get, $postJson, $postX} from "../../ajax/index";
    import {Message} from 'element-ui'
    export default {
        name: "register",
        components: {},
        inject:['reload'],//注入一个刷新的方法
        data(){
            return{
                dialogFormVisible:false,
                register:{account:'',password:'',nickname:'',phone:''},
                value: true,
                login:{
                    username:'',
                    password:'',
                    grant_type:'password',
                    client_id:'sobook',
                    client_secret:'111111',
                },
                // rules: {
                //     password: [{validator: validatePass, trigger: 'blur'}],
                //     checkPass: [{validator: validatePass2, trigger: 'blur'}],
                // }
            };
            //密码校验
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.register.password !== '') {
            //             this.$refs.register.validateField('checkPass');
            //         }
            //         callback();
            //     }
            // };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.register.checkPass) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };
        },
        methods:{
            dialogForm(){
                this.dialogFormVisible = true
            },
            //注册
            submitForm(register) {
                this.$refs[register].validate((valid) => {
                    if (valid) {
                        $postJson('/api/public/addUser',this.register)
                            .then(resp=> {
                                this.dialogFormVisible = false//关闭注册弹窗
                                this.$message({message: resp.data.msg,type: 'success'});
                                if (this.value == true){
                                    var that = this
                                    this.login.username = this.register.account
                                    this.login.password = this.register.password
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
                                                        // this.$router.push('/')
                                                        // this.reload()//刷新
                                                        location.reload()
                                                    }
                                                })
                                        }).catch(err=>{
                                        Message.error('登录失败');
                                        console.log(err)
                                    })
                                }
                            })
                            .catch(err => {this.$message.error('添加失败，请重试');}
                            )
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
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