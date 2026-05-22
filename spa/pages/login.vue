<script setup>
definePageMeta({
  middleware: 'auth'
})

const { email, password, login, loading, message } = useLoginAction()

onMounted(() => {
  const passwordElement = document.querySelector('input[id="password"]')
  if (passwordElement) {
    passwordElement.setAttribute('autocomplete', 'current-password')
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-2xs md:w-sm">
      <template #title>
        <div class="mb-4">Login</div>
      </template>
      <template #content>
        <form @submit.prevent="login" autocomplete="on">
          <FloatLabel variant="on">
            <InputText id="email" v-model="email" type="email" inputId="email" autocomplete="username" fluid
              required autofocus />
            <label for="email">Email</label>
          </FloatLabel>
          <FloatLabel variant="on" class="mb-6 mt-6">
            <Password id="password" v-model="password" inputId="password" toggleMask :feedback="false" fluid
              required />
            <label for="password">Senha</label>
          </FloatLabel>
          <Button label="Login" type="submit" fluid :loading="loading" class="mb-2" />
          <Divider />
          <NuxtLink to="/signup">
            <span class="cursor-pointer font-bold">Não tem conta? Clique aqui para criar uma!</span>
          </NuxtLink>
        </form>
        <Message v-if="message" severity="primary" class="mt-6">{{ message }}</Message>
      </template>
    </Card>
  </div>
</template>