import axios from 'axios'
import { clientState } from '../stores/clientStateStore'

export default async function restoreAuth() {
    try {
        const response = await axios.get('/api/user')
        clientState.user = response.data
        clientState.isAuthenticated = true
    } catch {
        clientState.user = null
        clientState.isAuthenticated = false
    }
}
