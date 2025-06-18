import axios from 'axios'
import { ref, computed, toRaw } from 'vue'
import clientState from '../stores/clientState'

export default function taskAction(emit) {

    const tasks = ref([])

    const getTasks = async () => {
        clientState.loading = true
        try {
            const response = await axios.get('/api/tasks')
            tasks.value = response.data.tasks
        } catch (error) {
            tasks.value = []
            clientState.message = error.response?.data?.message
        } finally {
            clientState.loading = false
        }
    }

    const getFilteredTasks = async (filters = []) => {
        clientState.loading = true
        try {
            const response = await axios.get('/api/filteredTasks', {
                headers: {
                    'Filters': JSON.stringify(filters)
                }
            })
            tasks.value = response.data.tasks
        } catch (error) {
            tasks.value = []
            clientState.message = error.response?.data?.message
        } finally {
            clientState.loading = false
        }
    }

    const createTask = async () => {
        clientState.loading = true
        try {
            const emptyTask = {
                title: 'Nova Tarefa',
                description: '',
                users: []
            }
            await axios.post('/api/tasks', emptyTask)
        } catch (error) {
            clientState.message = error.response?.data?.message
        } finally {
            clientState.loading = false
            emit('refreshTasks')
        }
    }

    const editTask = async (task) => {
        clientState.loading = true
        try {
            await axios.put(`/api/tasks/${task.id}`, toRaw(task))
        } catch (error) {
            clientState.message = error.response?.data?.message
        } finally {
            clientState.loading = false
            emit('refreshTasks')
        }
    }

    const editTaskUsers = async (task) => {
        clientState.loading = true
        try {
            await axios.put(`/api/tasks/${task.id}/users`, toRaw(task))
        } catch (error) {
            clientState.message = error.response?.data?.message
        } finally {
            clientState.loading = false
            emit('refreshTasks')
        }
    }

    const deleteTask = async (task) => {
        clientState.loading = true
        try {
            await axios.delete(`/api/tasks/${task.id}`)
        } catch (error) {
            clientState.message = error.response?.data?.message
        } finally {
            clientState.loading = false
            emit('refreshTasks')
        }
    }

    function handleAssign(task) {
        if (!clientState.user) return

        if (!task.users.some(u => u.id === clientState.user.id)) {
            const updatedUsers = [
                ...task.users,
                { id: clientState.user.id }
            ]
            editTaskUsers({ ...task, users: updatedUsers })
        }
    }

    function handleUnassign(task) {
        if (!clientState.user) return

        const updatedUsers = task.users.filter(u => u.id !== clientState.user.id)
        editTaskUsers({ ...task, users: updatedUsers })
    }

    return {
        tasks,
        getTasks,
        getFilteredTasks,
        createTask,
        editTask,
        deleteTask,
        handleAssign,
        handleUnassign,
        loading: computed(() => clientState.loading),
        message: computed(() => clientState.message),
    }
}


