import axios from 'axios'
import { ref } from 'vue'

const tasks = ref([])

const getTasks = async () => {
    try {
        const response = await axios.get('/api/tasks')
        tasks.value = response.data.tasks
    } catch (error) {
        tasks.value = []
    }
}

export default function taskAction() {
    return { tasks, getTasks }
}
