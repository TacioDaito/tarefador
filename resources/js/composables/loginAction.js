import { ref, computed, unref } from 'vue'
import axios from 'axios'
import { clientState } from '../stores/clientStateStore'
import router from '../router'

export default function loginAction(emailRef = null, passwordRef = null) {
    const email = emailRef ?? ref('')
    const password = passwordRef ?? ref('')

    const login = async () => {
        clientState.loading = true
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/api/login', {
                email: unref(email),
                password: unref(password)
            })
            clientState.user = response.data.user
            clientState.isAuthenticated = true
            router.push({ name: 'dashboard' })
        } catch (error) {
            clientState.user = null
            clientState.isAuthenticated = false
            clientState.message = error.response?.data?.message
            return false
        } finally {
            clientState.loading = false
        }
    }

    return {
        email,
        password,
        loading: computed(() => clientState.loading),
        message: computed(() => clientState.message),
        login
    }
}
