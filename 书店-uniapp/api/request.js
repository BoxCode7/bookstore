// export const BASE_URL = 'http://localhost:8090';
export const BASE_URL='http://cgh.fit:8093';

//封装请求
const request = (url, data, config) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: config.method,//请求方式
			params: config.params,
			data:config.data,
			// file:config.file,
			dataType: "json",//把返回的字符串转成json对象
			header: config.header,
			success: res=>{//请求成功
				if(res.statusCode == 401 || res.data.code == 401){
					return uni.showToast({title: "请重新登录"})
				}
				if (res.statusCode != 200 || (res.data.code != undefined && res.data.code !=200)) {
					return uni.showToast({title: "系统错误"})
				}
				resolve(res.data)
				console.log(res.data);
			},
			fail: err => {//请求失败
				uni.showToast({title: "网络连接失败"})
				reject(err)
			}
		})
	})
}
//不带token的get请求
export const get = (url,data)=>{
	return request(url,data,{
		method:"GET",
		params:data,
	})
}

//带token的get请求
export const getT = (url,data) => {
	return request(url,data,{
		method:"GET",
		params:data,
		header:{ 'Content-Type':'application/x-www-form-urlencoded','Authorization': "bearer" + uni.getStorageSync("token")}
	})
}

//带token的get键值对格式请求
export const getX = (url,data) => {
	return request(url,data,{
		method:"GET",
		params:data,
		header:{ 'Content-Type':'application/x-www-form-urlencoded','Authorization': "bearer" + uni.getStorageSync("token")}
	})
}

//post键值对请求
export const postX = (url,data) => {
	console.log('请求',data)
	return request(url,data,{
		method:"POST",
		data:data,
		header:{ 'Content-Type':'application/x-www-form-urlencoded'}
	})
}

//post键值对请求带token
export const postXT = (url,data) => {
	return request(url,data,{
		method:"POST",
		data:data,
		header:{ 'Content-Type':'application/x-www-form-urlencoded','Authorization': "bearer" + uni.getStorageSync("token")}
	})
}

//postJSON对请求
export const postJson = (url,data) => {
	return request(url,data,{
		method:"POST",
		data:data,
		header:{ 'Content-Type':'application/json'}
	})
	console.log(data)
}

//postJSON对请求
export const postJsonT = (url,data) => {
	return request(url,data,{
		method:"POST",
		data:data,
		header:{ 'Content-Type':'application/json','Authorization': "bearer" + uni.getStorageSync("token")}
	})
	console.log(data)
}

//文件上传
// export const uplaod = (url,FormData) => {
// 	return request(url,data,{
// 		method:"POST",
// 		file:FormData,
// 		header:{ 'Content-Type':'multipart/form-data','Authorization': "bearer" + uni.getStorageSync("token")}
// 	})
// 	console.log(data)
// }