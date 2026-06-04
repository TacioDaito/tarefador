<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refreshTasks'])
const { user, isAdmin } = useAuthState()
const { isEditing, startEdit, cancelEdit, isAssigned, editableTask } = useTaskPanelHelper(props, emit)
const { editTask, deleteTask, handleAssign, handleUnassign } = useTaskAction(emit)

const isOwner = computed(() => {
  return props.task.created_by === user.value?.id
})
</script>

<template>
  <AccordionPanel :value="props.task.id">

    <AccordionHeader>
      <div class="flex justify-between space-x-3 items-center w-full">

        <h3 class="text-base md:text-lg font-semibold truncate flex-1 max-w-40 md:max-w-4xl">{{ task.title }}
        </h3>

        <span v-if="task.completed" class="space-x-1">
          <i class="pi pi-check" style="color:mediumspringgreen"></i>
          <span class="text-xs md:text-sm hidden md:inline font-bold text-emerald-500 ml-2">Completada</span>
        </span>

        <span class="space-x-1">
          <i class="pi pi-users"></i>
          <span class="text-xs md:text-sm font-bold mr-2">
            <span class="hidden md:inline">Participantes:</span>
            {{ task.users.length }}
          </span>
        </span>

      </div>
    </AccordionHeader>

    <AccordionContent>
      <div class="pt-4">
        <FloatLabel variant="on" class="mb-6">
          <InputText id="title" :modelValue="isEditing ? editableTask.title : task.title"
            @update:modelValue="val => isEditing && (editableTask.title = val)" class="w-full"
            :readonly="!isEditing" maxlength="100" minlength="1" />
          <label for="title">Título</label>
        </FloatLabel>

        <FloatLabel variant="on" class="mb-2">
          <Textarea id="description" :modelValue="isEditing ? editableTask.description : task.description"
            @update:modelValue="val => isEditing && (editableTask.description = val)" class="w-full" rows="4"
            cols="30" maxlength="1000" minlength="1" style="resize: none" :readonly="!isEditing" />
          <label for="description">Descrição</label>
        </FloatLabel>

        <Fieldset legend="Participantes" class="text-xs font-bold" :toggleable="false">
          <template v-if="!isAssigned">
            <Button label="Participar" severity="secondary" size="small" @click="handleAssign(task)" />
          </template>
          <template v-else>
            <Button label="Abandonar" severity="warn" size="small" @click="handleUnassign(task)" />
          </template>
          <span v-if="task.users.length" class="ml-2 text-sm space-x-1 space-y-1">
            <Chip v-for="user in task.users" :key="user.id" class="w-30">
              <span class="truncate">{{ user.name }}</span>
            </Chip>
          </span>
          <span v-else class="text-xs ml-2 text-gray-500">
            Nenhum participante
          </span>
        </Fieldset>

        <div class="my-8 flex items-center">
          <Checkbox :modelValue="isEditing ? editableTask.completed : task.completed"
            @update:modelValue="val => isEditing && (editableTask.completed = val)" :binary="true"
            inputId="completed" :disabled="!isEditing" />
          <label for="completed" class="ml-2">Completada</label>
        </div>

        <div class="flex justify-between mt-6">
          <div class="flex gap-2">
            <Button v-if="(isOwner || isAdmin) && !isEditing" label="Editar" @click="startEdit"
              severity="secondary" size="small" icon="pi pi-pencil" />
            <template v-else-if="(isOwner || isAdmin) && isEditing">
              <Button label="Salvar" @click="editTask(editableTask)" :disabled="!editableTask.title"
                severity="info" size="small" icon="pi pi-save" />
              <Button label="Cancelar" @click="cancelEdit" severity="secondary" size="small"
                icon="pi pi-times" />
            </template>
          </div>
          <Button v-if="(isOwner || isAdmin) && !isEditing" label="Deletar" @click="deleteTask(task)"
            severity="danger" size="small" icon="pi pi-trash" />
        </div>

      </div>
    </AccordionContent>

  </AccordionPanel>
</template>