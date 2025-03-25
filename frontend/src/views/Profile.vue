<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-3xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <span class="text-2xl font-bold text-indigo-600">
                {{ userInitials }}
              </span>
            </div>
          </div>
          <div class="ml-6">
            <h1 class="text-2xl font-bold text-gray-900">{{ currentUser.full_name }}</h1>
            <p class="text-gray-500">{{ currentUser.email }}</p>
          </div>
        </div>
      </div>

      <!-- User's Events -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">My Events</h2>

        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="activeTab = tab.name"
              :class="[
                activeTab === tab.name
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Events List -->
        <div class="mt-6">
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
            <p class="mt-2 text-gray-500">Loading events...</p>
          </div>

          <div v-else-if="error" class="text-center py-8 text-red-600">
            {{ error }}
          </div>

          <div v-else-if="filteredEvents.length === 0" class="text-center py-8 text-gray-500">
            No events found.
          </div>

          <div v-else class="space-y-6">
            <div
              v-for="event in filteredEvents"
              :key="event.id"
              class="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ event.title }}</h3>
                  <p class="mt-1 text-sm text-gray-500">{{ event.description }}</p>
                  <div class="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ formatDate(event.date) }}
                  </div>
                  <div class="mt-1 flex items-center text-sm text-gray-500">
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ event.location }}
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-800': event.price === 0,
                      'bg-blue-100 text-blue-800': event.price > 0
                    }"
                  >
                    {{ event.price === 0 ? 'Free' : `$${event.price}` }}
                  </span>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {{ event.category }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    const loading = ref(false)
    const error = ref('')
    const activeTab = ref('Organized')

    const currentUser = computed(() => store.getters.currentUser)
    const events = computed(() => store.getters.events)

    const userInitials = computed(() => {
      if (!currentUser.value?.full_name) return ''
      return currentUser.value.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    })

    const tabs = [
      { name: 'Organized' },
      { name: 'Participating' }
    ]

    const filteredEvents = computed(() => {
      if (!events.value) return []
      
      return events.value.filter(event => {
        if (activeTab.value === 'Organized') {
          return event.organizer_id === currentUser.value?.id
        } else {
          return event.participants.includes(currentUser.value?.id)
        }
      })
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    onMounted(async () => {
      loading.value = true
      try {
        await store.dispatch('fetchEvents')
      } catch (err) {
        error.value = err.message || 'Failed to load events'
      } finally {
        loading.value = false
      }
    })

    return {
      currentUser,
      userInitials,
      events,
      loading,
      error,
      tabs,
      activeTab,
      filteredEvents,
      formatDate
    }
  }
}
</script> 