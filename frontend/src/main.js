import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import axios from 'axios'

// Настройка базового URL для axios
axios.defaults.baseURL = 'http://localhost:8000'

// Добавляем токен к запросам, если он есть
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app') 