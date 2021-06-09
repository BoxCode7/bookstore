<template>
	<view class="form">
		<u-form>
			<u-form-item label="旧密码:">
				<u-input v-model="password" type="password" placeholder="请输入旧密码" />
			</u-form-item>
			<u-form-item label="新密码">
				<u-input v-model="pwd.pwd" type="password" placeholder="请输入新密码" />
			</u-form-item>
			<button size="mini" type="warn" @click="submit">修改</button>
		</u-form>
	</view>
</template>

<script>
	import {$postXT} from '../../../api/request.js'
	export default {
		data() {
			return {
				pass:'',
				password:'',
				pwd:{pwd:''}
			}
		},
		methods: {
			submit(){
				if(this.password == this.pass){
					this.$postXT('/api/fore/user/updatePwd',this.pwd)
					.then(res=>{
						uni.setStorageSync('password', this.pwd.pwd)
						uni.showToast({title:'修改成功',duration:2000})
						uni.redirectTo({
							url:'./datum'
						})
					})
				}else{
					uni.showToast({title:'旧密码错误',duration:2000})
				}
				
			}
		},
		onShow() {
			this.pass = uni.getStorageSync('password')
		}
	}
</script>

<style lang="scss">
	.form {
		position: fixed;
		margin-top: 150rpx;
		width: 650rpx;
		// border: #f11053 1rpx solid;
		margin-left: 50rpx;
		button{
			margin-left: 275rpx;
		}
	}
</style>
