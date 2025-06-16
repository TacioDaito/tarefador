<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import logoutAction from '../composables/logoutAction'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const { logout, loading } = logoutAction()
const router = useRouter()

const items = ref([
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => router.push({ name: 'dashboard' }),
    },
])
</script>

<template>
    <div class="fixed top-6 w-2xs md:w-xl">
        <Menubar :model="items" :breakpoint="'768px'">
            <template #end>
                <Button label="Logout" icon="pi pi-sign-out" class="p-button-secondary p-button-sm" :loading="loading"
                    @click="logout" />
            </template>
        </Menubar>
    </div>
</template>
