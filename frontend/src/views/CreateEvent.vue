<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h2 class="text-2xl font-bold mb-6">Создать событие</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Название</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Описание</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <!-- Date and Time -->
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700">Дата и время</label>
          <input
            type="datetime-local"
            id="date"
            v-model="form.date"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Location -->
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700">Место проведения</label>
          <input
            type="text"
            id="location"
            v-model="form.location"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Категория</label>
          <select
            id="category"
            v-model="form.category"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Выберите категорию</option>
            <option value="Спорт">Спорт</option>
            <option value="Культура">Культура</option>
            <option value="Образование">Образование</option>
            <option value="Развлечения">Развлечения</option>
            <option value="Бизнес">Бизнес</option>
          </select>
        </div>

        <!-- Max Participants -->
        <div>
          <label for="maxParticipants" class="block text-sm font-medium text-gray-700">Максимум участников</label>
          <input
            type="number"
            id="maxParticipants"
            v-model="form.max_participants"
            required
            min="1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Цена (₽)</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            required
            min="0"
            step="0.01"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Image URL -->
        <div>
          <label for="imageUrl" class="block text-sm font-medium text-gray-700">URL изображения (необязательно)</label>
          <input
            type="url"
            id="imageUrl"
            v-model="form.image_url"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ loading ? 'Создание...' : 'Создать событие' }}
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'CreateEvent',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const error = ref('')
    
    const form = ref({
      title: '',
      description: '',
      date: '',
      location: '',
      category: '',
      max_participants: 1,
      price: 0,
      image_url: ''
    })

    const handleSubmit = async () => {
      loading.value = true
      error.value = ''

      try {
        const response = await axios.post('/events/', {
          ...form.value,
          date: new Date(form.value.date).toISOString()
        })

        if (response.data) {
          router.push('/events')
        }
      } catch (err) {
        error.value = err.response?.data?.detail || 'Произошла ошибка при создании события'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      error,
      handleSubmit
    }
  }
}
</script> 