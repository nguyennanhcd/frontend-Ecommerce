// ** axios
import axios from 'axios'

// **config
import { BASE_URL, CONFIG_API } from 'src/configs/api'

// ** storage
import {
  clearLocalUserData,
  clearTemporaryToken,
  getLocalUserData,
  getTemporaryToken,
  setLocalUserData,
  setTemporaryToken
} from '../storage'

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
  clearTemporaryToken()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { setUser, user } = useAuth()

  instanceAxios.interceptors.request.use(async config => {
    const { accessToken, refreshToken } = getLocalUserData()
    const { temporaryToken } = getTemporaryToken()

    if (accessToken || temporaryToken) {
      let decodeAccessToken: any = {}
      if (accessToken) {
        decodeAccessToken = jwtDecode(accessToken)
      } else if (temporaryToken) {
        decodeAccessToken = jwtDecode(temporaryToken)
      }

      if (decodeAccessToken?.exp && decodeAccessToken.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken ? accessToken : temporaryToken}`
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
                const newAccessToken = res?.data?.data?.access_token
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`
                  if (accessToken) {
                    setLocalUserData(JSON.stringify(user), newAccessToken, refreshToken)
                  } else {
                    setLocalUserData(JSON.stringify(user), '', refreshToken)
                    setTemporaryToken(newAccessToken)
                  }
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
