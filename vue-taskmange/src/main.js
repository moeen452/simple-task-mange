import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. استيراد Pinia
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()) // 2. تفعيل Pinia هنا
app.mount('#app')