import { ref, watch } from 'vue'

export function taskPanelHelper(task, openPanel) {
    const editTitle = ref(task.title)
    const editDescription = ref(task.description)
    const isEditing = ref(false)

    function startEdit() {
        isEditing.value = true
    }

    function cancelEdit() {
        isEditing.value = false
        editTitle.value = task.title
        editDescription.value = task.description
    }

    function watchPanel() {
        watch(
            () => openPanel.value,
            (newVal) => {
                if (newVal !== task.id && isEditing.value) {
                    cancelEdit()
                }
            }
        )
    }

    return {
        editTitle,
        editDescription,
        isEditing,
        startEdit,
        cancelEdit,
        watchPanel
    }
}
