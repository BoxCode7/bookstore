<template>
    <div>
        <el-row>
            <el-col :span="1"><slot></slot></el-col>
            <el-col :span="22">
                <el-table
                        :data="arrType.slice((currentPage-1)*pagesize,currentPage*pagesize) ||
                        arrType.filter(data => !search || data.type.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="编号"
                            prop="id"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="类型"
                            prop="type"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            align="right"
                            :formatter="formatter">
                        <template slot="header" slot-scope="scope">
                            <div style="display: flex">
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="输入关键字搜索"/>
                                <el-button
                                        type="success"
                                        size="mini"
                                        round
                                        @click="add()">添加</el-button>
                            </div>
                        </template>
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
                <!--分页-->
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 40]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="arrType.length">    //这是显示总共有多少数据，
                </el-pagination>
            </el-col>
            <el-col :span="1"></el-col>
        </el-row>
        <update ref="update"></update>
        <add ref="add"></add>
    </div>
</template>

<script>
    import {$get} from "../../../ajax";
    import {Message} from "element-ui";
    import Update from "./update";
    import Add from './add';
    export default {
        name: "list",
        components: {Update,Add},
        data(){
          return{
              search: '',//搜索
              arrType:[],
              currentPage:1, //初始页
              pagesize:10,//每页的数据
          }
        },
        created() {
            this.handleUserList()
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
            handleUserList() {
                let that = this
                $get("/api/adm/type/findAll")
                    .then(resp=>{
                        that.arrType = resp.data.data
                    })
                    .catch(err => Message.error('加载失败，请检查网络'))
            },

            //修改
            handleEdit(index, row) {
                this.$refs.update.dialogForm(row)
            },
            //删除
            handleDelete(index, row) {
                this.$message({
                    showClose: true,
                    message: '系统升级中',
                    type: 'error'
                });
            },
            //添加
            add(){
                this.$refs.add.addDialogForm()
            },
            formatter(row, column) {
                console.log(formatter)
                console.log(row)
                console.log(column)
                return row.address;
            }
        },
        mounted() {
            let that = this
            $get("/api/adm/type/findAll")
            .then(resp=>{
                that.arrType = resp.data.data
            })
            .catch(err => Message.error('加载失败，请检查网络'))
        }
    }
</script>

<style scoped>

</style>