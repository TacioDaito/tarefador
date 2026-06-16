export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('sanctum:error:response', (ctx) => {
    const { message } = useAuthState()
    console.log(ctx.response?._data)
    message.value = ctx.response?._data?.message || 'Erro ao fazer login.'
  })
})
