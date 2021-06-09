<template>
	<view>
		<!-- 推荐商品 -->
		<view class="hot">
			<view class="hot_list">
				<view class="hot_item" v-for="item in productList" :key="item.id">
					<image :src="getImgUrl(item.picture)"></image>
					<view class="price">￥{{item.price}}</view>
					<view class="name">{{item.name}}</view>
					<view class="author">作者：{{item.author}}</view>
					<view class="publisher">出版社：{{item.publisher}}</view>
					<view class="handle">
						<image @click="good(item.id)" src="../../static/font/good2.png"></image>
						<image @click="cart(item.id)" src="../../static/icon/cart_red.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {BASE_URL,$getT} from '../../api/request.js'
	export default {
		name: 'productList',
		props: ['productList'],
		data(){
			return{}
		},
		methods: {
			getImgUrl(pic) { //图片显示
				return BASE_URL + "/api/public/showImg/" + pic
			},
			good(bookid){
				console.log(bookid)
				this.$getT(`/api/public/book/addRate/${bookid}`)
				.then(res=>{
					uni.showToast({title:res.msg,duration:2000})
				})
			},
			cart(bookid){
				this.$getT(`/api/public/addCart/${bookid}`)
				.then(res=>{
					if(res.code == 200){
						uni.showToast({title:res.msg,duration:2000})
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.hot {
		background: #dcdbdc;
		overflow: hidden;
		margin-top: 10rpx;

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
				.handle{
					display: flex;
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
		}
	}
</style>
