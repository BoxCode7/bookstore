<template>
    <div>
        <el-form :model="addShip" label-width="80px">
            <h3>添加发货</h3>
            <el-form-item label="订单编号" prop="rule">
                <el-input v-model="addShip.ordid"></el-input>
            </el-form-item>
            <el-form-item label="快递单号" prop="rule">
                <el-input v-model="addShip.shipno"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add(addShip)">添 加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {$post, $postJson} from "../../../ajax";

    export default {
        name: "addAdmin",
        data(){
            return{
                formLabelWidth: '120px',
                addShip:{ordid:'',shipno:''},
            }
        },
        methods:{
            add(addShip){
                $postJson('/api/adm/ord/addShip',addShip)
                    .then(resp=>{
                        this.$message({message: resp.data.msg,type: 'success'})
                        this.$router.push('/backgroundHome/ordList')
                    })
                    .catch(err => {this.$message.error('添加失败，请重试');}
                    )
            }
        },
        mounted() {
          this.addShip.ordid = this.$route.query.id
        }
    }
</script>

<style scoped>

</style>