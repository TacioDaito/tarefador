import axios from 'axios'
import { clientState } from '@/stores/clientStateStore'

export const restoreAuth = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user')
        clientState.user = response.data
        clientState.isAuthenticated = true
    } catch {
        clientState.user = null
        clientState.isAuthenticated = false
    }
}
