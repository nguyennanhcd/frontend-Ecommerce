// **import Next
'use client'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** MUI import
import { Box, Button, Card, Grid, IconButton, InputAdornment, Typography, useTheme } from '@mui/material'

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
import GoogleSvg from '/public/svgs/google.svg'
import FacebookSvg from '/public/svgs/facebook.svg'
import { Avatar } from '@mui/material'

type TProps = {}

type TDefaultValues = {
  email: string
  password: string
  confirmPassword: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // **state
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false)

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
    console.log('data: ', { data, errors })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '15px',
          padding: 4
        }}
      >
        <Grid container spacing={5}>
          <Grid container item md={6} xs={12} spacing={5}>
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  {/* {user?.avatar ? (
                  <Image src={user?.avatar || ''} alt='user' style={{ height: 'auto', width: 'auto' }} />
                ) : ( */}
                  <IconifyIcon icon='basil:user-outline' />
                  {/* )} */}
                </Avatar>
                <Button variant='outlined' sx={{ width: 'auto' }}>
                  Upload Your Picture
                </Button>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
          </Grid>
          <Grid container item md={6} xs={12} spacing={5}>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
