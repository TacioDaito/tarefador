export const useLogoutAction = () => {
  const { user, isAuthenticated, loading, loggingOut, message } = useAuthState()
  const { logout: sanctumLogout } = useSanctumAuth()

  const logout = async () => {
    loggingOut.value = true
    try {
      await sanctumLogout()
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
