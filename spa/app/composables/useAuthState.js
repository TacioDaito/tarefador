export const useAuthState = () => {
  const user = useState('user', () => null)
  const isAuthenticated = useState('isAuthenticated', () => false)
  const message = useState('message', () => '')
  const loading = useState('loading', () => false)
  const loggingOut = useState('loggingOut', () => false)

  const isAdmin = computed(() => user.value?.role === 'admin')

  return {
    user,
    isAuthenticated,
    message,
    loading,
    loggingOut,
    isAdmin
  }
}