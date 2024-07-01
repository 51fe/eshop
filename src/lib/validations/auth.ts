import z, { object, string } from 'zod'
import { email } from '.'

const password = z
  .string({ required_error: 'Password is required' })
  .min(6, 'Password must be more than 6 characters')
  .max(32, 'Password must be less than 32 characters')

export const signInSchema = object({
  email,
  password: string({ required_error: 'Password is required' })
})

export const pwdSchema = z.object({
  password
})

export const updatePwdSchema = z.object({
  password,
  resetPasswordToken: string().min(1, 'Reset password token is required')
})

export const userIdSchema = object({
  id: string()
})

export const tokenSchema = object({
  token: string()
})

export type SignInInput = z.infer<typeof signInSchema>
export type PwdInput = z.infer<typeof pwdSchema>
export type UpdatePwdInput = z.infer<typeof updatePwdSchema>
export type TokenInput = z.infer<typeof tokenSchema>
export type UserIdInput = z.infer<typeof userIdSchema>
