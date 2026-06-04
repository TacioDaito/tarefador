import { unref } from 'vue'

export const useLoginAction = (emailRef = null, passwordRef = null) => {
  const { user, isAuthenticated, loading, message } = useAuthState()
  const { login: sanctumLogin } = useSanctumAuth()
  const email = emailRef ?? ref('')
  const password = passwordRef ?? ref('')

  const login = async () => {
    loading.value = true
    try {
      const response = await sanctumLogin({
        email: unref(email),
        password: unref(password)
      })
      user.value = response?.
      user ?? response
      isAuthenticated.value = true
      navigateTo('/dashboard')
    } catch (error) {
      user.value = null
      isAuthenticated.value = false
      message.value = error || 'Erro ao fazer login.'
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
