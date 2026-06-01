import { useCallback, useState, useEffect } from 'react'
import { useLoginMutation, useRegisterMutation, useLogout } from '../api/authApi'
import type { User } from '../types'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const loginMutation = useLoginMutation()
  const registerMutation = useRegisterMutation()
  const logout = useLogout()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await loginMutation.mutateAsync({ email, password })
        localStorage.setItem('access_token', response.access)
        localStorage.setItem('refresh_token', response.refresh)
        setUser({ 
          id: '', 
          email: response.email || email, 
          is_active: true, 
          is_staff: false, 
          date_joined: new Date().toISOString() 
        })
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
        throw error
      }
    },
    [loginMutation]
  )

  const register = useCallback(
    async (email: string, password: string) => {
      try {
        await registerMutation.mutateAsync({ email, password })
      } catch (error) {
        throw error
      }
    },
    [registerMutation]
  )

  const handleLogout = useCallback(() => {
    logout()
    setUser(null)
    setIsLoggedIn(false)
  }, [logout])

  return {
    user,
    isLoggedIn,
    login,
    register,
    logout: handleLogout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  }
}
