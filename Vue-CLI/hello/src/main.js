import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import Router from './router/index.js'
// import {createRouter,createWebHistory} from 'vue-router'
// 导入组件
// import Home from './components/Home.vue'
// import News from './components/News.vue'


// 引入组件
import globalFoo from './components/globalFoo.vue'
console.log(globalFoo);
//创建路由实例
// const router = createRouter({
//     history : createWebHistory(),
//     routes : [
//         {
//             path: '/',
//             component : Home
//         },
//         {
//             path : '/news',
//             component : News
//         }
//     ]
// });


//挂载应用实例上面！！！
const app = createApp(App)
// 注册全局组件
app.component(globalFoo.name,globalFoo)
app.use(Router);
app.mount('#app');


