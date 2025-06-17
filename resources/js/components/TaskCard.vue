<script setup>
defineProps({
    task: {
        type: Object,
        required: true
    }
})
import Card from 'primevue/card'
</script>

<template>
    <Card class="mb-4 h-34 md:h-36">
        <template #title>
            <h3 class="text-base md:text-lg font-semibold truncate">{{ task.title }}</h3>
        </template>
        <template #content>
            <p class="truncate text-sm md:text-base">{{ task.description }}</p>
        </template>
        <template #footer>
            <div class="mt-4 flex justify-end space-x-4">
                <span class="text-xs md:text-sm font-bold text-emerald-500">
                    {{ task.completed ? 'Completada' : '' }}
                </span>
                <span class="text-xs md:text-sm font-bold">
                    Participantes: {{ task.users.length }}
                </span>
            </div>
        </template>
    </Card>
</template>
