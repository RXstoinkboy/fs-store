import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('token'))
  const userRole = ref(localStorage.getItem('user_role'))

  const saveAuthData = (token, role) => {
    localStorage.setItem('token', `Bearer ${token}`)
    localStorage.setItem('user_role', role)
  }

  const retrieveAuthData = () => {
    const savedToken = localStorage.getItem('token')
    const savedRole = localStorage.getItem('user_role')
    if (savedToken) {
      isAuthenticated.value = Boolean(savedToken)
      userRole.value = savedRole
    }

    return { savedToken, savedRole }
  }

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_role')
    isAuthenticated.value = false
    userRole.value = null
  }

  const hasRole = (role) => userRole.value === role

  return { isAuthenticated, hasRole, saveAuthData, retrieveAuthData, signOut }
})
