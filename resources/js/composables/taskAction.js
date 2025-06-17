import axios from 'axios'
import { ref } from 'vue'
import router from '../router'

const tasks = ref([])

const getTasks = async () => {
    try {
        const response = await axios.get('/api/tasks')
        tasks.value = response.data.tasks
    } catch (error) {
        tasks.value = []
    }
}

const createTask = async (task) => {
    try {
        const response = await axios.post('/api/tasks', task)
        await getTasks()
    } catch (error) {
        console.error('Error creating task:', error)
    }
}

const editTask = async (taskId, updatedFields) => {
    try {
        const response = await axios.put(`/api/tasks/${taskId}`, updatedFields)
        await getTasks()
    } catch (error) {
        console.error('Erro:', error)
    }
}

const deleteTask = async (taskId) => {
    try {
        await axios.delete(`/api/tasks/${taskId}`)
        await getTasks()
    } catch (error) {
        console.error('Erro:', error)
    }
}



export default function taskAction() {
    return { tasks, getTasks, createTask, editTask, deleteTask }
}
