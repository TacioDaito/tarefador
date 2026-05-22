export const useRestoreAuth = () => {
  const restoreAuth = async () => {
    const { user, isAuthenticated } = useAuthState()
    const config = useRuntimeConfig()

    try {
      const data = await $fetch('/user', {
        baseURL: config.public.apiUrl,
        credentials: 'include'
      })
      user.value = data
      isAuthenticated.value = true
    } catch {
      user.value = null
      isAuthenticated.value = false
    }
  }

  return { restoreAuth }
}