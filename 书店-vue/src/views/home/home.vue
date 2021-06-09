<template>
    <div>
        <div>
            <el-container>
                <!--导航栏-->
                <el-header>
                    <navigation-p></navigation-p>
                </el-header>
                <!--主体-->
                <el-main>
                    <div>
                        <el-row :gutter="20">
                            <!--分类导航栏-->
                            <el-col :span="6">
                                <div style="width: 100%">
                                    <classify></classify>
                                </div>
                            </el-col>
                            <!--轮播图-->
                            <el-col :span="18">
                                <!--轮播图-->
                                <div>
                                    <el-carousel indicator-position="outside">
                                        <el-carousel-item v-for="item in 4" :key="item">
                                            <h3>{{ item }}</h3>
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>
                                <!--热门推荐-->
                                <div></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-main>
            </el-container>
        </div>
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    import NavigationP from "./navigation-p";
    import Classify from "./classify";
    export default {
        name: "home",
        components: {Classify, NavigationP},
        provide(){//注册个方法,进行刷新
            return{
                reload:this.reload
            }
        },
        data(){
            return{
                isRouterAlive:true,//路由刷新
            }
        },
        methods: {
            //路由刷新的方法
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function() {
                    this.isRouterAlive = true
                })
            }
        },
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>