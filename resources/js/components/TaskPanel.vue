<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Fieldset from 'primevue/fieldset'
import taskAction from '../composables/taskAction'
import taskPanelHelper from '../composables/taskPanelHelper'
import clientState from '../stores/clientState'

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

const emit = defineEmits(['refreshTasks'])
const { isEditing, startEdit, cancelEdit } = taskPanelHelper(props, emit)
const { editTask, deleteTask, handleAssign, handleUnassign } = taskAction(emit)

const isAssigned = ref(false)



watch(
    () => [props.task.users, clientState.user],
    () => {
        if (clientState.user) {
            isAssigned.value = props.task.users.some(u => u.id === clientState.user.id)
        } else {
            isAssigned.value = false
        }
    },
    { immediate: true, deep: true }
)
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
                    <InputText id="title" v-model="task.title" class="w-full" :readonly="!isEditing" />
                    <label for="title">Título</label>
                </FloatLabel>

                <FloatLabel variant="on" class="mb-2">
                    <Textarea id="description" v-model="task.description" class="w-full" rows="4" cols="30"
                        style="resize: none" :readonly="!isEditing" />
                    <label for="description">Descrição</label>
                </FloatLabel>

                <Fieldset legend="Participantes" class="text-xs font-bold" :toggleable="false">
                    <template v-if="!isAssigned">
                        <Button label="Participar" class="p-button-sm" @click="handleAssign(task)" />
                    </template>
                    <template v-else>
                        <Button label="Abandonar" class="p-button-sm p-button-warn" @click="handleUnassign(task)" />
                    </template>
                    <span v-if="task.users.length" class="ml-2 text-sm">
                        <Chip v-for="user in task.users" :key="user.id">
                            {{ user.name }}
                        </Chip>
                    </span>
                    <span v-else class="text-xs ml-2 text-gray-500">
                        Nenhum participante
                    </span>
                </Fieldset>

                <div class="flex justify-between mt-6">
                    <div class="flex gap-2">
                        <Button v-if="!isEditing" label="Editar" @click="startEdit"
                            class="p-button-secondary p-button-sm" icon="pi pi-pencil" />
                        <template v-else>
                            <Button label="Salvar" @click="editTask(task)" :disabled="!task.title || !task.description"
                                class="p-button-Info p-button-sm" icon="pi pi-save" />
                            <Button label="Cancelar" @click="cancelEdit" class="p-button-secondary p-button-sm"
                                icon="pi pi-times" />
                        </template>
                    </div>
                    <Button v-if="!isEditing" label="Deletar" @click="deleteTask(task)"
                        class="p-button-danger p-button-sm" icon="pi pi-trash" />
                </div>

            </div>
        </AccordionContent>

    </AccordionPanel>
</template>
