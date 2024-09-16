// ** React Imports
import { Router, useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { AuthContext } from 'src/contexts/AuthContext'
import { clearLocalUserData } from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  // props
  const { children, fallback } = props

  // ** router
  const router = useRouter()

  // ** auth
  const authContext = useAuth()
  console.log('authContext', authContext)
  useEffect(() => {
    if (!router.isReady) return
    if (window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(USER_DATA)) {
      router.replace('/')
    }
  }, [router.route])

  if (authContext.loading) {
    return fallback
  }
  return <>{children}</>
}

export default GuestGuard
