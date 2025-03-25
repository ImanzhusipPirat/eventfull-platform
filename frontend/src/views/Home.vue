<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Discover Amazing</span>
                <span class="block text-indigo-600">Events Near You</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Find and join the most exciting events in your area. From concerts to workshops, sports to networking events - there's something for everyone.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/events"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Events
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/create-event"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Create Event
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Featured Events Section -->
    <div class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Events
          </h2>
          <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Check out some of our most popular upcoming events
          </p>
        </div>

        <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="event in featuredEvents" :key="event.id" class="bg-white overflow-hidden shadow rounded-lg">
            <div class="relative pb-2/3">
              <img
                :src="event.image_url || 'https://via.placeholder.com/400x300'"
                :alt="event.title"
                class="absolute h-full w-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {{ event.category }}
                  </span>
                </div>
                <div class="ml-2 text-sm text-gray-500">
                  {{ formatDate(event.date) }}
                </div>
              </div>
              <div class="mt-4">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ event.title }}
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  {{ event.description }}
                </p>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <div class="text-sm text-gray-500">
                  {{ event.location }}
                </div>
                <div class="text-lg font-medium text-gray-900">
                  ${{ event.price }}
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
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const featuredEvents = ref([])

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    onMounted(async () => {
      try {
        const events = await store.dispatch('fetchEvents')
        featuredEvents.value = events.slice(0, 6) // Show only first 6 events
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    })

    return {
      featuredEvents,
      formatDate
    }
  }
}
</script> 