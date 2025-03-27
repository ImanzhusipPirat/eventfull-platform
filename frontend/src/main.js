import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import axios from 'axios'

// Отладочная информация
console.log('[Main] Environment:', process.env.NODE_ENV)

const API_URL = 'http://localhost:8000'
console.log('[Main] API URL:', API_URL)

// Настройка базового URL для axios
axios.defaults.baseURL = API_URL

// Добавляем токен к запросам, если он есть
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)

// Глобальная обработка ошибок
app.config.errorHandler = (err, vm, info) => {
  console.error('[Main] Global error:', err)
  console.error('[Main] Error info:', info)
}

app.use(router)
app.use(store)

app.mount('#app') 