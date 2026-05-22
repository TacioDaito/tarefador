export const useLogoutAction = () => {
  const { user, isAuthenticated, loading, loggingOut, message } = useAuthState()
  const config = useRuntimeConfig()

  const logout = async () => {
    loggingOut.value = true
    try {
      await $fetch('/logout', {
        baseURL: config.public.apiUrl,
        method: 'POST',
        credentials: 'include'
      })
      user.value = null
      isAuthenticated.value = false
      loading.value = false
      message.value = ''
    } finally {
      loggingOut.value = false
      navigateTo('/login')
    }
  }

  return { logout }
}