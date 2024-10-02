// **import Next
'use client'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** MUI import
import { Box, Button, CssBaseline, IconButton, InputAdornment, Typography, useTheme } from '@mui/material'

//** component import  */
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'

// **form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// **config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** react
import { useEffect, useState } from 'react'

// ** redux
import { useDispatch, useSelector } from 'react-redux'

// ** Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'

// ** svg
import GoogleSvg from '/public/svgs/google.svg'
import FacebookSvg from '/public/svgs/facebook.svg'
import { registerAuthAsync } from 'src/stores/apps/auth/actions'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/apps/auth'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { t } from 'i18next'

type TProps = {}

type TDefaultValues = {
  email: string
  password: string
  confirmPassword: string
}

const RegisterPage: NextPage<TProps> = () => {
  // **state
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false)

  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth)

  // ** router
  const router = useRouter()

  // **theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .matches(EMAIL_REG, 'This field must be a valid email address'),
    password: yup
      .string()
      .required('This field is required')
      .matches(
        PASSWORD_REG,
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      ),
    confirmPassword: yup
      .string()
      .required('This field is required')
      .matches(
        PASSWORD_REG,
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      )
      .oneOf([yup.ref('password'), ''], 'Password and confirm password do not match.')
  })

  const defaultValues: TDefaultValues = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    if (Object.keys(errors).length) {
      dispatch(registerAuthAsync({ email: data.email, password: data.password }))
    }
  }

  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message)
      } else if (isSuccess) {
        toast.success(message)
        router.push(ROUTE_CONFIG.LOGIN)
      }
      dispatch(resetInitialState())
    }
  }, [isError, isSuccess, message])

  return (
    <>
      {isLoading && <FallbackSpinner />}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '2rem'
        }}
      >
        <Box
          sx={{
            display: { md: 'flex', xs: 'none' },
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            backgroundColor: theme.palette.customColors.bodyBg,
            height: '100%',
            minWidth: '50%'
          }}
        >
          <Image
            src={theme.palette.mode === 'light' ? RegisterDark : RegisterLight}
            alt='login image'
            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              {t('register')}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={{ mt: 2, width: '21rem' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      margin='normal'
                      required
                      fullWidth
                      label='Email'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Email'
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                />
              </Box>

              <Box sx={{ mt: 2, width: '21rem' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('password')}
                      placeholder={t('password')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.password)}
                      helperText={errors?.password?.message}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <IconifyIcon icon='material-symbols:visibility-outline' />
                              ) : (
                                <IconifyIcon icon='material-symbols:visibility-off-outline' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='password'
                />
              </Box>

              <Box sx={{ mt: 2, width: '21rem' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('confirm_password')}
                      placeholder={t('confirm_password')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.confirmPassword)}
                      helperText={errors?.confirmPassword?.message}
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                              {showConfirmPassword ? (
                                <IconifyIcon icon='material-symbols:visibility-outline' />
                              ) : (
                                <IconifyIcon icon='material-symbols:visibility-off-outline' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='confirmPassword'
                />
              </Box>

              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                {t('register')}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>{t('have_you_already_have_an_account')} </Typography>
                <Link style={{ color: theme.palette.primary.main }} href='/login'>
                  {t('log_in')}
                </Link>
              </Box>
              <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>{t('or')}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <IconButton>
                  <Image src={FacebookSvg} style={{ height: 27, width: 27 }} alt='facebook' />
                </IconButton>
                <IconButton>
                  <Image src={GoogleSvg} style={{ height: 25, width: 25 }} alt='google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default RegisterPage
