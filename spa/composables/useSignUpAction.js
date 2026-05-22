import { ref, unref } from 'vue'

export const useSignUpAction = () => {
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const signUpLoading = ref(false)
  const signUpMessage = ref('')
  const { login } = useLoginAction(email, password)

  const onSubmit = async () => {
    signUpMessage.value = ''
    if (password.value !== confirmPassword.value) {
      signUpMessage.value = 'As senhas não coincidem.'
      return
    }
    signUpLoading.value = true
    const config = useRuntimeConfig()

    try {
      await $fetch('/user', {
        baseURL: config.public.apiUrl,
        method: 'POST',
        credentials: 'include',
        body: {
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: confirmPassword.value
        }
      })
      await login()
    } catch (error) {
      signUpMessage.value = error.data?.message || 'Erro ao registrar.'
    } finally {
      signUpLoading.value = false
    }
  }

  return {
    name,
    email,
    password,
    confirmPassword,
    loading: signUpLoading,
    message: signUpMessage,
    onSubmit
  }
}