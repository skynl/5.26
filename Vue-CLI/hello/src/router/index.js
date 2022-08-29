import {createRouter,createWebHistory} from 'vue-router'


import Home from '../components/Home.vue'
import News from '../components/News.vue'


const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path: '/',
            component : Home
        },
        {
            path : '/news',
            component : News
        }
    ]
})
// 导出路由对象
export default router