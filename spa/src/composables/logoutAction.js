import axios from 'axios'
import { clientState } from '../stores/clientStateStore'
import router from '../router'

export default async function logout() {
    clientState.loggingOut = true
    try {
        await axios.post('/api/logout')
        localStorage.removeItem('auth_token')
        clientState.user = null
        clientState.isAuthenticated = false
        clientState.loading = false
        clientState.message = ''
    } finally {
        clientState.loggingOut = false
        router.push({ name: 'login' })
    }
}
