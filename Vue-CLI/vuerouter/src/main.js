import { createApp } from 'vue'
import App from './App.vue'
// 默认会找到文件夹下的index.js
import router from './router'


createApp(App).use(router).mount('#app')
