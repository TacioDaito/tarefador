import { reactive } from 'vue'

const clientState = reactive({
    user: null,
    isAuthenticated: false,
    message: '',
    loading: false,
})

export default clientState
