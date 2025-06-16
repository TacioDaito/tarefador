import { createMemoryHistory, createRouter } from 'vue-router'
import clientState from './stores/clientState'
import LoginView from './views/LoginView.vue'
import DashboardView from './views/DashboardView.vue'

const routes = [
    { path: '/', component: LoginView, name: 'login' },
    { path: '/dashboard', component: DashboardView, name: 'dashboard', meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !clientState.isAuthenticated) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
