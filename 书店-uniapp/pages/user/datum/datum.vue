<template>
	<view>
		<uni-list>
			<uni-list-item link to="./avatar" title="修改头像"></uni-list-item>
			<uni-list-item link to="./name" title="修改信息"></uni-list-item>
			<uni-list-item link to="./password" title="修改密码"></uni-list-item>
			<uni-list-item link to="../login" title="切换账号"></uni-list-item>
		</uni-list>
		<button @click="Exit" type="warn">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//退出
			Exit(){
				uni.clearStorageSync()
				uni.switchTab({
					url:'../user'
				})
			}
		}
	}
</script>

<style>

</style>
