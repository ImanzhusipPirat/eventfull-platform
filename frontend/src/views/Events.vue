<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">События</h1>
        <router-link
          to="/events/create"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Создать событие
        </router-link>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Загрузка событий...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="!events.length" class="text-center py-12">
        <p class="text-gray-600">Пока нет событий</p>
      </div>

      <!-- Events list -->
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="event in events"
          :key="event.id"
          class="bg-white overflow-hidden shadow rounded-lg"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900">{{ event.title }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ event.category }}</p>
              </div>
              <div class="ml-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="event.price === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                  {{ event.price === 0 ? 'Бесплатно' : `${event.price} ₽` }}
                </span>
              </div>
            </div>
            <p class="mt-3 text-sm text-gray-500">{{ event.description }}</p>
            <div class="mt-4">
              <div class="flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                {{ formatDate(event.date) }}
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ event.location }}
              </div>
            </div>
            <div class="mt-4 flex justify-between items-center">
              <div class="text-sm text-gray-500">
                {{ event.participants.length }}/{{ event.max_participants }} участников
              </div>
              <button
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                @click="joinEvent(event.id)"
              >
                Участвовать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'Events',
  setup() {
    const events = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchEvents = async () => {
      try {
        loading.value = true
        error.value = null
        const response = await axios.get('http://localhost:8000/events/')
        events.value = response.data
      } catch (err) {
        error.value = 'Ошибка при загрузке событий'
        console.error('Error fetching events:', err)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const joinEvent = async (eventId) => {
      try {
        // TODO: Implement event joining logic
        console.log('Joining event:', eventId)
      } catch (err) {
        console.error('Error joining event:', err)
      }
    }

    onMounted(() => {
      fetchEvents()
    })

    return {
      events,
      loading,
      error,
      formatDate,
      joinEvent
    }
  }
}
</script> 