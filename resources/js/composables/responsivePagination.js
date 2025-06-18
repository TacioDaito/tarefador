import { ref, computed, onMounted, onUnmounted } from 'vue'

export default function responsivePagination(itemsRef) {
    const first = ref(0)
    const rows = ref()

    function updateRows() {
        const height = window.innerHeight
        if (height < 600) {
            rows.value = 1
        } else if (height < 760) {
            rows.value = 2
        } else if (height < 950) {
            rows.value = 2
        } else {
            rows.value = 3
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
