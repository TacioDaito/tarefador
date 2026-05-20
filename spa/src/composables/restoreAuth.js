import axios from 'axios'
import { clientState } from '../stores/clientStateStore'

export default async function restoreAuth() {
    const token = localStorage.getItem('auth_token')
    if (!token) {
        clientState.user = null
        clientState.isAuthenticated = false
        return
    }

    try {
        const response = await axios.get('/api/user')
        clientState.user = response.data
        clientState.isAuthenticated = true
    } catch {
        localStorage.removeItem('auth_token')
        clientState.user = null
        clientState.isAuthenticated = false
    }
}
