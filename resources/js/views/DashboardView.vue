<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'
import Message from 'primevue/message'
import clientState from '../stores/clientState'
import NavBar from '../components/NavBar.vue'

const user = computed(() => clientState.user)
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <NavBar/>
        <Card class="w-2xs md:w-sm">
            <template #title>
                <div v-if="user" class="mb-4">Welacome, {{ user.name }}</div>
            </template>
            <template #content>
                <div v-if="user">
                    <span v-if="user.email_verified_at">
                        Your email is verified
                        <i class="pi pi-check ml-2" style="color: aquamarine"></i>
                    </span>
                    <span v-else>
                        Your email is unverified
                        <i class="pi pi-exclamation-triangle ml-2" style="color: salmon"></i>
                    </span>
                </div>
                <Message v-else severity="warn">No user information available.</Message>
            </template>
        </Card>
    </div>
</template>
