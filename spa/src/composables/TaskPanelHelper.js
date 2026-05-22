import { ref, watch, toRaw } from 'vue'
import { clientState } from '@/stores/clientStateStore'

export const taskPanelHelper = (props, emit) => {

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
        () => [props.task.users, clientState.user],
        () => {
            if (clientState.user) {
                isAssigned.value = props.task.users.some(u => u.id === clientState.user.id)
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
        editableTask,
    }
}
