<template>
    <div>
        <div>
            <el-button type="primary" plain @click="add()">添加</el-button>
            <el-button type="primary" plain @click="slideshow(n=1)">轮播图</el-button>
            <el-button type="primary" plain @click="slideshow(n=9)">测试</el-button>
        </div>
        <div>
            <span v-if="search == 1"><h1>轮播图</h1></span>
            <span v-if="search == 2"><h1>待添加</h1></span>
        </div>
        <div>
            <el-table
                    :data="hotList.filter(data => !search || data.type.toString().includes(search.toString()))"
                    style="width: 100%">
                <el-table-column label="编号" prop="id" sortable></el-table-column>
                <el-table-column label="描述" prop="memo" sortable></el-table-column>
                <el-table-column label="预览图">
                    <div class="demo-image__preview" slot-scope="{row}">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="`/api/public/showImg/${row.picture}`">
                        </el-image>
                    </div>
                </el-table-column>
                <el-table-column label="热度" prop="hot" sortable></el-table-column>
                <el-table-column label="类型" prop="type" sortable></el-table-column>
                <el-table-column
                        align="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="update(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {$get} from "../../../ajax";

    export default {
        name: "slideshowList",
        data(){
            return{
                search:'1',//搜索
                hotList:[],
            }
        },
        methods:{
            add(){
                this.$router.push('/backgroundHome/hotAdd')
            },
            update(index, row) {
                $get('/api/adm/hot/delete/'+row.id)
                .then(resp=>{
                    this.$message({message: resp.data.msg, type: 'success'});
                    location.reload()
                })
                .catch(err=>{this.$message.error('操作失败请重试')})
            },
            slideshow(n){
                this.search = n
            },
        },
        mounted() {
            $get('/api/adm/hot/findAll')
            .then(resp=>{
                this.hotList = resp.data.data
            })
            .catch(err=>{
                this.$message.error('加载失败，请检查网络')
            })
        }
    }
</script>

<style scoped>

</style>