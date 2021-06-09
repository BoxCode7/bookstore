<template>
    <div>
        <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="newType">
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-input v-model="newType.type" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add()">提 交</el-button>
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
                newType:{id:'0',type:''}
            }
        },
        methods:{
            addDialogForm(){
                this.dialogFormVisible = true
            },
            add(){
                let that = this
                this.dialogFormVisible = false
                console.log(that.newType)
                $postX('/api/adm/type/add/',that.newType)
                    .then(resp=> {
                        this.$message({message: '成功添加'+that.newType.type,type: 'success'});
                        this.reload()//刷新
                    })
                    .catch(err => {this.$message.error('添加失败，请重试');}
                )
            }
        }
    }
</script>

<style scoped>

</style>