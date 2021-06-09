<template>
    <div>
        <el-row>
            <el-col :span="1"><slot></slot></el-col>
            <el-col :span="22">
                <el-table
                        :data="admList.filter(data => !search || data.role.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
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
                                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="1"></el-col>
        </el-row>
    </div>
</template>

<script>
    import {$get} from "../../../ajax";
    import {Message} from "element-ui";
    export default {
        name: "list",
        components: {},
        data(){
          return{
              search: 'G',//搜索
              admList:[],
          }
        },
        methods: {
            //修改
            handleEdit(index, row) {
                // this.$refs.update.dialogForm(row)
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
                console.log(formatter)
                console.log(row)
                console.log(column)
                return row.address;
            }
        },
        mounted() {
            let that = this

            $get("/api/adm/user/findAll")
            .then(resp=>{
                that.admList = resp.data.data.users
            })
            .catch(err => Message.error('加载失败，请检查网络'))
        }
    }
</script>

<style scoped>

</style>