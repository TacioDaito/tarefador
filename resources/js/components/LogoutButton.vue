<script setup>
import Button from 'primevue/button'
import logoutAction from '../composables/logoutAction'

const { logout, loading } = logoutAction()
</script>

<template>
    <Button label="Logout" icon="pi pi-sign-out" class="p-button-danger" :loading="loading" @click="logout" />
</template>
