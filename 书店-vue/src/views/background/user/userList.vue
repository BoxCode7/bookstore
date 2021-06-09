<template>
    <div>
        <el-row>
            <el-col :span="1"><slot></slot></el-col>
            <el-col :span="22">
                <el-table :data="arrUser">
                    <el-table-column
                            label="编号"
                            prop="id"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="用户名"
                            prop="nickname"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="账号"
                            prop="account"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            prop="closed"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            align="right"
                            :formatter="formatter">
                        <template slot-scope="scope">
                            <el-button
                                       size="mini"
                                       type="danger"
                                       @click="freeze(scope.$index, scope.row)">冻结</el-button>
                            <el-button
                                    size="mini"
                                    @click="thaw(scope.$index, scope.row)">解冻</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="paging.start"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="paging.num"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
            <el-col :span="1"></el-col>
        </el-row>
    </div>
</template>

<script>
    import {$get,$post} from "../../../ajax";
    import {Message} from "element-ui";
    export default {
        name: "list",
        inject:['reload'],//注入一个刷新的方法
        components: {},
        data(){
          return{
              paging:{
                  start:1, //初始页
                  num:10,//每页几行
              },
              total:0,//总行数
              search: '',//搜索
              arrUser:[],
          }
        },
        methods: {
            //分页
            handleSizeChange(val) {//每页
                let that = this
                $post("/api/adm/user/findAll?start="+that.paging.start+'&num='+val)
                    .then(resp=>{
                        that.arrUser = resp.data.data.users
                        that.total = resp.data.data.total
                    })
                    .catch(err => Message.error('加载失败，请检查网络'))
            },
            handleCurrentChange(val) {//当前页
                let that = this
                $post("/api/adm/book/findByPage/"+val+"/"+that.paging.num)
                    .then(resp=>{
                        that.arrUser = resp.data.data.users
                        that.total = resp.data.data.total
                    })
                    .catch(err => Message.error('加载失败，请检查网络'))
            },


            //修改
            // handleEdit(index, row) {
            //     console.log(row.id)
            //     // this.$router.push({name:'bookUpdate',query:{id:row.id}})
            // },
            //冻结
            freeze(index, row) {
                $get('/api/adm/user/close/'+row.id)
                .then(resp=>{
                    this.$message({message: '修改成功',type: 'success'});
                    this.reload()//刷新
                })
                .catch(err=>{
                    Message.error('修改失败')
                })
            },
            //解冻
            thaw(index, row) {
                $get('/api/adm/user/resetPwd/'+row.id)
                    .then(resp=>{
                        this.$message({message: '修改成功',type: 'success'});
                        this.reload()//刷新
                    })
                    .catch(err=>{
                        Message.error('修改失败')
                    })
            },
            formatter(row, column) {
                return row.address;
            }
        },
        mounted() {
            let that = this
            $get("/api/adm/user/findAll?start="+that.paging.start+'&num='+that.paging.num)
            .then(resp=>{
                that.arrUser = resp.data.data.users
                that.total = resp.data.data.total
            })
            .catch(err => Message.error('加载失败，请检查网络'))

        },
    }
</script>

<style scoped>

</style>