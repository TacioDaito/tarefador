import { reactive, computed } from 'vue'

const clientState = reactive({
    user: null,
    isAuthenticated: false,
    message: '',
    loading: false,
})

clientState.isAdmin = computed(() => {
    return clientState.user.role === 'admin'
})

export default clientState
