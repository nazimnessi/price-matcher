import { useMutation } from '@tanstack/react-query'
import apiClient from '@/shared/api/apiClient'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await apiClient.post<LoginResponse>('/auth/login/', data)
      return response.data
    },
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<RegisterResponse> => {
      const response = await apiClient.post<RegisterResponse>('/auth/register/', data)
      return response.data
    },
  })
}

export const useLogout = () => {
  return () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}
