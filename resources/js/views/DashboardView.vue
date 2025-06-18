<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Message from 'primevue/message'
import Paginator from 'primevue/paginator'
import Accordion from 'primevue/accordion'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import NavBar from '../components/NavBar.vue'
import TaskPanel from '../components/TaskPanel.vue'
import taskAction from '../composables/taskAction'
import responsivePagination from '../composables/responsivePagination'

const emit = defineEmits(['refreshTasks'])
const { tasks, getTasks, createTask } = taskAction(emit)
const { first, rows, pagedItems: pagedTasks, updateRows } = responsivePagination(tasks)
const openPanel = ref(null)

onMounted(() => {
    getTasks()
    updateRows()
})

</script>

<template>
    <div class="flex justify-center h-screen">

        <NavBar />

        <Card class="w-sm md:w-4xl h-auto mt-28 mb-10">

            <template #title>
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-lg md:text-xl">Minhas Tarefas</h1>
                    <Button label="Criar" icon="pi pi-plus" class="p-button-success" @click="createTask" />
                </div>
                <Divider/>
            </template>

            <template #content>
                <div v-if="tasks.length">
                    <Accordion v-model:value="openPanel">
                        <TaskPanel
                            v-for="task in pagedTasks"
                            :key="task.id"
                            :task="task"
                            :value="task.id"
                            :openPanel="openPanel"
                            @refreshTasks="getTasks"
                        />
                    </Accordion>
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
