import z from 'zod'

export const email = z
  .string({
    required_error: 'Email is required'
  })
  .email('Invalid email')

export const emailSchema = z.object({
  email
})

export type EmailInput = z.infer<typeof emailSchema>
