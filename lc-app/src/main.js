import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局样式

import './assets/css/base.css'
import './assets/css/vant.css'
import './assets/css/animate.css'
// 引入vant函数
import vant from './vant';
// 引入axious
import Axios from 'axios'
// import VueAxios from 'vue-axios'
// 引入序列化方法
import Qs from 'qs'
// 引入全局组件
import BaseGoods from './components/base/BaseGoods.vue'
import baseNavBar from './components/base/BaseBanner.vue'


// 引入全局API方法
import API from '../api/index.js';
const app = createApp(App)
vant(app)
// 把axios绑定在app实例上
// app.use(VueAxios,Axios)
app.config.globalProperties.axios = Axios;
app.config.globalProperties.qs = Qs;
app.config.globalProperties.API = API;
// 注册全局组件
app.component(baseNavBar.name,baseNavBar);
app.component(BaseGoods.name,BaseGoods);
app.use(router)
app.mount('#app')
