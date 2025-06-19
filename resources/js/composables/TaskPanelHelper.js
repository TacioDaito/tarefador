import { ref, watch } from 'vue'
import { clientState } from '../stores/clientStateStore'

export default function taskPanelHelper(props, emit) {

    const isEditing = ref(false)
    const isAssigned = ref(false)

    function startEdit() {
        isEditing.value = true
    }

    function cancelEdit() {
        isEditing.value = false
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
    }
}
