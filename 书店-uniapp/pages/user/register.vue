<template>
	<view class="home">
		<view class="text">欢迎注册</view>
		<view class="div">
			<view class="form">
				<u-form :model="register">
					<u-form-item label="账号" >
						<u-input v-model="register.account" placeholder="请输入账号"/>
					</u-form-item>
					<u-form-item label="昵称">
						<u-input v-model="register.nickname"  placeholder='请输入昵称'/>
					</u-form-item>
					<u-form-item label="号码">
						<u-input v-model="register.phone"  placeholder='请输入手机号码'/>
					</u-form-item>
					<u-form-item label="密码">
						<u-input v-model="register.password" type="password" placeholder="请输入密码" />
					</u-form-item>
					<button size="mini" type="warn" @click="doRegister">注册</button>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
	import {$postJson} from '../../api/request.js'
	export default {
		data() {
			return {
				register:{},
			}
		},
		methods: {
			doRegister() {
				// try{uni.clearStorageSync();}
				// catch(err){console.log('清除失败')}
				this.$postJson('/api/public/addUser',this.register)
				.then(res=>{
					if(res.code == 200){
						uni.clearStorageSync()
						uni.showToast({title:'注册成功',duration:2000})
						uni.switchTab({url:'./user'})
					}
				})
				.catch(err=>{
					uni.showToast({title:'用户名已存在',duration:2000})
				})
			}
		},
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
			// border: #f11053 1rpx solid;
			margin: 60rpx auto;
		}

		.form {
			width: 480rpx;
			// border: #f11053 1rpx solid;
			margin: auto;
			u-form-item{
				u-input{
					width: 200rpx;
				}
				width: 200rpx;
			}
		}
	}
</style>
