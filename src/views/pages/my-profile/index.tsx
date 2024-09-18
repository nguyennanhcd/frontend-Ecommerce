// **import Next
'use client'
import { NextPage } from 'next'

// ** MUI import
import { Box, Button, Grid, useTheme } from '@mui/material'

//** component import  */
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'

// **form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// **config
import { EMAIL_REG } from 'src/configs/regex'

// ** react
import { useEffect, useState } from 'react'

import { Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { useAuth } from 'src/hooks/useAuth'
import Image from 'next/image'

type TProps = {}

type TDefaultValues = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // **state
  const { user } = useAuth()

  // **theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .matches(EMAIL_REG, 'This field must be a valid email address'),
    fullName: yup.string().required('This field is required'),
    city: yup.string().required('This field is required'),
    phoneNumber: yup.string().required('This field is required'),
    address: yup.string().required('This field is required'),
    role: yup.string().required('This field is required')
  })

  const defaultValues: TDefaultValues = {
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
    role: '',
    fullName: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (user) {
      reset({
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        fullName: '',
        role: user?.role?.name
      })
    }
  })

  const onSubmit = (data: any) => {
    console.log('data: ', { data, errors })
  }

  const { t } = useTranslation()

  const handleUploadAvatar = (file: File) => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
      <Grid container spacing={5}>
        <Grid container item md={6} xs={12}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px !important',
              py: 5,
              px: 4
            }}
          >
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
                  {user?.avatar ? (
                    <Image src={user?.avatar || ''} alt='user' style={{ height: 'auto', width: 'auto' }} />
                  ) : (
                    <IconifyIcon icon='basil:user-outline' fontSize={60} />
                  )}
                </Avatar>
                <WrapperFileUpload
                  uploadFunc={handleUploadAvatar}
                  objectAcceptFile={{
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': ['.png']
                  }}
                >
                  <Button
                    variant='outlined'
                    sx={{ width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}
                  >
                    <IconifyIcon icon='noto:camera' style={{ transform: 'translateY(-0.2rem)' }} />
                    {t('upload_your_avatar')}
                  </Button>
                </WrapperFileUpload>
              </Box>
            </Grid>
            <Grid container item spacing={5}>
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
                      placeholder='Enter Your Email'
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
                      label='Role'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Enter Your Role'
                      disabled
                      error={Boolean(errors?.role)}
                      helperText={errors?.role?.message}
                    />
                  )}
                  name='role'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid container item md={6} xs={12} mt={{ md: 0, xs: 5 }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px !important',
              py: 5,
              px: 4
            }}
            marginLeft={{ md: 5, xs: 0 }}
          >
            <Grid container spacing={5}>
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
                      label='Full Name'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Enter your full name'
                      error={Boolean(errors?.fullName)}
                      helperText={errors?.fullName?.message}
                    />
                  )}
                  name='fullName'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      margin='normal'
                      required
                      fullWidth
                      label='Address'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Enter your address'
                      error={Boolean(errors?.address)}
                      helperText={errors?.address?.message}
                    />
                  )}
                  name='address'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      margin='normal'
                      required
                      fullWidth
                      label='City'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Enter your city'
                      error={Boolean(errors?.city)}
                      helperText={errors?.city?.message}
                    />
                  )}
                  name='city'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      margin='normal'
                      required
                      fullWidth
                      label='Phone Number'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Enter your phone number'
                      error={Boolean(errors?.phoneNumber)}
                      helperText={errors?.phoneNumber?.message}
                    />
                  )}
                  name='phoneNumber'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
