export const useTaskAction = (emit) => {
  const { user, loading, message } = useAuthState()
  const client = useSanctumClient()
  const tasks = ref([])

  const getTasks = async (params = {}) => {
    loading.value = true
    try {
      const data = await client('/tasks', {
        params
      })
      tasks.value = data.tasks
    } catch (error) {
      tasks.value = []
      if (error?.data?.errors) {
        const messages = Object.values(error.data.errors).flat()
        message.value = messages.join('. ')
      } else {
        message.value = error?.message || 'Erro ao buscar tarefas.'
      }
    } finally {
      loading.value = false
    }
  }

  const createTask = async () => {
    loading.value = true
    try {
      const emptyTask = {
        title: 'Nova Tarefa',
        description: '',
        users: []
      }
      await client('/tasks', {
        method: 'POST',
        body: emptyTask
      })
      getTasks({ assignedOrOwnedByUser: user.value?.id })
    } catch (error) {
      if (error?.data?.errors) {
        const messages = Object.values(error.data.errors).flat()
        message.value = messages.join('. ')
      } else {
        message.value = error?.message || 'Erro ao criar tarefa.'
      }
    } finally {
      loading.value = false
    }
  }

  const editTask = async (task) => {
    loading.value = true
    try {
      await client(`/tasks/${task.id}`, {
        method: 'PUT',
        body: toRaw(task)
      })
      emit('refreshTasks')
    } catch (error) {
      if (error?.data?.errors) {
        const messages = Object.values(error.data.errors).flat()
        message.value = messages.join('. ')
      } else {
        message.value = error?.message || 'Erro ao editar tarefa.'
      }
    } finally {
      loading.value = false
    }
  }

  const editTaskUsers = async (task) => {
    loading.value = true
    try {
      await client(`/tasks/${task.id}/users`, {
        method: 'PUT',
        body: toRaw(task)
      })
      emit('refreshTasks')
    } catch (error) {
      if (error?.data?.errors) {
        const messages = Object.values(error.data.errors).flat()
        message.value = messages.join('. ')
      } else {
        message.value = error?.message || 'Erro ao atualizar participantes.'
      }
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (task) => {
    loading.value = true
    try {
      await client(`/tasks/${task.id}`, {
        method: 'DELETE'
      })
      emit('refreshTasks')
    } catch (error) {
      if (error?.data?.errors) {
        const messages = Object.values(error.data.errors).flat()
        message.value = messages.join('. ')
      } else {
        message.value = error?.message || 'Erro ao deletar tarefa.'
      }
    } finally {
      loading.value = false
    }
  }

  function handleAssign(task) {
    if (!user.value) return

    if (!task.users.some(u => u.id === user.value.id)) {
      const updatedUsers = [
        ...task.users,
        { id: user.value.id }
      ]
      editTaskUsers({ ...task, users: updatedUsers })
    }
  }

  function handleUnassign(task) {
    if (!user.value) return

    const updatedUsers = task.users.filter(u => u.id !== user.value.id)
    editTaskUsers({ ...task, users: updatedUsers })
  }

  return {
    tasks,
    getTasks,
    createTask,
    editTask,
    deleteTask,
    handleAssign,
    handleUnassign,
    loading,
    message
  }
}