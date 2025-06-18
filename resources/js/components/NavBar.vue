<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import logout from '../composables/logoutAction'
import { clientState, isAdmin } from '../stores/clientStateStore'

const router = useRouter()

const items = ref([
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => router.push({ name: 'dashboard' }),
    },
    {
        label: 'Tarefas',
        icon: 'pi pi-list',
        command: () => router.push({ name: 'tasks' }),
    },
])

</script>

<template>
    <div class="fixed top-6 w-2xs md:w-xl">
        <Menubar :model="items" :breakpoint="'768px'">
            <template #end>
                <Tag value="Administrador" v-if="isAdmin" class="p-tag-info p-tag-sm mr-2" />
                <Button label="Sair" icon="pi pi-sign-out" class="p-button-secondary p-button-sm"
                    :loading="clientState.loading" @click="logout" />
            </template>
        </Menubar>
    </div>
</template>
