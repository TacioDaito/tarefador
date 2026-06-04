import { toRaw } from 'vue'

export const useTaskPanelHelper = (props, emit) => {
  const { user } = useAuthState()

  const isEditing = ref(false)
  const isAssigned = ref(false)
  const editableTask = ref(null)

  function startEdit() {
    editableTask.value = JSON.parse(JSON.stringify(toRaw(props.task)))
    isEditing.value = true
  }

  function cancelEdit() {
    isEditing.value = false
    editableTask.value = null
    emit('refreshTasks')
  }

  watch(
    () => props.task,
    () => {
      if (isEditing.value) {
        isEditing.value = false
      }
    }
  )

  watch(
    () => [props.task.users, user.value],
    () => {
      if (user.value) {
        isAssigned.value = props.task.users.some(u => u.id === user.value.id)
      } else {
        isAssigned.value = false
      }
    },
    { immediate: true, deep: true }
  )

  return {
    isEditing,
    startEdit,
    cancelEdit,
    isAssigned,
    editableTask
  }
}