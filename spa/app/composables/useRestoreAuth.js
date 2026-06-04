export const useRestoreAuth = () => {
  const restoreAuth = async () => {
    const { user, isAuthenticated } = useAuthState()
    const { api } = useApi()

    try {
      const data = await api('/user')
      user.value = data
      isAuthenticated.value = true
    } catch {
      user.value = null
      isAuthenticated.value = false
    }
  }

  return { restoreAuth }
}