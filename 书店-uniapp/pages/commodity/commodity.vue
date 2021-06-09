<template>
	<view class="home">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="search">
				<u-search v-model="search" @custom="seek(search)" @search="seek(search)" :clearabled="true"></u-search>
			</view>
			<view class="ico">
				<image src="../../static/font/details.png" @click="show=true"></image>
			</view>
		</view>
		<!-- 导航 -->
		<view>
			<u-popup v-model="show" mode="bottom" border-radius="20" :closeable="true">
				<view class="show">
					<view class="sort">
						<view>
							<text>排序方式：</text>
						</view>
						<button size="mini" :class="{button:showB==1}" @click="button(1)">销量最高</button>
						<button size="mini" :class="{button:showB==2}" @click="button(2)">点赞最高</button>
						<button size="mini" :class="{button:showB==3}" @click="button(3)">加入购物车最高</button>
					</view>
					<view class="type">
						<view>
							<text>分类：</text>
						</view>
						<view class="type_item">
							<button v-for="item in typeArr" :ken="item.id" size="mini" @click="BookType(item.id)"
								:class="{button:typeid==item.id}">{{item.type}}</button>
						</view>
					</view>
					<view class="operation">
						<button size="mini" type="warn" @click="eliminate">清除</button>
						<button size="mini" type="warn" @click="affirm">完成</button>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 商品列表 -->
		<view class="product">
			<product-list :productList="bookList"></product-list>
		</view>
		<view v-if="flag" class="isOver">······我是有底线的······</view>
	</view>
</template>

<script>
	import {
		$get,
		$postX
	} from '../../api/request.js'
	import productList from '../../components/productList/productList.vue'
	export default {
		components: {
			"product-list": productList
		},
		data() {
			return {
				flag: false,
				search: '',
				show: false,
				showB: 0,
				typeArr: [],
				typeid: 0,
				start: 0, //起始页
				num: 10, //每页数量
				total: 0, //总数
				bookList: []
			}
		},
		methods: {
			//搜索商品
			seek(key) {
				console.log('搜索', key)
				this.$postX(`/api/public/book/findIf/${this.start}/${this.num}`, key)
					.then(res => {
						this.showB = 0
						this.typeid = 0
						this.total = 0
						this.bookList = []
						console.log(res)
					})
			},
			//排序方法
			button(n) {
				this.showB = n
				console.log(this.showB)
			},
			//类型选择
			BookType(id) {
				this.typeid = id
			},
			//确认条件
			affirm() {
				console.log('条件', this.showB)
				this.total = 0
				this.bookList = []
				if (this.showB == 1) {
					console.log('条件1', this.showB)
					this.$get(`/api/public/findBookByPageSale/${this.start}/${this.num}/${this.typeid}`)
						.then(res => {
							this.total = res.data.total
							this.bookList = res.data.books
						})
				}
				if (this.showB == 2) {
					this.$get(`/api/public/findBookByPageRate/${this.start}/${this.num}/${this.typeid}`)
						.then(res => {
							this.total = res.data.total
							this.bookList = res.data.books
						})
				}
				if (this.showB == 3) {
					this.$get(`/api/public/findBookByPageFav/${this.start}/${this.num}/${this.typeid}`)
						.then(res => {
							this.total = res.data.total
							this.bookList = res.data.books
						})
				}
			},
			//清除条件
			eliminate() {
				this.showB = 0
				this.typeid = 0
				this.total = 0
				this.bookList = []
				this.getcommodity()
			},
			//无条件获取数据
			getcommodity() {
				this.$get(`/api/public/findBookByPage/${this.start}/${this.num}/${this.typeid}`)
					.then(res => {
						this.total = res.data.total
						this.bookList = res.data.books
					})
			}
		},
		mounted() {
			this.$get('/api/public/type/findAll')
				.then(res => {
					console.log(res.data)
					this.typeArr = res.data
				})

			this.getcommodity()
		},
		//刷新
		onPullDownRefresh() {
			this.total = 0
			this.bookList = []
			this.getcommodity(uni.stopPullDownRefresh()) //刷新完成后关闭
		},
		//触底
		onReachBottom() { //监听触底
			if (this.bookList.length < (this.start + 1) * 10) return this.flag = true
			let start = this.start + 1
			this.start = start
			this.$get(`/api/public/findBookByPage/${start}/${this.num}/${this.typeid}`)
				.then(res => {
					this.bookList = [...this.bookList, ...res.data.books]
				})
		}
	}
</script>

<style lang="scss">
	.home {
		.header {
			width: 100%;
			height: 100rpx;
			background-color: #f52443;
			line-height: 100rpx;
			display: flex;
			margin-top: -10rpx;
			position: fixed;
			z-index: 1000;

			.search {
				margin-left: 15rpx;
				width: 70%;
			}

			.ico {
				width: 30%;

				image {
					width: 80rpx;
					height: 80rpx;
					top: 10rpx;
					float: right;
					margin-right: 10rpx;
				}
			}
		}

		.show {
			.sort {
				width: 92%;
				margin-top: 80rpx;
				line-height: 80rpx;
				margin-left: 30rpx;
		
				text {
					font-size: 1.2em;
					font-weight: bold;
				}
		
				button {
					margin-right: 20rpx;
				}
		
				.button {
					background-color: #f52443;
				}
			}
		
			.type {
				width: 92%;
				margin-left: 30rpx;
				margin-right: 30rpx;
		
				text {
					font-size: 1.2em;
					font-weight: bold;
				}
		
				.type_item {
					// border: #f11053 1rpx solid;
					margin-right: 10rpx;
		
					button {
						margin-right: 10rpx;
						margin-top: 5rpx;
					}
		
					.button {
						background-color: #f52443;
					}
				}
			}
		
			.operation {
				width: 92%;
				margin-left: 30rpx;
				margin-right: 30rpx;
				margin-top: 20rpx;
		
				button {
					margin-right: 40rpx;
					margin-left: 50rpx;
					width: 250rpx;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 1.1em;
					font-weight: bold;
					margin-bottom: 20rpx;
				}
			}
		}

		.product{
			product-list{
				top: 100rpx;
				margin-top: 10rpx;
			}
		}
		.isOver {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 20rpx;
		}
	}
</style>
