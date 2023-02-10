import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// Router
import router from './router'
app.use(router)

// Main CSS
import './assets/css/main.css'

// Mount the app
app.mount('#app')
