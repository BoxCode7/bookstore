<template>
    <div>
        <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="newType">
                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input :value="newType.id" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-input v-model="newType.type" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update()">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {$postX} from "../../../ajax";

    export default {
        name: "update",
        inject:['reload'],//注入一个刷新的方法
        data(){
            return{
                dialogFormVisible:false,
                formLabelWidth: '120px',
                newType:{id:'',type:''}
            }
        },
        methods:{
            dialogForm(type){
                let that = this
                that.newType.id = type.id
                that.newType.type = type.type
                this.dialogFormVisible = true
            },
            update(){
                let that = this
                this.dialogFormVisible = false
                console.log(that.newType)
                $postX('/api/adm/type/add/',that.newType)
                    .then(resp=> {
                        this.$message({message: '成功修改'+that.newType.type,type: 'success'});
                        this.reload()//刷新
                    })
                    .catch(err => {this.$message.error('修改失败，请重试');}
                )
            }
        }
    }
</script>

<style scoped>

</style>