import api, { API_URL } from './config'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AuthResponse } from '../models/IAuth'
import { LoginData, UserProfile } from '../models/IUserProfile'

export class AuthService {
  static async login(
    LoginFormData: LoginData
  ): Promise<AxiosResponse<AuthResponse> | Error> {
    try {
      return await axios.post<AuthResponse>(
        `${API_URL}/auth/token-generate`,
        LoginFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async refreshBothTokens(
    refresh_token: string
  ): Promise<AxiosResponse<AuthResponse> | Error> {
    try {
      return await axios.post<AuthResponse>(
        `${API_URL}/auth/token-refresh`,
        { refresh_token },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async getUserProfile(): Promise<AxiosResponse<UserProfile> | Error> {
    try {
      return await api.get<UserProfile>('/profile')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }
}
