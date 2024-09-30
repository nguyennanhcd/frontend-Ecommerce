// ** axios
import axios from 'axios'

// **config
import { BASE_URL, CONFIG_API } from 'src/configs/api'

// ** storage
import { clearLocalUserData, getLocalUserData } from '../storage'

// ** jwt
import { jwtDecode } from 'jwt-decode'

// ** react
import React, { FC } from 'react'

// ** next
import { NextRouter, useRouter } from 'next/router'

// ** types
import { UserDataType } from 'src/contexts/types'

// ** hooks
import { useAuth } from 'src/hooks/useAuth'

type TAxiosInterceptor = {
  children: React.ReactNode
}

const instanceAxios = axios.create({ baseURL: BASE_URL })

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  clearLocalUserData()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { setUser } = useAuth()

  instanceAxios.interceptors.request.use(async config => {
    const { accessToken, refreshToken } = getLocalUserData()
    if (accessToken) {
      const decodeAccessToken = jwtDecode(accessToken)

      // Check if accessToken is valid
      if (decodeAccessToken?.exp && decodeAccessToken.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        console.log('Access token expired, attempting to refresh token...')
        if (refreshToken) {
          const decodeRefreshToken = jwtDecode(refreshToken)
          console.log('Decoded refreshToken:', decodeRefreshToken)

          // Check if refreshToken is valid
          if (decodeRefreshToken?.exp && decodeRefreshToken.exp > Date.now() / 1000) {
            await axios
              .post(
                `${CONFIG_API.AUTH.INDEX}/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(res => {
                console.log('Refresh token response:', res)
                const newAccessToken = res?.data?.data?.accessToken
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`
                  localStorage.setItem('accessToken', newAccessToken)
                } else {
                  handleRedirectLogin(router, setUser)
                }
              })
              .catch(e => {
                handleRedirectLogin(router, setUser)
              })
          } else {
            handleRedirectLogin(router, setUser)
          }
        } else {
          handleRedirectLogin(router, setUser)
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }
    return config
  })

  instanceAxios.interceptors.response.use(config => config)

  return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptor }
