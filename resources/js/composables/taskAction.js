import axios from 'axios'
import { ref, toRaw } from 'vue'
import clientState from '../stores/clientState'

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

    function handleAssign(task) {
        if (!clientState.user) return

        if (!task.users.some(u => u.id === clientState.user.id)) {
            const updatedUsers = [
                ...task.users,
                { id: clientState.user.id, name: clientState.user.name }
            ]
            editTask({ ...task, users: updatedUsers })
        }
    }

    function handleUnassign(task) {
        if (!clientState.user) return

        const updatedUsers = task.users.filter(u => u.id !== clientState.user.id)
        editTask({ ...task, users: updatedUsers })
    }

    return {
        tasks,
        getTasks,
        createTask,
        editTask,
        deleteTask,
        handleAssign,
        handleUnassign
    }
}


