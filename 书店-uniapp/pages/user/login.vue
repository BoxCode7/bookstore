<template>
	<view class="home">
		<view class="text">欢迎登录</view>
		<view class="div">
			<view class="form">
				<u-form :model="login">
					<u-form-item label="账号">
						<u-input v-model="login.username" placeholder="请输入账号" />
					</u-form-item>
					<u-form-item label="密码">
						<u-input v-model="login.password" type="password" placeholder="请输入密码" />
					</u-form-item>
					<button size="mini" type="warn" @click="doLogin">登录</button>
					<view class="text" @click="goRegister">还没账号？点击注册</view>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
	import {$postXT,$getX} from '../../api/request.js'
	export default {
		data() {
			return {
				login: {
					username: '',
					password: '',
					grant_type: 'password',
					client_id: 'sobook4',
					client_secret: '444444',
				}
			}
		},
		methods: {
			doLogin() {
				this.$postXT('/oauth/token', this.login)
					.then(res => {
						uni.setStorageSync('token', res.access_token)
						this.$getX('/api/info/getUser')
							.then(res => {
								if(res.role =='P'){
									uni.setStorageSync('password', this.login.password)
									uni.setStorageSync('img', res.img)
									uni.setStorageSync('phone', res.phone)
									uni.setStorageSync('nickname', res.nickname)
									uni.setStorageSync('username', res.username)
									uni.setStorageSync('role', res.role)
									uni.switchTab({url:'./user'})
								}
								if(res.role == 'G'){
									uni.showToast({title:'您无权限登录',duration:2000})
								}
							})
							.catch(err=>{
								uni.showToast({title:'账号或密码错误',duration:2000})
							})
					})
			},
			goRegister(){
				uni.navigateTo({url:"./register"})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		text-align: center; //居中

		.text {
			font-size: 60rpx;
			font-weight: bold; //字体加粗
			letter-spacing: 20rpx; //字符间距
			margin-top: 80rpx;
		}

		.div {
			width: 600rpx;
			height: 500rpx;
			// border: #f11053 1rpx solid;
			margin: 60rpx auto;
			// filter: blur(.1px); //模糊效果
			// opacity: .5; //透明度
			// background:#edf1f7;
			// border-radius: 50rpx;
		}

		.form {
			width: 500rpx;
			// border: #f11053 1rpx solid;
			margin: auto;
			.text{
				font-size: 20rpx;
				color: #999999;
				margin-top: 20rpx;
				letter-spacing: 0rpx; //字符间距
			}
		}
	}
</style>
