<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'
import Message from 'primevue/message'
import NavBar from '../components/NavBar.vue'

import tasks from '../composables/taskAction'


</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <NavBar/>
        <Card class="w-2xs md:w-4xl">
            <template #title>
                <div class="mb-4">Minhas Tarefas</div>
            </template>
            <template #content>
                <div v-if="tasks">
                    <div v-for="task in tasks" :key="task.id" class="mb-4">
                        <h3 class="text-lg font-semibold">{{ task.title }}</h3>
                        <p>{{ task.description }}</p>
                        <p class="text-sm text-gray-500">Status: {{ task.completed }}</p>
                    </div>
                </div>
                <Message v-else severity="warn">Sem informações</Message>
            </template>
        </Card>
    </div>
</template>
