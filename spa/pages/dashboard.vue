<script setup>
definePageMeta({
  middleware: 'auth'
})

const { tasks, loading, getTasks, createTask } = useTaskAction()
const { first, rows, pagedItems: pagedTasks, updateRows } = useResponsivePagination(tasks)
const { user } = useAuthState()

onMounted(() => {
  getTasks({ assignedOrOwnedByUser: user.value?.id })
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
          <Button label="Criar" icon="pi pi-plus" severity="success" @click="createTask" />
        </div>
        <Divider />
      </template>

      <template #content>
        <div v-show="loading">
          <Skeleton height="3rem" class="mb-2" v-for="n in 3" :key="n" />
        </div>
        <div v-show="tasks.length && !loading">
          <Accordion>
            <TaskPanel v-for="task in pagedTasks" :key="task.id" :task="task" :value="task.id"
              @refreshTasks="getTasks({ assignedOrOwnedByUser: user?.id })" />
          </Accordion>
        </div>
        <Message v-show="tasks.length === 0 && !loading" severity="warn">Sem informações</Message>
      </template>

      <template #footer>
        <Paginator :template="{
          '768px': 'PrevPageLink CurrentPageReport NextPageLink',
          default: 'JumpToPageInput FirstPageLink PageLinks LastPageLink CurrentPageReport',
        }" :rows="rows" :totalRecords="tasks.length" :pageLinkSize="5" v-model:first="first" />
      </template>

    </Card>

  </div>
</template>