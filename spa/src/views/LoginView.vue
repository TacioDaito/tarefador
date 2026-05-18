<script setup>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import Divider from 'primevue/divider'
import loginAction from '../composables/loginAction'

const { email, password, login, loading, message } = loginAction()
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <Card class="w-2xs md:w-sm">
            <template #title>
                <div class="mb-4">Login</div>
            </template>
            <template #content>
                <form @submit.prevent="login">
                    <FloatLabel variant="on">
                        <InputText id="email" v-model="email" type="email" inputId="email" fluid required autofocus />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="mb-6 mt-6">
                        <Password id="password" v-model="password" inputId="password" toggleMask :feedback="false" fluid
                            required />
                        <label for="password">Senha</label>
                    </FloatLabel>
                    <Button label="Login" type="submit" fluid :loading="loading" class="mb-2" />
                    <Divider />
                    <router-link :to="{ name: 'signup' }">
                        <slot>
                            <a class="cursor-pointer font-bold">Não tem conta? Clique aqui para criar uma!</a>
                        </slot>
                    </router-link>
                </form>
                <Message v-if="message" severity="primary" class="mt-6">{{ message }}</Message>
            </template>
        </Card>
    </div>
</template>
