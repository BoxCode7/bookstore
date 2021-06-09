import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import uView from "uview-ui";
import {get,getX,getT,BASE_URL,postX,postXT,postJson,postJsonT} from './api/request.js'

Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

Vue.prototype.$postX = postX;
Vue.prototype.$get = get;
Vue.prototype.$getX = getX;
Vue.prototype.$getT = getT;
Vue.prototype.BASE_URL = BASE_URL;
Vue.prototype.$postJson = postJson;
Vue.prototype.$postXT = postXT;
Vue.prototype.$postJsonT = postJsonT;

App.mpType = 'app';
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
