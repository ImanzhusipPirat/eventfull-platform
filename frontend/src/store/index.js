import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://eventfull-platform.onrender.com'
console.log('API URL:', API_URL)

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    setToken(state, token) {
      state.token = token
      if (token) {
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials)
        const { access_token } = response.data
        commit('setToken', access_token)
        // Получаем данные пользователя
        const userResponse = await axios.get(`${API_URL}/users/me`)
        commit('setUser', userResponse.data)
        return true
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    async register({ commit }, userData) {
      try {
        console.log('Register request with data:', userData)
        console.log('API URL:', API_URL)
        
        // Регистрируем пользователя
        const registerResponse = await axios.post(`${API_URL}/users/register`, userData)
        console.log('Register response:', registerResponse.data)
        
        // После успешной регистрации входим в систему
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
          username: userData.email,
          password: userData.password
        })
        const { access_token } = loginResponse.data
        commit('setToken', access_token)
        
        // Получаем данные пользователя
        const userResponse = await axios.get(`${API_URL}/users/me`)
        commit('setUser', userResponse.data)
        return true
      } catch (error) {
        console.error('Registration error details:', error)
        console.error('Error response:', error.response?.data)
        throw error
      }
    },
    async logout({ commit }) {
      commit('logout')
    },
    async checkAuth({ commit, state }) {
      if (!state.token) return false
      try {
        const response = await axios.get(`${API_URL}/users/me`)
        commit('setUser', response.data)
        return true
      } catch (error) {
        commit('logout')
        return false
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user
  }
}) 