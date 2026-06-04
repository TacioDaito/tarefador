export const useApi = () => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiUrl,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    onRequest({ options }) {
      if (import.meta.client) {
        const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN\s*=\s*([^;]*)/)
        if (match) {
          options.headers.set('X-XSRF-TOKEN', decodeURIComponent(match[1]))
        }
      }
    }
  })

  const fetchCsrf = async () => {
    await api('/sanctum/csrf-cookie')
  }

  const fetchUser = async () => {
    const data = await api('/user')
    user.value = data
    isAuthenticated.value = true
    return data
  }

  return { api, fetchCsrf, fetchUser }
}
