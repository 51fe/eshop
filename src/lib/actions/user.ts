'use server'

import db from '@/lib/db'
import { emailSchema, type EmailInput } from '@/lib/validations'
import { tokenSchema, type TokenInput } from '@/lib/validations/auth'

export async function getUserByEmail(rawInput: EmailInput) {
  try {
    const { email } = await emailSchema.parseAsync(rawInput)
    if (!email) return null

    return await db.user.findUnique({
      where: {
        email
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Error getting user by email')
  }
}

export async function getUserByResetPasswordToken(rawInput: TokenInput) {
  try {
    const { token } = await tokenSchema.parseAsync(rawInput)
    if (!token) return null

    return await db.user.findUnique({
      where: {
        resetPasswordToken: token
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Error getting user by reset password token')
  }
}
