import { unref } from 'vue'

export const useLoginAction = (emailRef = null, passwordRef = null) => {
  const { user, isAuthenticated, loading, message } = useAuthState()
  const config = useRuntimeConfig()
  const email = emailRef ?? ref('')
  const password = passwordRef ?? ref('')

  const login = async () => {
    loading.value = true
    try {
      await $fetch('/sanctum/csrf-cookie', {
        baseURL: config.public.apiUrl,
        credentials: 'include'
      })
      const response = await $fetch('/login', {
        baseURL: config.public.apiUrl,
        method: 'POST',
        credentials: 'include',
        body: {
          email: unref(email),
          password: unref(password)
        }
      })
      user.value = response.user
      isAuthenticated.value = true
      navigateTo('/dashboard')
    } catch (error) {
      user.value = null
      isAuthenticated.value = false
      message.value = error.data?.message || 'Erro ao fazer login.'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    loading,
    message,
    login
  }
}