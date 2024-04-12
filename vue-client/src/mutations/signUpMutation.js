import { useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const signUp = async ({ email, password }) => {
  const res = await fetch('api/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  if (res.status !== 201) {
    throw new Error('User already exists')
  }

  return res.json()
}

export const useSignUpMutation = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationKey: 'signUp',
    mutationFn: ({ email, password }) => signUp({ email, password }),
    onSuccess: (res) => {
      authStore.isAuthenticated = true
      authStore.userRole = res.role
      authStore.saveAuthData(res.token, res.role)

      router.push({ name: 'profile' })
    }
  })
}
