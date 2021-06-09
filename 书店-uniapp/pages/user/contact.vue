<template>
	<view class="contact">
		<image src="../../static/contactImg.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：15728388691(点击拨打)</view>
			<view>学校地址：广东省广州市天河区珠吉路660号</view>
		</view>
		<map longitude="113.439488" latitude="23.1422500" :markers="markers" scale="15"></map>
		<view class="Over">©2021 陈国豪</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markers:[
					{
						longitude:113.439488,
						latitude:23.1422500,
						iconPath:'../../static/map.png',
						width:30,
						height:30
					}
				]
			}
		},
		methods: {
			phone(){
				uni.makePhoneCall({
					phoneNumber:'15728388691'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact{
		image{
			width: 750rpx;
			height: 320rpx;
		}
		.info{
			padding: 10rpx 20rpx;
			view{
				line-height: 60rpx;
				border-bottom: 1rpx solid #EEEEEE;
				font-size: 30rpx;
			}
		}
		map{
			width: 750rpx;
			height: 400rpx;
			margin-top: 10rpx;
		}
		.Over{
			width: 100%;
			height: 80rpx;
			line-height: 680rpx;
			text-align: center;
			font-size: 20rpx;
		}
	}
</style>
