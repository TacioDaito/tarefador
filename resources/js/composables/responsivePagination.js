import { ref, computed, onMounted, onUnmounted } from 'vue'

export default function responsivePagination(itemsRef) {
    const first = ref(0)
    const rows = ref()

    function updateRows() {
        const width = window.innerWidth
        const height = window.innerHeight
        if (height < 600) {
            rows.value = 1
        } else if (height < 760) {
            rows.value = 2
        } else if (height < 920 || width < 768) {
            rows.value = 3
        } else {
            rows.value = 4
        }
    }

    const pagedItems = computed(() => {
        return itemsRef.value.slice(first.value, first.value + rows.value)
    })

    onMounted(() => {
        updateRows()
        window.addEventListener('resize', updateRows)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateRows)
    })

    return {
        first,
        rows,
        pagedItems,
        updateRows
    }
}
