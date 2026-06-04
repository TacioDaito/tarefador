<script setup>
const { isAdmin, loggingOut } = useAuthState()
const { logout } = useLogoutAction()

const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    command: () => navigateTo('/dashboard'),
  },
  {
    label: 'Tarefas',
    icon: 'pi pi-list',
    command: () => navigateTo('/tasks'),
  },
])
</script>

<template>
  <div class="fixed top-6 w-2xs md:w-xl">
    <Menubar :model="items" :breakpoint="'768px'">
      <template #end>
        <Tag value="Administrador" v-if="isAdmin" severity="info" class="mr-2" />
        <Button label="Sair" icon="pi pi-sign-out" severity="secondary" size="small"
          :loading="loggingOut" @click="logout" />
      </template>
    </Menubar>
  </div>
</template>