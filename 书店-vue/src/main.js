import Vue from 'vue'
import App from './App.vue'
import baseURL from "../config/baseURL";
import axios from "axios";
import router from "./router";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueWechatTitle from 'vue-wechat-title'
//浏览器导航栏名称

Vue.prototype.imgurl = 'http://cgh.fit:8093';
Vue.prototype.baseUrl = baseURL
Vue.prototype.$axios = axios
Vue.use(Element)
Vue.use(VueWechatTitle)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')