import { createApp } from 'vue'
import router from "./router"
import App from './App.vue'
import '@/assets/css/index.css'
// import.meta.env 环境变量对象
const app = createApp(App)
app.use(router)
app.mount('#app')