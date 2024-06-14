'use server'

import db from '@/lib/db'
import {
  emailSchema,
  tokenSchema,
  type EmailInput,
  type TokenInput
} from '@/lib/validations/auth'
import { type User } from '@prisma/client'

export async function getUserByEmail(
  rawInput: EmailInput
): Promise<User | null> {
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

export async function getUserByResetPasswordToken(
  rawInput: TokenInput
): Promise<User | null> {
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
