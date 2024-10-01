// ** config
import { ACCESS_TOKEN, REFRESH_TOKEN, TEMPORARY_TOKEN, USER_DATA } from 'src/configs/auth'

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    return {
      userData: window.localStorage.setItem(USER_DATA, userData),
      accessToken: window.localStorage.setItem(ACCESS_TOKEN, accessToken),
      refreshToken: window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
    }
  }
}

export const getLocalUserData = () => {
  if (typeof window !== 'undefined') {
    return {
      userData: window.localStorage.getItem(USER_DATA),
      accessToken: window.localStorage.getItem(ACCESS_TOKEN),
      refreshToken: window.localStorage.getItem(REFRESH_TOKEN)
    }
  }

  return {
    userData: null,
    accessToken: null,
    refreshToken: null
  }
}

export const clearLocalUserData = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(USER_DATA)
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
  }
}

export const setTemporaryToken = (accessToken: string) => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: window.localStorage.setItem(TEMPORARY_TOKEN, accessToken)
    }
  }
}

export const getTemporaryToken = () => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: window.localStorage.getItem(ACCESS_TOKEN)
    }
  }

  return {
    userData: null,
    accessToken: null,
    refreshToken: null
  }
}

export const clearL = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(USER_DATA)
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
  }
}
