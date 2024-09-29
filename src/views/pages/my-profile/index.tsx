// **import Next
'use client'
import { NextPage } from 'next'

// ** MUI import
import { Box, Button, Grid, IconButton, useTheme } from '@mui/material'
import { Avatar } from '@mui/material'

//** component import  */
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'

// **form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** react
import { useEffect, useState } from 'react'

// i18n
import { useTranslation } from 'react-i18next'

// components
import WrapperFileUpload from 'src/components/wrapper-file-upload'

//service
import { getAuthMe } from 'src/services/auth'

// **utils
import { fullNameSeparator, toFullName } from 'src/utils/toFullName'
import { convertToBase64 } from 'src/utils/convertImageToPage64'

// ** redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'
import { resetInitialState } from 'src/stores/apps/auth'
import { updateAuthMeAsync } from 'src/stores/apps/auth/actions'

// ** toast
import toast from 'react-hot-toast'

// **components
import FallbackSpinner from 'src/components/fall-back'
import Spinner from 'src/components/spinner'

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
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [roleId, setRoleId] = useState()

  // ** i18n
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  // **theme
  const theme = useTheme()

  // **redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector(
    (state: RootState) => state.auth
  )

  const schema = yup.object().shape({
    email: yup.string().notRequired(),
    fullName: yup.string().notRequired(),
    phoneNumber: yup.string().required('This field is required').min(8, 'This field must have at least 8 numbers'),
    role: yup.string().notRequired(),
    city: yup.string().notRequired(),
    address: yup.string().notRequired()
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

  const fetchGetAuthMe = async () => {
    setLoading(true)
    await getAuthMe()
      .then(async response => {
        setLoading(false)
        const data = response?.data
        if (data) {
          setRoleId(data?.role?._id)
          setAvatar(data?.avatar)
          reset({
            email: data?.email,
            address: data?.address,
            city: data?.city,
            phoneNumber: data?.phoneNumber,
            role: data?.role?.name,
            fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language)
          })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchGetAuthMe()
  }, [i18n.language])

  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
        fetchGetAuthMe()
      }
      dispatch(resetInitialState())
    }
  }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])

  const onSubmit = (data: any) => {
    const { firstName, lastName, middleName } = fullNameSeparator(data.fullName, i18n.language)
    dispatch(
      updateAuthMeAsync({
        email: data?.email,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        role: roleId,
        phoneNumber: data.phoneNumber,
        avatar,
        address: data.address
      })
    )
  }

  const handleUploadAvatar = async (file: File) => {
    const base64 = await convertToBase64(file)
    setAvatar(base64 as string)
  }

  return (
    <>
      {loading || (isLoading && <Spinner />)}
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
                  <Box sx={{ position: 'relative' }}>
                    {avatar && (
                      <IconButton
                        edge='start'
                        color='inherit'
                        sx={{
                          position: 'absolute',
                          bottom: -6,
                          right: -4,
                          zIndex: 1,
                          color: theme.palette.error.main
                        }}
                        onClick={() => setAvatar('')}
                      >
                        <IconifyIcon icon='mingcute:delete-2-line' />
                      </IconButton>
                    )}
                    {avatar ? (
                      <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                        <IconifyIcon icon='basil:user-outline' fontSize={60} />
                      </Avatar>
                    ) : (
                      <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                        <IconifyIcon icon='basil:user-outline' fontSize={60} />
                      </Avatar>
                    )}
                  </Box>
                  <WrapperFileUpload
                    uploadFunc={handleUploadAvatar}
                    objectAcceptFile={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png']
                    }}
                  >
                    <Button
                      variant='outlined'
                      sx={{
                        width: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1.5
                      }}
                    >
                      <IconifyIcon icon='noto:camera' style={{ transform: 'translateY(-0.2rem)' }} />
                      {avatar ? t('change_your_avatar') : t('upload_your_avatar')}
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
                    render={({ field: { value } }) => (
                      <CustomTextField
                        margin='normal'
                        required
                        fullWidth
                        label='Email'
                        disabled
                        value={value}
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
                    render={({ field: { value } }) => (
                      <CustomTextField
                        margin='normal'
                        required
                        fullWidth
                        label='Role'
                        value={value}
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
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        margin='normal'
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
                        fullWidth
                        label='Address'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder='Enter your address'
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
                        fullWidth
                        label='City'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder='Enter your city'
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
                        fullWidth
                        required
                        label='Phone Number'
                        onChange={e => {
                          const numValue = e.target.value.replace(/\D/g, '')
                          onChange(numValue)
                        }}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          minLength: 8
                        }}
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
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
            Update
          </Button>
        </Box>
      </form>
    </>
  )
}

export default MyProfilePage
