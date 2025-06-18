<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Message from 'primevue/message'
import Paginator from 'primevue/paginator'
import Accordion from 'primevue/accordion'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import NavBar from '../components/NavBar.vue'
import TaskPanel from '../components/TaskPanel.vue'
import taskAction from '../composables/taskAction'
import responsivePagination from '../composables/responsivePagination'
import { clientState } from '../stores/clientStateStore'

const emit = defineEmits(['refreshTasks'])
const { tasks, loading, getTasks, createTask } = taskAction(emit)
const { first, rows, pagedItems: pagedTasks, updateRows } = responsivePagination(tasks)
const openPanel = ref(null)

onMounted(() => {
    getTasks({ assignedOrOwnedByUser: clientState.user.id })
    updateRows()
})
</script>

<template>
    <div class="flex justify-center">

        <NavBar />

        <Card class="w-sm md:w-4xl h-auto mt-22">

            <template #title>
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-lg md:text-xl">Minhas Tarefas</h1>
                    <Button label="Criar" icon="pi pi-plus" class="p-button-success" @click="createTask" />
                </div>
                <Divider/>
            </template>

            <template #content>
                <div v-show="loading">
                    <Skeleton height="3rem" class="mb-2 fixed z-50" v-for="n in 3" :key="n" />
                </div>
                <div v-show="tasks.length && !loading">
                    <Accordion v-model:value="openPanel">
                        <TaskPanel
                            v-for="task in pagedTasks"
                            :key="task.id"
                            :task="task"
                            :value="task.id"
                            :openPanel="openPanel"
                            @refreshTasks="getTasks({ assignedOrOwnedByUser: clientState.user.id })"
                        />
                    </Accordion>
                </div>
                <Message v-show="tasks.length === 0 && !loading" severity="warn">Sem informações</Message>
            </template>

            <template #footer>
                <Paginator :template="{
                    '768px': 'PrevPageLink CurrentPageReport NextPageLink',
                    default: 'JumpToPageInput FirstPageLink PageLinks LastPageLink CurrentPageReport',
                }" :rows="rows" :totalRecords="tasks.length" :pageLinkSize="5" v-model:first="first"
                    class="" />
            </template>

        </Card>

    </div>
</template>
