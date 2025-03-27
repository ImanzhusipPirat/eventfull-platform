<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Events</h1>
      <router-link
        to="/create-event"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Event
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-8">
      Loading events...
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div v-else-if="events.length === 0" class="text-center py-8">
      No events found. Be the first to create one!
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          v-if="event.image_url"
          :src="event.image_url"
          :alt="event.title"
          class="w-full h-48 object-cover"
        >
        <div class="p-6">
          <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
          <p class="text-gray-600 mb-4">{{ event.description }}</p>
          <div class="text-sm text-gray-500">
            <p>📅 {{ formatDate(event.date) }}</p>
            <p>📍 {{ event.location }}</p>
            <p>👥 {{ event.participants.length }}/{{ event.max_participants }} participants</p>
            <p>💰 ${{ event.price }}</p>
          </div>
          <button
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            @click="joinEvent(event.id)"
          >
            Join Event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    ...mapState({
      events: state => state.events
    })
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    async joinEvent(eventId) {
      // TODO: Implement join event functionality
      console.log('Joining event:', eventId)
    }
  },
  async created() {
    try {
      await this.$store.dispatch('fetchEvents')
      this.loading = false
    } catch (error) {
      this.error = 'Failed to load events'
      console.error('Error fetching events:', error)
    } finally {
      this.loading = false
    }
  }
}
</script> 