export const useLoginAction = (emailRef = null, passwordRef = null) => {
  const { user, isAuthenticated, loading, message } = useAuthState()
  const { login: sanctumLogin } = useSanctumAuth()
  const email = emailRef ?? ref('')
  const password = passwordRef ?? ref('')

  const login = async () => {
    loading.value = true
    let response
    try {
      response = await sanctumLogin({
        email: unref(email),
        password: unref(password)
      })
      user.value = response?.user ?? response
      isAuthenticated.value = true
      navigateTo('/dashboard')
    } catch (error) {
      user.value = null
      isAuthenticated.value = false
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
