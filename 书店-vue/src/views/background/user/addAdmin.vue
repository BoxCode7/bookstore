<template>
    <div>
        <el-form :model="newUser" status-icon ref="newUser" label-width="100px" class="demo-ruleForm">
            <h3>添加管理员</h3>
            <el-form-item label="账号" prop="rule">
                <el-input v-model="newUser.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="rule">
                <el-input v-model="newUser.password"></el-input>
            </el-form-item>
            <el-form-item label="名字" prop="rule">
                <el-input v-model="newUser.nickname"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="rule">
                <el-input v-model="newUser.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('newUser')">添 加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {$postX} from "../../../ajax";
    import {Message} from "element-ui";

    export default {
        name: "addAdmin",
        data(){
            // var validate = (rule, value, callback) => {
            //     if (!value) {
            //         callback(new Error('不能为空'));
            //     }
            //     callback();
            // };
            return{
                formLabelWidth: '120px',
                newUser:{account:'',password:'',nickname:'',phone:''},
                // rules:{//输入过滤器
                //     rule: [
                //         { validator: validate, trigger: 'blur' }
                //     ]
                // },
            }
        },
        methods:{
            add(){
                $postX('/api/adm/user/addAdm',this.newUser)
                .then(resp=>{Message({message: resp.data.msg, type: 'success'});})
                .catch(err=>{})
            }
            // add(newUser){
                // this.$refs[newUser].validate((valid) => {
                //     if (valid) {

                    // } else {
                    //     this.$message.error('请正确填写');
                    //     return false;
                    // }
                // });
            // }
        }
    }
</script>

<style scoped>

</style>