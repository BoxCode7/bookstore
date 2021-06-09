<template>
	<view class="form">
		<u-form :model="user">
			<u-form-item label="昵称:">
				<u-input v-model="user.nickname" placeholder="请输入新昵称" />
			</u-form-item>
			<u-form-item label="号码:">
				<u-input v-model="user.phone" placeholder="请输入新电话号码" />
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
				user: {nickname:'',phone:''}
			}
		},
		methods: {
			submit(){
				this.$postXT('/api/fore/user/updateInfo',this.user)
				.then(res=>{
					uni.setStorageSync('nickname', this.user.nickname)
					uni.setStorageSync('phone', this.user.phone)
					uni.showToast({title:'修改成功',duration:2000})
				})
			}
		},
		onShow() {
			this.user.nickname = uni.getStorageSync('nickname')
			this.user.phone = uni.getStorageSync('phone')
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
