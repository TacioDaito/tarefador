import axios from 'axios'
import { clientState } from '../stores/clientStateStore'
import router from '../router'

export default async function logout() {
    clientState.loading = true
    try {
        await axios.get('/api/logout')
        router.push({ name: 'login' })
        clientState.user = null
        clientState.isAuthenticated = false
    } catch (error) {

    } finally {
        clientState.loading = false
    }
}