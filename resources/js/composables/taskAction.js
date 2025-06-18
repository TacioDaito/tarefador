import axios from 'axios'
import { ref, toRaw } from 'vue'

export default function taskAction(emit) {

    const tasks = ref([])

    const getTasks = async () => {
        try {
            const response = await axios.get('/api/tasks')
            tasks.value = response.data.tasks
        } catch (error) {
            tasks.value = []
        }
    }

    const createTask = async () => {
        try {
            const emptyTask = {
                title: 'Nova Tarefa',
                description: '',
                users: []
            }
            const response = await axios.post('/api/tasks', emptyTask)
            getTasks()
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }

    const editTask = async (task) => {
        try {
            const response = await axios.put(`/api/tasks/${task.id}`, toRaw(task))
            emit('refreshTasks')
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    const deleteTask = async (task) => {
        try {
            await axios.delete(`/api/tasks/${task.id}`)
            emit('refreshTasks')
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    return {
        tasks,
        getTasks,
        createTask,
        editTask,
        deleteTask
    }
}


