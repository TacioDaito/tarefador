import { ref, watch } from 'vue'

export default function taskPanelHelper(props, emit) {

    const isEditing = ref(false)

    function startEdit() {
        isEditing.value = true
    }

    function cancelEdit() {
        isEditing.value = false
        emit('refreshTasks')
    }

    watch(
        () => props.openPanel,
        (newVal) => {
            if (newVal !== props.task.id && isEditing.value) {
                cancelEdit()
            }
        }
    )

    watch(
        () => props.task,
        () => {
            if (isEditing.value) {
                cancelEdit()
            }
        }
    )

    return {
        isEditing,
        startEdit,
        cancelEdit,
    }
}
