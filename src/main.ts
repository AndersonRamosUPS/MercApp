import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'   // IMPORTANTE

const app = createApp(App)

app.use(router)                 // ACTIVAMOS EL ROUTER

app.mount('#app')
