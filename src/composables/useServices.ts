import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

// This composable is a simplified example for the exercise.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(): any {
  const services = ref<any[]>([])
  const loading = ref<any>(false)

  const getServices = async (): Promise<any> => {
    // Initialize loading state
    loading.value = true

    // Fetch data from the API
    const result = await axios.get('/api/services')

    // Store data in Vue ref
    services.value = result.data

    // Reset loading state
    loading.value = false
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices()
  })

  // Return stateful data
  return {
    services,
    loading,
  }
}
