import axios from "axios";
import qs from 'qs'
import router from "../router";
import {Message} from "element-ui";
import baseURL from "../../config/baseURL";

//全局配置
let token = ''
axios.defaults.withCredentialsb = false//关闭跨域
axios.defaults.headers.common['Authorization'] = token//请求头带上token
var instance = axios.create({
    baseURL:''
})

//添加一个请求拦截器request oauth2 Token
instance.interceptors.request.use(
    config => {
        localStorage
        let token =sessionStorage.getItem('token');//会话存储
        if (token){
            config.headers['Authorization'] = 'bearer'+token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

//响应拦截
instance.interceptors.response.use(
    response => {
        if (response.status === 200){
            return response;
        }else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.response.status){
            switch (error.response.status) {
                case 400://密码错误
                    Message.error('账号或密码错误');
                    // sessionStorage.removeItem("token");//清除token
                    break;
                case 401://未登录
                    Message.error('您无访问权限');
                    sessionStorage.removeItem("token");//清除token
                    break;
                case 403://token过期
                    Message.error('请重新登录');
                    sessionStorage.removeItem("token");//清除token
                    // router.push('/403')
                    break;
                case 404://页面不存在
                    Message.error('页面不存在');
                    break;
                //其他异常直接抛出
                default:
                    Message.error('系统错误');
                    return Promise.reject(error.response.data)
            }
            return Promise.reject(error.response)
        }
    }
)

//封装axios
//params Json ==> 转成 x-www-form-urlencoded 发送到 SpringBoot, 用普通参数接收
export let $postX = (url,data) => {
    let urldata = qs.stringify(data)
    console.log(urldata)
    return instance.post(url,urldata,{
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
    })
}

// params 参数是 Json , SpringBoot 参数接收 @RequestBody (Json)
export let $post = (url,data) => {
    return instance.post(url,data)
}

export let $getX = (url,data) => {
    let urldata = qs.stringify(data)
    console.log(urldata)
    return instance.get(url,{
        params:urldata,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
    })
}

export let $get = (url,params)=>{
    return instance.get(url,{
        params:params
    })
}

//文件上传，FormData格式，multipart/form-data
export let $uplaod = (url,FormData)=>{
    return instance.post(url,FormData,{'Content-Type':'multipart/form-data'})
}

export let $postJson =(url,data)=>{
    return instance.post(url,data,{'Content-Type':'application/json'})
}