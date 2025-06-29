'use client'

import {
  Button,
  TextField,
  Typography,
} from '@mui/material'
import {
  FormProvider,
  useForm,
} from 'react-hook-form'

import type { SignUpSchema } from '@/features/auth/types'

export const SignUpForm = () => {
  const methods = useForm<SignUpSchema>()

  return (
    <FormProvider {...methods}>
      <form>
        <Typography variant="h4">Sign Up</Typography>
        <TextField
          label="Email"
          type="email"
          {...methods.register('email')}
        />
        <TextField
          label="Password"
          type="password"
          {...methods.register('password')}
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </FormProvider>
  )
}
