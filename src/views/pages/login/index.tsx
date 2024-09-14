// **import Next
'use client'
import { NextPage } from 'next'

// ** MUI import
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Typography
} from '@mui/material'

//** component import  */
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'

// **form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** react
import { useState } from 'react'

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false)

  const schema = yup
    .object()
    .shape({
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
    .required()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data: ', { data, errors })
  }

  return (
    <Container>
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
          <Box sx={{ mt: 2 }}>
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

          <Box sx={{ mt: 2 }}>
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
                  label='Password'
                  placeholder='password'
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

          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage
