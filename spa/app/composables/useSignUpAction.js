import { ref } from 'vue'

export const useSignUpAction = () => {
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const signUpLoading = ref(false)
  const signUpMessage = ref('')
  const client = useSanctumClient()
  const { login } = useLoginAction(email, password)

  const signUp = async () => {
    signUpMessage.value = ''
    if (password.value !== confirmPassword.value) {
      signUpMessage.value = 'As senhas não coincidem.'
      return
    }
    signUpLoading.value = true

    try {
      await client('/user', {
        method: 'POST',
        body: {
          name: unref(name), email: unref(email),
          password: unref(password), password_confirmation: unref(confirmPassword)
        }
      })
      await login()
    } catch (error) {
      signUpMessage.value = error || 'Erro ao registrar.'
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
    signUp
  }
}
