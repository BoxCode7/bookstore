<template>
    <div>
        <h1>添加热销商品</h1>
        <div>
            <el-form ref="form" :model="addHot" label-width="80px">
                <el-form-item label="商品名称">
                    <el-input
                            type="textarea"
                            maxlength="200"
                            :rows="2"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容,10~200个字符之间"
                            show-word-limit
                            v-model="addHot.memo">
                    </el-input>
                </el-form-item>
                <el-form-item label="热度">
                    <el-input
                            v-model="addHot.hot"
                            placeholder="只能输入整数"
                            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
                </el-form-item>
                <el-form-item label="类型" >
                    <el-select placeholder="请选择活动类型" v-model="addHot.type">
                        <el-option value="shanghai" v-for="item in types" :value="item.id" :label="item.type">{{item.type}}</el-option>
                    </el-select>
                </el-form-item>
                <!--图片-->
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            :multiple="false"
                            :show-file-list="true"
                            :auto-upload="false"
                            :file-list="fileList"
                            :on-change="handleChange"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            accept="image/jpg,image/jpeg,image/png"
                            list-type="picture"
                            drag
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add()">添 加</el-button>
                    <el-button type="primary" @click="cancel()">取 消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {$uplaod} from "../../../ajax";

    export default {
        name: "add",
        data(){
            return{
                addHot:{memo:''},
                fileList:[],
                types:[
                    {id:1,type: '轮播图'},
                    {id:9,type: '测试'},
                ],
            }
        },
        methods: {
            handleChange: function (file, fileList) {
                this.fileList = fileList;
            },
            add(){
                let param = new FormData() // 创建form对象
                param.append('memo',this.addHot.memo)
                param.append('hot',this.addHot.hot)
                param.append('type',this.addHot.type)
                param.append('pic',this.fileList[0].raw)
                $uplaod('/api/adm/hot/addHot',param)
                .then(resp=>{
                    this.$message({message: resp.data.msg, type: 'success'});
                    this.$router.push('/backgroundHome/slideshowList');
                })
                .catch(err=>{
                    this.$message.error('添加失败，请重试')
                })
            },
            cancel(){
                this.$router.push('/backgroundHome/slideshowList')
            }
        },
    }
</script>

<style scoped>

</style>