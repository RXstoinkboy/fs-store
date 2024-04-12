import { useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'

const signIn = async ({ email, password }) => {
  const res = await fetch('api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  if (res.status !== 200) {
    throw new Error('Invalid credentials')
  }

  return res.json()
}

export const useSignInMutation = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  return useMutation({
    mutationKey: 'signIn',
    mutationFn: ({ email, password }) => signIn({ email, password }),
    onSuccess: (res) => {
      authStore.isAuthenticated = true
      authStore.saveToken(res.token)

      const redirectPath = route.query.redirect || '/profile'
      router.push(redirectPath)
    }
  })
}
