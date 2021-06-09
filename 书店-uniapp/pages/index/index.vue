<template>
	<view>
		<!-- 轮播图 -->
		<view class="slideshow">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
				:circular="true">
				<swiper-item v-for="item in slideshow" :key="item.id">
					<view class="swiper-item uni-bg-red">
						<image :src="getImgUrl(item.picture)"></image>
						<view class="memo">{{item.memo}}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="navi">
			<view class="navi_item" v-for="item in navigation" @click="goDetails(item.id)">
				<view>
					<image :src="item.png" mode="widthFix"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot">
			<view class="tit">热销商品</view>
			<view class="hot_list">
				<view class="hot_item" v-for="item in hotList" :key="item.id">
					<image :src="getImgUrl(item.picture)"></image>
					<view class="price">￥{{item.price}}</view>
					<view class="name">{{item.name}}</view>
					<view class="author">作者：{{item.author}}</view>
					<view class="publisher">出版社：{{item.publisher}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {$get,BASE_URL} from '../../api/request.js'
	export default {
		data() {
			return {
				src: "",
				slideshow: [], //轮播图
				hotList: [], //热销商品前五
				navigation: [{
						id: 1,
						name: "Java",
						png: '../../static/font/java.png'
					},
					{
						id: 2,
						name: "JavaScript",
						png: '../../static/font/java-script.png'
					},
					{
						id: 3,
						name: "MySQL",
						png: '../../static/font/MySQL.png'
					},
					{
						id: 4,
						name: "Spring",
						png: '../../static/font/bxl-spring-boot.png'
					}
				]
			}
		},
		methods: {
			getImgUrl(pic) { //图片显示
				return BASE_URL + "/api/public/showImg/" + pic
			},
			goDetails(current) {
				uni.navigateTo({
					url: '../commodity/details/details?current=' + current
				})
			}
		},
		onLoad() { //页面生命周期，监听页面加载
			//轮播图
			this.$get('/api/public/findHot/5/1')
				.then(res => {
					this.slideshow = res.data
				})

			//热销前五
			this.$get('/api/public/book/findSale5')
				.then(res => {
					this.hotList = res.data
				})
		}
	}
</script>

<style lang="scss">
	.slideshow {
		swiper {
			width: 750rpx;
			height: 400rpx;

			image {
				width: 100%;
				height: 350rpx;
			}

			.memo {
				color: #808080;
				margin: auto;
				display: block;
			}
		}
	}

	.navi {
		display: flex;
		margin-top: 20rpx;

		.navi_item {
			width: 25%;
			text-align: center;

			text {
				font-size: 30rpx;
			}

			image {
				width: 70rpx;
				height: 70rpx;
				// background: #007AFF;
				// border-radius: 60rpx;
			}
		}
	}

	.hot {
		background: #dcdbdc;
		overflow: hidden;
		margin-top: 10rpx;

		.tit {
			height: 100rpx;
			line-height: 100rpx;
			color: #D81E06;
			text-align: center;
			letter-spacing: 40rpx; //字符间距
			background: #FFFFFF;
			margin: 10rpx 0;
			font-weight: bold; //字体加粗
			font-size: 40rpx; //字体大小
		}

		.hot_list {
			padding: 0 15rpx; //内边距
			display: flex; //瀑布流布局
			flex-wrap: wrap; //换行
			justify-content: space-between; //内容对齐，两端对齐

			.hot_item {
				background-color: #FFFFFF;
				width: 355rpx;
				margin: 10rpx 0;
				padding: 10rpx; //内边距
				box-sizing: border-box; //盒子边距

				image {
					width: 85%;
					height: 300rpx;
					margin: auto;
					display: block;
				}

				.price {
					color: #D81E06;
					font-size: 36rpx;
					font-weight: bold; //字体加粗
				}

				.name {
					font-size: 32rpx;
					font-weight: bold; //字体加粗
				}

				.author {
					font-size: 26rpx;
					color: #808080;
				}

				.publisher {
					font-size: 26rpx;
					color: #808080;
				}
			}
		}
	}
</style>
