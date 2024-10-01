// **import Next
'use client'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** MUI import
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'

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
import { useState } from 'react'

// ** Images
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import GoogleSvg from '/public/svgs/google.svg'
import FacebookSvg from '/public/svgs/facebook.svg'

//** hooks
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

type TProps = {}

type TDefaultValues = {
  email: string
  password: string
}

const LoginPage: NextPage<TProps> = () => {
  // **state
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const [isRemember, setIsRemember] = useState(true)

  // ** context
  const { login } = useAuth()

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
      )
  })

  const defaultValues: TDefaultValues = {
    email: 'admin@gmail.com',
    password: 'Zxcvbnm123@'
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    if (!Object.keys(errors)?.length) {
      login({ ...data, rememberMe: isRemember }, err => {
        if (err?.response?.data?.typeError === 'INVALID') {
          toast.error('Email or password is incorrect')
        }
      })
    }
  }

  return (
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
          src={theme.palette.mode === 'light' ? LoginLight : LoginDark}
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
            Sign in
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
                    label='Password'
                    placeholder='Password'
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
                              <IconifyIcon
                                icon='material-symbols:visibility-outline'
                                style={{ color: theme.palette.primary.main }}
                              />
                            ) : (
                              <IconifyIcon
                                icon='material-symbols:visibility-off-outline'
                                style={{ color: theme.palette.primary.main }}
                              />
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

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='rememberMe'
                    checked={isRemember}
                    onChange={e => setIsRemember(e.target.checked)}
                    value='remember'
                    color='primary'
                  />
                }
                label='Remember me'
              />

              <Typography>Forgot password?</Typography>
            </Box>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography>Don't have an account?</Typography>
              <Link style={{ color: theme.palette.primary.main }} href='/register'>
                {'Sign up'}
              </Link>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
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
  )
}

export default LoginPage
