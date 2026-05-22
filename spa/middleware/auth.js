export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuthState()

  const protectedRoutes = ['/dashboard', '/tasks']
  const guestRoutes = ['/login', '/signup']

  if (protectedRoutes.includes(to.path) && !isAuthenticated.value) {
    return navigateTo('/login')
  }

  if (guestRoutes.includes(to.path) && isAuthenticated.value) {
    return navigateTo('/dashboard')
  }
})