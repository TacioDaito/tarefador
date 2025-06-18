import { createWebHistory, createRouter } from 'vue-router'
import { clientState } from './stores/clientStateStore'
import LoginView from './views/LoginView.vue'
import DashboardView from './views/DashboardView.vue'
import TasksView from './views/TasksView.vue'

const routes = [
    { path: '/', component: LoginView, name: 'login' },
    { path: '/dashboard', component: DashboardView, name: 'dashboard', meta: { requiresAuth: true } },
    { path: '/tarefas', component: TasksView, name: 'tasks', meta: { requiresAuth: true } },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !clientState.isAuthenticated) {
        next({ name: 'login' })
    } else if (to.name === 'login' && clientState.isAuthenticated) {
        next({ name: 'dashboard' })
    } else {
        next()
    }
})

export default router
