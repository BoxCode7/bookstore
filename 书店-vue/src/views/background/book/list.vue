<template>
    <div>
        <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="22">
                <el-table
                        :data="arrBook">
                    <el-table-column label="编号" prop="id" sortable></el-table-column>
                    <el-table-column label="序号" prop="sn" sortable></el-table-column>
                    <el-table-column label="名称" prop="name" sortable></el-table-column>
                    <el-table-column label="价格" prop="price" sortable></el-table-column>
                    <el-table-column label="作者" prop="author" sortable></el-table-column>
                    <el-table-column label="出版社" prop="publisher" sortable></el-table-column>
                    <el-table-column
                            prop="tpublish"
                            label="出版日期">
                        <template slot-scope="{row}">
                            {{row.tpublish | timestampToTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="bookType.type" sortable></el-table-column>
                    <el-table-column label="预览图">
                        <div class="demo-image__preview" slot-scope="{row}">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="`/api/public/showImg/${row.picture}`">
                            </el-image>
                        </div>
                    </el-table-column>
                    <el-table-column
                            align="right"
                            :formatter="formatter">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
              start:1, //初始页
              num:10,//每页几行
              total:0,//总行数
              search: '',//搜索
              arrBook:[],
          }
        },
        methods: {
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let that = this
                $post("/api/adm/book/findByPage/"+that.start+"/"+val)
                    .then(resp=>{
                        that.arrBook = resp.data.data.books
                        that.total = resp.data.data.total
                    })
                    .catch(err => Message.error('加载失败，请检查网络'))
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                let that = this
                $post("/api/adm/book/findByPage/"+val+"/"+that.num)
                    .then(resp=>{
                        that.arrBook = resp.data.data.books
                        that.total = resp.data.data.total
                    })
                    .catch(err => Message.error('加载失败，请检查网络'))
            },


            //修改
            handleEdit(index, row) {
                console.log(row.id)
                this.$router.push({name:'bookUpdate',query:{id:row.id}})
            },
            //删除
            handleDelete(index, row) {
                this.$message({
                    showClose: true,
                    message: '系统升级中',
                    type: 'error'
                });
            },
            formatter(row, column) {
                return row.address;
            }
        },
        mounted() {
            let that = this
            $post("/api/adm/book/findByPage/"+that.start+"/"+that.num)
            .then(resp=>{
                that.arrBook = resp.data.data.books
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
                return Y + M + D;
            }
        },
    }
</script>

<style scoped>

</style>