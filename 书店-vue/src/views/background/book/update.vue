<template>
    <div>
        <el-form :model="newBook" label-width="80px">
            <h3>修改商品</h3>
            <el-form-item label="商品名称">
                <el-input v-model="newBook.name"></el-input>
            </el-form-item>
            <el-form-item label="商品序号">
                <el-input v-model="newBook.sn"></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="newBook.price"></el-input>
            </el-form-item>
            <el-form-item label="出版社">
                <el-input v-model="newBook.publisher"></el-input>
            </el-form-item>
            <el-form-item label="出版时间">
                <el-date-picker
                        v-model="newBook.tpublish"
                        align="right"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        type="datetime"
                        value-format="timestamp"
                        format="yyyy年MM月dd日">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="newBook.author"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" >
                <el-select placeholder="请选择活动商品类型" v-model="newBook.bookType.id">
                    <el-option value="shanghai" v-for="item in arrType" :value="item.id" :label="item.type">{{item.type}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <div class="demo-image__preview">
                    <el-image
                            :src="`/api/public/showImg/${newBook.picture}`">
                    </el-image>
                </div>
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
                <el-button type="primary" @click="update()">提 交</el-button>
                <el-button type="primary" @click="cancel()">取 消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {$get, $uplaod} from "../../../ajax";
    import {Message} from "element-ui";
    export default {
        name: "update",
        inject:['reload'],//注入一个刷新的方法
        data(){
            return{
                formLabelWidth: '120px',
                newBook:{id:'',name:'',sn:'',price:'',publisher:'',tpublish:'',author:'', bookType:{id:'',type:''}},
                fileList:[],
                arrType:[{id:'',type:''}],
                pickerOptions: {
                    disabledDate(time) {//禁用日期设置
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        methods:{
            handleChange: function(file, fileList) {
                this.fileList = fileList;
            },
            update(){
                let param = new FormData() // 创建form对象
                console.log('类型')
                param.append('id',this.newBook.id)
                console.log(this.newBook.id)
                param.append('name',this.newBook.name)
                console.log(this.newBook.name)
                param.append('sn',this.newBook.sn)
                console.log(this.newBook.sn)
                param.append('price',this.newBook.price)
                console.log(this.newBook.price)
                param.append('author',this.newBook.author)
                console.log(this.newBook.author)
                param.append('publisher',this.newBook.publisher)
                console.log(this.newBook.publisher)
                param.append('bookType.id',this.newBook.bookType.id)
                console.log(this.newBook.bookType.id)
                param.append('tpublish',this.newBook.tpublish)
                console.log(this.newBook.tpublish)
                console.log(this.fileList[0])
                if(this.fileList.length>0 && this.fileList[0].raw!=null){
                    param.append('pic',this.fileList[0].raw)
                }
                console.log(param)
                $uplaod('/api/adm/book/addBook/',param)
                    .then(resp=>{
                        Message({message: '修改成功', type: 'success'});
                        this.$router.push('/backgroundHome/bookList')
                    })
                    .catch(err=>{
                        this.$message.error('添加失败，请重试')
                    })
            },
            cancel(){
                this.$router.push('/backgroundHome/bookList')
            }
        },mounted() {
            let that = this
            let id = this.$route.query.id
            $get('/api/adm/book/findById/'+id)
            .then(resp =>{
                that.newBook = resp.data.data
            })
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