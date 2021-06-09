<template>
    <div>
        <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="22">
                <el-table
                        :data="orders">
                    <el-table-column label="订单编号" prop="ordid" sortable></el-table-column>
                    <el-table-column label="用户名" prop="nickname" sortable></el-table-column>
                    <el-table-column label="用户账户" prop="account" sortable></el-table-column>
                    <el-table-column label="付款金额" prop="amount" sortable></el-table-column>
                    <el-table-column label="付款状态" prop="ispay" sortable></el-table-column>
                    <el-table-column label="电话" prop="phone" sortable></el-table-column>
                    <el-table-column label="地址" prop="addr" sortable></el-table-column>
                    <el-table-column label="快递单号" prop="shipno" sortable></el-table-column>
                    <el-table-column label="下单时间"  prop="tpay">
                        <template slot-scope="{row}">{{row.tpay | timestampToTime }}</template>
                    </el-table-column>
                    <el-table-column label="付款时间"  prop="tcreate">
                        <template slot-scope="{row}">{{row.tcreate | timestampToTime }}</template>
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="detailed(scope.$index, scope.row)">详情</el-button>
                            <el-button
                                    size="mini"
                                    @click="addShip(scope.$index, scope.row)">发货</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="start"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="num"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
            <el-col :span="1"></el-col>
        </el-row>
    </div>
</template>

<script>
    import {$post} from "../../../ajax";
    import {Message} from "element-ui";

    export default {
        name: "list",
        components: {},
        data(){
          return{
              start:0, //初始页
              num:10,//每页几行
              total:0,//总行数
              orders:[],
          }
        },
        methods: {
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let that = this
                $post("/api/adm/ord/findOrdInfo/"+that.start+"/"+val)
                    .then(resp=>{
                        that.orders = resp.data.data.orders
                        that.total = resp.data.data.total
                    })
                    .catch(err => Message.error('加载失败，请检查网络'))
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                let that = this
                $post("/api/adm/ord/findOrdInfo/"+val+"/"+that.num)
                    .then(resp=>{
                        that.orders = resp.data.data.orders
                        that.total = resp.data.data.total
                    })
                    .catch(err => Message.error('加载失败，请检查网络'))
            },



            detailed(index, row) {
                console.log(row.ordid)
                this.$router.push({name:'detailed',query:{id:row.ordid}})
            },
            addShip(index, row) {
                console.log(row.ordid)
                this.$router.push({name:'addShip',query:{id:row.ordid}})
            },
        },
        mounted() {
            let that = this
            $post("/api/adm/ord/findOrdInfo/"+that.start+"/"+that.num)
            .then(resp=>{
                that.orders = resp.data.data.orders
                that.total = resp.data.data.total
            })
            .catch(err => Message.error('加载失败，请检查网络'))
        },
        // 日期过滤器
        filters: {
            timestampToTime(timestamp) {
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
                var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
                var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
                var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m + s;
            }
        },
    }
</script>

<style scoped>

</style>