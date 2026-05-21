import { ref } from 'vue'
import axios from 'axios'
import loginAction from './loginAction'

export default function signUpAction() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    const message = ref('')
    const { login } = loginAction(email, password)

    const onSubmit = async () => {
        message.value = ''
        if (password.value !== confirmPassword.value) {
            message.value = 'As senhas não coincidem.'
            return
        }
        loading.value = true
        try {
            await axios.post(import.meta.env.VITE_API_URL + '/user', {
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: confirmPassword.value
            })
            await login()
        } catch (error) {
            message.value = error.response?.data?.message || 'Erro ao registrar.'
        } finally {
            loading.value = false
        }
    }

    return {
        name,
        email,
        password,
        confirmPassword,
        loading,
        message,
        onSubmit
    }
}
