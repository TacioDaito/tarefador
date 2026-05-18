<script setup>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import signUpAction from '../composables/signUpAction'

const {
    name,
    email,
    password,
    confirmPassword,
    loading,
    message,
    onSubmit
} = signUpAction()
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <Card class="w-2xs md:w-sm">
            <template #title>
                <div class="mb-4">Criar Conta</div>
            </template>
            <template #content>
                <form @submit.prevent="onSubmit">
                    <FloatLabel variant="on" class="mb-6">
                        <InputText id="name" v-model="name" type="text" inputId="name" fluid required autofocus />
                        <label for="name">Nome</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="mb-6">
                        <InputText id="email" v-model="email" type="email" inputId="email" fluid required />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="mb-6">
                        <Password id="password" v-model="password" inputId="password" toggleMask :feedback="false" fluid
                            required />
                        <label for="password">Senha</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="mb-6">
                        <Password id="confirmPassword" v-model="confirmPassword" inputId="confirmPassword" toggleMask
                            :feedback="false" fluid required />
                        <label for="confirmPassword">Confirmar Senha</label>
                    </FloatLabel>
                    <Button label="Registrar" type="submit" fluid :loading="loading" class="mb-2" />
                </form>
                <router-link :to="{ name: 'login' }">
                    <Button label="Voltar" severity="secondary" outlined fluid class="mt-2" />
                </router-link>
                <Message v-if="message" severity="primary" class="mt-6">{{ message }}</Message>
            </template>
        </Card>
    </div>
</template>
