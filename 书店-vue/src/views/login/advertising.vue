<template>
    <div class="div">
        <h1>广告位招租</h1>
        <h3>加载中即将启动...</h3>
        <h1 v-model="num">{{num}}</h1>
    </div>
</template>

<script>
    import router from "../../router";
    export default {
        name: "advertising",
        data(){
            return{
                num:5
            }
        },
        mounted() {
            var that = this
            new Promise(((resolve, reject) => {
                var test1 = setInterval(function () {
                    that.num = that.num-1
                    console.log(that.num)
                },1000)
                var test2 = setTimeout(function () {
                    console.log("倒计时结束")
                    clearInterval(test1)
                    clearTimeout(test2)
                    router.push('/toLogin')
                },5000)
            }))
        }
    }
</script>

<style scoped>
    .div{
        width: 400px;
        height: 230px;
        background-color: rgba(225,225,225,0.5);
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.5);
        margin:0px auto;
        margin-top: 200px;
        text-align: center;
    }
</style>