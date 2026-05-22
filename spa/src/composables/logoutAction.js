import axios from 'axios'
import { clientState } from '@/stores/clientStateStore'
import { router } from '@/router'

export const logout = async () => {
    clientState.loggingOut = true
    try {
        await axios.post(import.meta.env.VITE_API_URL + '/logout')
        clientState.user = null
        clientState.isAuthenticated = false
        clientState.loading = false
        clientState.message = ''
    } finally {
        clientState.loggingOut = false
        router.push({ name: 'login' })
    }
}
