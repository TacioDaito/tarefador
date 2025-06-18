import { reactive, computed } from 'vue'

export const clientState = reactive({
    user: null,
    isAuthenticated: false,
    message: '',
    loading: false,
})

export const isAdmin = computed(() => {
    return clientState.user.role === 'admin'
})

