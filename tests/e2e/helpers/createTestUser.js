import { generateUniqueEmail } from './generateUniqueEmail.js'

/**
 * Creates a test user directly via the API.
 * Returns an object with user data and credentials.
 */
export async function createTestUser (request) {
  const baseURL = 'http://127.0.0.1'
  const email = generateUniqueEmail()
  const password = 'TestPass123!'

  // Step 1: Obtain CSRF cookie for Sanctum SPA authentication
  const csrfResponse = await request.get(`${baseURL}/sanctum/csrf-cookie`)
  if (!csrfResponse.ok()) {
    return { success: false, error: 'Failed to obtain CSRF token' }
  }

  // Step 2: Extract and decode XSRF-TOKEN from the Set-Cookie header
  const setCookie = csrfResponse.headers()['set-cookie'] || ''
  const xsrfMatch = setCookie.match(/XSRF-TOKEN=([^;]+)/)
  const xsrfToken = xsrfMatch ? decodeURIComponent(xsrfMatch[1]) : ''

  // Step 3: Create the user (route is in web.php, no /api prefix)
  const response = await request.post(`${baseURL}/user`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrfToken
    },
    data: {
      name: 'Test User',
      email,
      password,
      password_confirmation: password
    }
  })

  const body = await response.json()
  const success = response.ok()

  return {
    success,
    email,
    password,
    name: 'Test User',
    ...(success ? { user: body } : { error: body })
  }
}