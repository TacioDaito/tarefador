import { createWebHistory, createRouter } from 'vue-router'
import { clientState } from '@/stores/clientStateStore'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TasksView from '@/views/TasksView.vue'
import SignUpView from '@/views/SignUpView.vue'

const routes = [
    { path: '/', component: LoginView, name: 'login' },
    { path: '/criarConta', component: SignUpView, name: 'signup', meta: { requiresAuth: false } },
    { path: '/dashboard', component: DashboardView, name: 'dashboard', meta: { requiresAuth: true } },
    { path: '/tarefas', component: TasksView, name: 'tasks', meta: { requiresAuth: true } },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !clientState.isAuthenticated) {
        router.push({ name: 'login' })
    } else if (to.name === 'login' && clientState.isAuthenticated) {
        router.push({ name: 'dashboard' })
    } else {
        return true
    }
})
