<template>
    <div>
        <div>
<!--            <table>-->
<!--                <tr v-model="order.itemid">-->
<!--                    <td>{{order.itemid}}</td>-->
<!--                </tr>-->
<!--            </table>-->
<!--            <span >订单明细编号：</span>-->
        </div>
        <div>
            <el-table :data="order">
                <el-table-column label="订单明细编号" prop="itemid" sortable></el-table-column>
                <el-table-column label="编号" prop="bookid" sortable></el-table-column>
                <el-table-column label="序号" prop="sn" sortable></el-table-column>
                <el-table-column label="名称" prop="name" sortable></el-table-column>
                <el-table-column label="作者" prop="author" sortable></el-table-column>
                <el-table-column label="出版社" prop="publisher" sortable></el-table-column>
                <el-table-column label="价格" prop="price" sortable></el-table-column>
                <el-table-column label="数量" prop="num" sortable></el-table-column>
                <el-table-column label="预览图">
                    <div class="demo-image__preview" slot-scope="{row}">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="`/api/public/showImg/${row.picture}`">
                        </el-image>
                    </div>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {$get} from "../../../ajax";

    export default {
        name: "detailed",
        data(){
            return{
                // order:{itemid:'',bookid:'',sn:''},
                order:[],
            }
        },
        methods:{

        },
        mounted() {
            let ordid = this.$route.query.id
            console.log(ordid)
            $get('/api/adm/ord/findItemInfoByOrdid/'+ordid)
            .then(resp=>{
                this.order = resp.data.data
                console.log(this.order)
            })
            .catch(err=>{
                this.$message.error('加载失败，请检查网络')
            })
        }
    }
</script>

<style scoped>

</style>