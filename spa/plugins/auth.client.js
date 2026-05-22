export default defineNuxtPlugin(async () => {
  const { restoreAuth } = useRestoreAuth()
  await restoreAuth()
})