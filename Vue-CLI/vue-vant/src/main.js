import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
// 引入vant对应组件 
import GYJButton from './components/Button.vue'
const app = createApp(App)
app.component(GYJButton.name,GYJButton)
app.mount('#app')
