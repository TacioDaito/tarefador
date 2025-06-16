import axios from 'axios'
import clientState from '../stores/clientState'
import router from '../router'
import { computed } from 'vue'

const logout = async () => {
    clientState.loading = true
    try {
        await axios.get('/api/logout')
        router.push({ name: 'login' })
        clientState.user = null
        clientState.isAuthenticated = false
        clientState.message = 'Logout successful'
    } catch (error) {

    } finally {
        clientState.loading = false
    }
}

export default function logoutAction() {
    return {
        loading: computed(() => clientState.loading),
        message: computed(() => clientState.message),
        logout,
    }
}
