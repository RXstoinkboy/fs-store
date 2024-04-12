import { useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const signOut = (token) =>
  fetch('api/auth/sign-out', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })

export const useSignOutMutation = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationKey: 'signOut',
    mutationFn: () => signOut(authStore.retrieveToken()),
    onSuccess: () => {
      router.push({ name: 'home' })
      authStore.signOut()
    }
  })
}
