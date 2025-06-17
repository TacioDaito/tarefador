import { computed } from 'vue'
import axios from 'axios'
import clientState from '../stores/clientState'
import router from '../router'

const login = async (email, password) => {
    clientState.loading = true
    try {
        await axios.get('/sanctum/csrf-cookie')
        const response = await axios.post('/api/login', { email, password })
        clientState.user = response.data.user
        clientState.isAuthenticated = true
        clientState.message = 'Login successful!'
        router.push({ name: 'dashboard' })
    } catch (error) {
        clientState.user = null
        clientState.isAuthenticated = false
        clientState.message = error.response?.data?.message || 'Login falhou. Tente novamente.'
        return false
    } finally {
        clientState.loading = false
    }
}

export default function loginUser() {
    return {
        loading: computed(() => clientState.loading),
        message: computed(() => clientState.message),
        login
    }
}
