<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Message from 'primevue/message'
import Paginator from 'primevue/paginator'
import Accordion from 'primevue/accordion'
import Divider from 'primevue/divider'
import Skeleton from 'primevue/skeleton'
import MultiSelect from 'primevue/multiselect'
import NavBar from '../components/NavBar.vue'
import TaskPanel from '../components/TaskPanel.vue'
import taskAction from '../composables/taskAction'
import responsivePagination from '../composables/responsivePagination'
import taskFilterHelper from '../composables/taskFilterHelper'

const emit = defineEmits(['refreshTasks'])
const { tasks, loading, getTasks } = taskAction(emit)
const { first, rows, pagedItems: pagedTasks, updateRows } = responsivePagination(tasks)

const { filterOptions, selectedFilters } = taskFilterHelper(getTasks, updateRows)

onMounted(() => {
    getTasks()
    updateRows()
})
</script>

<template>
    <div class="flex justify-center">

        <NavBar />

        <Card class="w-sm md:w-4xl h-auto mt-22">

            <template #title>
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-lg md:text-xl">Outras Tarefas</h1>
                    <MultiSelect v-model="selectedFilters" :options="filterOptions" optionLabel="label"
                        optionValue="value" display="chip" placeholder="Filtros" size="small" class="w-50 md:w-auto h-9 truncate
                        "/>
                </div>
                <Divider />
            </template>

            <template #content>
                <div v-show="loading">
                    <Skeleton height="3rem" class="mb-2 fixed z-50" v-for="n in 3" :key="n" />
                </div>
                <div v-show="tasks.length && !loading">
                    <Accordion value="0">
                        <TaskPanel v-for="task in pagedTasks" :key="task.id" :task="task" :value="task.id"
                            @refreshTasks="getTasks" />
                    </Accordion>
                </div>
                <Message v-show="tasks.length === 0 && !loading" severity="warn">Sem informações</Message>
            </template>

            <template #footer>
                <Paginator :template="{
                    '768px': 'PrevPageLink CurrentPageReport NextPageLink',
                    default: 'JumpToPageInput FirstPageLink PageLinks LastPageLink CurrentPageReport',
                }" :rows="rows" :totalRecords="tasks.length" :pageLinkSize="5" v-model:first="first" class="" />
            </template>

        </Card>

    </div>
</template>
