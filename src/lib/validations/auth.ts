import z, { object, string } from 'zod'

const password = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be more than 6 characters')
  .max(32, 'Password must be less than 32 characters')

const email = z.string().min(1, 'Email is required').email('Invalid email')

export const emailSchema = object({
  email
})

export const signInSchema = object({
  email,
  password: string().min(1, 'Password is required')
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
export type EmailInput = z.infer<typeof emailSchema>
export type PwdInput = z.infer<typeof pwdSchema>
export type UpdatePwdInput = z.infer<typeof updatePwdSchema>
export type TokenInput = z.infer<typeof tokenSchema>
export type UserIdInput = z.infer<typeof userIdSchema>
