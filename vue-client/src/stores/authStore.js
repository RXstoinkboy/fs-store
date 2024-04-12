import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('token'))

  const saveToken = (token) => {
    localStorage.setItem('token', `Bearer ${token}`)
  }

  const retrieveToken = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      isAuthenticated.value = Boolean(savedToken)
    }

    return savedToken
  }

  const signOut = () => {
    localStorage.removeItem('token')
    isAuthenticated.value = false
  }

  return { isAuthenticated, saveToken, retrieveToken, signOut }
})
