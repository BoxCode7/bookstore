<template>
	<view>
		<!-- <view>
			<u-upload ref="uUpload"  :auto-upload="false" :max-count="1" v-model="img"></u-upload>
			<u-button @click="submit">提交</u-button>
		</view> -->
		<view>
			<view><image :src="getImg"></image></view>
			<button type="primary" :loading="false" :disabled="false" @click="submit">更新头像</button>
		</view>
	</view>
</template>

<script>
	import {BASE_URL} from '../../../api/request.js'
	export default {
		data() {
			return {
				img:''
			}
		},
		created(){
			this.img = uni.getStorageSync("img")
		},
		computed:{
			getImg(){
				return BASE_URL + "/api/public/showImg/" + this.img
			}
		},
		methods: {
			submit(){
				uni.chooseImage({
					count:1,//图片数量
					sizeType:['original','compressed'],//原图还是压缩图
					sourceType:['album'],//从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;//图片路径
						console.log(res.tempFilePaths[0]);
						const uploadTask = uni.uploadFile({
							url:`${BASE_URL}/api/fore/user/updateImg`,
							header:{'Authorization': "bearer" + uni.getStorageSync("token")},
							filePath:tempFilePaths[0],//选择上传的图片
							name:'img',//对应后台的key
							formData:{},//其他文本信息，键值对
							success:res =>{
								console.log(res)
								let resObj = JSON.parse(res.data)//转js对象
								console.log(resObj)
								this.img = resObj.data
								console.log(resObj.data)
								uni.setStorageSync('img', resObj.data)
								uni.showToast({
									title:'更新成功',
									duration:2000
								})
							}
						})
					}
				})
			}
			
			// submit(){
			// 	let param = new FormData() // 创建form对象
			// 	param.append("img",this.img)
			// 	uni.uploadFile({
			// 		url:`${BASE_URL}/api/fore/user/updateImg`,
			// 		file:FormData,
			// 		header:{'Authorization': "bearer" + uni.getStorageSync("token")},
			// 		success: res => {
			// 			let data = JSON.parse(res.data)
			// 			console.log(data.data)
			// 		}
			// 	})
			// }
			
			// submit() {
			// 	let param = new FormData() // 创建form对象
			// 	param.append("img",this.img)
			// 	console.log(param)
			// 	$uplaod('/api/fore/user/updateImg',FormData)
			// 	.then(res=>{
			// 		uni.setStorageSync('img', res.img)
			// 		uni.redirectTo({
			// 			url:'./datum'
			// 		})
			// 	})
			// }
		}
	}
</script>

<style>

</style>
