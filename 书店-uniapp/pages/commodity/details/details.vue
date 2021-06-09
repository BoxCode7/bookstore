<template>
	<view style="background-color: #DCDBDC;">
		<view class="type">
			<view v-if="typeid==1">Java</view>
			<view v-if="typeid==2">JavaScript</view>
			<view v-if="typeid==3">MySql</view>
			<view v-if="typeid==4">SSM</view>
		</view>
		<view>
			<product-list :productList="productList"></product-list>
		</view>
		<view v-if="flag" class="isOver">······我是有底线的······</view>
	</view>
</template>

<script>
	import {$get} from '../../../api/request.js'
	import productList from '../../../components/productList/productList.vue'
	export default {
		components:{"product-list":productList},
		data() {
			return {
				flag:false,
				start:0,
				num:10,
				typeid:'',
				productList:[]
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.typeid = options.current
			this.$get(`/api/public/findBookByPage/${this.start}/${this.num}/${options.current}`)
			.then(res=>{
				this.productList = res.data.books
			})
		},
		onReachBottom() {//监听触底
			if(this.productList.length<(this.start+1)*10) return this.flag=true
			let start = this.start+1
			this.start = start
		    this.$get(`/api/public/findBookByPage/${start}/${this.num}/${this.typeid}`)
		    .then(res=>{
		    	this.productList = [...this.productList,...res.data.books]
		    })
		},
		onPullDownRefresh() {
			this.start = 0
			this.productList = []
			this.flag = false
			this.$get(`/api/public/findBookByPage/${this.start}/${this.num}/${this.typeid}`)
			.then(res=>{
				this.productList = res.data.books
				uni.stopPullDownRefresh()//刷新完成后关闭
			})
		}
		
	}
</script>

<style lang="scss">
	.type{
		view{
			font-size: 50rpx;
			background-color: #f7f6f7;
			line-height: 90rpx;
			font-weight: bold;//字体加粗
			text-align: center;//居中
		}
	}
	.isOver{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 20rpx;
	}
</style>
