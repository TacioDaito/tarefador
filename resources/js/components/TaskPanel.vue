<script setup>
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Fieldset from 'primevue/fieldset'
import { defineProps, toRefs } from 'vue'
import taskAction from '../composables/taskAction'
import { taskPanelHelper } from '../composables/TaskPanelHelper'

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    openPanel: {
        type: [String, Number, null],
        required: false,
        default: null
    }
})

const { editTask, deleteTask } = taskAction()
const { editTitle, editDescription, isEditing, startEdit, cancelEdit, watchPanel } = taskPanelHelper(props.task, toRefs(props).openPanel)

watchPanel()

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
                    <InputText id="title" v-model="editTitle" class="w-full" :readonly="!isEditing" />
                    <label for="title">Título</label>
                </FloatLabel>

                <FloatLabel variant="on" class="mb-2">
                    <Textarea id="description" v-model="editDescription" class="w-full" rows="4" cols="30"
                        style="resize: none" :readonly="!isEditing" />
                    <label for="description">Descrição</label>
                </FloatLabel>

                <Fieldset legend="Participantes" class="text-xs" :toggleable="false">
                    <span v-if="task.users.length" class="space-x-1 text-sm">
                        <Chip v-for="user in task.users" :key="user.id">
                            {{ user.name }}
                        </Chip>
                    </span>
                    <span v-else class="text-xs text-gray-500">Nenhum participante</span>
                </Fieldset>

                <div class="flex justify-between mt-2">
                    <div class="flex gap-2">
                        <Button v-if="!isEditing" label="Editar" @click="startEdit" class="p-button-secondary"
                            icon="pi pi-pencil" />
                        <template v-else>
                            <Button label="Salvar"
                                @click="editTask(task.id, { title: editTitle, description: editDescription })"
                                class="p-button-success" icon="pi pi-save" />
                            <Button label="Cancelar" @click="cancelEdit" class="p-button-secondary"
                                icon="pi pi-times" />
                        </template>
                    </div>
                    <Button label="Deletar" @click="deleteTask(task.id)" class="p-button-danger" icon="pi pi-trash" />
                </div>

            </div>
        </AccordionContent>

    </AccordionPanel>
</template>
