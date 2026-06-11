export const useContactAction = () => {
  const name = ref('')
  const email = ref('')
  const message = ref('')
  const loading = ref(false)
  const success = ref(false)
  const response = ref('')

  const send = async () => {
    response.value = ''
    success.value = false
    loading.value = true

    console.log(message.value, email.value, name.value)

    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: {
          name: unref(name),
          email: unref(email),
          message: unref(message)
        }
      })
      success.value = true
      response.value = 'Mensagem enviada com sucesso!'
      name.value = ''
      email.value = ''
      message.value = ''
    } catch (error) {
      if (error?.data?.errors) {
        const errors = Object.values(error.data.errors).flat()
        response.value = errors.join('. ')
      } else {
        response.value =
          error?.data?.message || 'Erro ao enviar mensagem. Tente novamente.'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    name,
    email,
    message,
    loading,
    success,
    response,
    send
  }
}
