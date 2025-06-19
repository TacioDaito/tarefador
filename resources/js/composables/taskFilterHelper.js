import { ref, watch, toRaw } from 'vue'

export default function taskFilterHelper(getTasks, updateRows) {
    const filterOptions = [
        { label: 'Completada', value: 'completed' },
        { label: 'Com descrição', value: 'withDescription' },
        { label: 'Com participantes', value: 'withUsers' },
    ]
    const selectedFilters = ref([])

    watch(selectedFilters, (newFilters) => {
        try {
            const filterObj = toRaw(newFilters).reduce((acc, filter) => {
                acc[filter] = 1
                return acc
            }, {})
            getTasks(filterObj)
            updateRows()
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error)
        }
    })

    return {
        filterOptions,
        selectedFilters,
    }
}
