<template>
	<view class="home">
		<image class="img" src="../../static/UserImg.jpg"></image>
		<view>
			<view class="div" v-if="user.token == false">
				<!-- 头像 -->
				<view class="avatar">
					<image class="cu-avatar round" src="../../static/user.png"></image>
					<text @click="goLogin">请登录</text>
				</view>
			</view>
			<view class="div" v-if="user.token != false">
				<!-- 头像 -->
				<view class="avatar">
					<image class="cu-avatar round" :src="getImgUrl(user.img)" @click="goDatum"></image>
					<text @click="goDatum">{{user.nickname}}</text>
				</view>
			</view>
		</view>
		<!-- 主体页面 -->
		<view class="by">
			<uni-list>
				<uni-list-item link to="./contact" title="联系我们"></uni-list-item>
				<!-- <uni-list-item link to="../cart/order/order" title="我的订单"></uni-list-item> -->
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		BASE_URL
	} from '../../api/request.js'
	export default {
		data() {
			return {
				user: {
					username: '',
					nickname: '',
					img: '',
					token: false
				}
			}
		},
		methods: {
			getImgUrl(pic) { //图片显示
				return BASE_URL + "/api/public/showImg/" + pic
			},
			goLogin() {
				uni.navigateTo({
					url: './login'
				})
			},
			goDatum() {
				uni.navigateTo({
					url: './datum/datum'
				})
			},
			getUser() {
				this.user.img = uni.getStorageSync('img')
				this.user.username = uni.getStorageSync('username')
				this.user.nickname = uni.getStorageSync('nickname')
				this.user.token = uni.getStorageSync('token')
			}
		},
		created() {
			this.getUser()
		},
		onShow() {
			console.log('我又回来啦')
			this.getUser()
		},
	}
</script>

<style lang="scss">
	.home {
		.img {
			// position: absolute;
			width: 750rpx;
			height: 420rpx;
			filter: blur(.1px); //模糊效果
			// opacity: .5;//透明度
		}

		.div {
			width: 750rpx;
			// border: #f11053 1rpx solid;
			position: fixed;
			top: 355rpx;

			.avatar {
				image {
					width: 150rpx;
					height: 150rpx;
					margin-left: 40rpx;
				}

				text {
					color: #d81e06;
					margin-left: 15rpx;
					font-size: 35rpx;
					position: fixed;
					top: 440rpx;
					font-weight: bold; //字体加粗
				}
			}
		}

		.by {
			margin-top: 100rpx;
		}
	}
</style>
