<script setup>
import { onMounted } from 'vue'
import Card from 'primevue/card'
import Message from 'primevue/message'
import Paginator from 'primevue/paginator'
import NavBar from '../components/NavBar.vue'
import TaskCard from '../components/TaskCard.vue'
import taskAction from '../composables/taskAction'
import responsivePagination from '../composables/responsivePagination'

const { tasks, getTasks } = taskAction()
const { first, rows, pagedItems: pagedTasks, updateRows } = responsivePagination(tasks)

onMounted(() => {
    getTasks()
    updateRows()
})
</script>

<template>
    <div class="flex justify-center h-screen">

        <NavBar />

        <Card class="w-xs md:w-4xl h-auto mt-28 mb-10">

            <template #title>
                <h1 class="mb-4 text-lg md:text-xl">Minhas Tarefas</h1>
            </template>

            <template #content>
                <div v-if="tasks.length">
                    <TaskCard v-for="task in pagedTasks" :key="task.id" :task="task" />
                </div>
                <Message v-else severity="warn">Sem informações</Message>
            </template>

            <template #footer>
            </template>

        </Card>

        <Paginator :template="{
            '768px': 'PrevPageLink CurrentPageReport NextPageLink',
            default: 'JumpToPageInput FirstPageLink PageLinks LastPageLink CurrentPageReport',
        }" :rows="rows" :totalRecords="tasks.length" :pageLinkSize="5" v-model:first="first"
            class="bottom-12 absolute" />

    </div>
</template>
