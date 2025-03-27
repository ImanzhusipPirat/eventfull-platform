import { createStore } from 'vuex'
import axios from 'axios'

// Определяем API URL
const API_URL = 'http://localhost:8000'
console.log('[Store] Using API URL:', API_URL)

// Настраиваем axios
axios.defaults.baseURL = API_URL

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token'),
    events: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      console.log('[Store] User state updated:', user ? 'User logged in' : 'User logged out');
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('[Store] Token saved and set in headers');
      } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        console.log('[Store] Token removed');
      }
    },
    setEvents(state, events) {
      state.events = events;
      console.log('[Store] Events updated:', events.length, 'events loaded');
    }
  },
  actions: {
    async fetchEvents({ commit }) {
      console.log('[Store] Fetching events...');
      try {
        const response = await axios.get('/events');
        commit('setEvents', response.data);
        return response.data;
      } catch (error) {
        console.error('[Store] Error fetching events:', error.response?.data || error.message);
        commit('setEvents', []);
        throw error;
      }
    },
    async register({ commit }, userData) {
      console.log('[Store] Starting registration...');
      try {
        const response = await axios.post('/users/register', userData);
        console.log('[Store] Registration successful:', response.data);
        
        // Автоматически входим после регистрации
        const loginResponse = await axios.post('/auth/login', {
          username: userData.email,
          password: userData.password
        });
        commit('setToken', loginResponse.data.access_token);
        commit('setUser', loginResponse.data.user);
        
        return response.data;
      } catch (error) {
        console.error('[Store] Registration error:', error.response?.data || error.message);
        throw error;
      }
    },
    async login({ commit }, credentials) {
      console.log('[Store] Starting login...');
      try {
        const response = await axios.post('/auth/login', credentials);
        console.log('[Store] Login successful');
        commit('setToken', response.data.access_token);
        commit('setUser', response.data.user);
        return response.data;
      } catch (error) {
        console.error('[Store] Login error:', error.response?.data || error.message);
        throw error;
      }
    },
    logout({ commit }) {
      console.log('[Store] Logging out...');
      commit('setUser', null);
      commit('setToken', null);
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    allEvents: state => state.events
  }
}) 