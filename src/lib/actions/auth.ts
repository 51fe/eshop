'use server'

import { signIn } from '@/auth'
import { ResetPasswordEmail } from '@/components/email/reset-password'
import db from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { generateSecureToken, saltAndHashPassword } from '@/lib/utils'
import {
  emailSchema,
  signInSchema,
  updatePwdSchema,
  type EmailInput,
  type SignInInput,
  type UpdatePwdInput
} from '@/lib/validations/auth'
import { AuthError } from 'next-auth'
import { getUserByEmail, getUserByResetPasswordToken } from './user'

export async function login(rawInput: SignInInput) {
  try {
    const result = signInSchema.safeParse(rawInput)
    if (!result.success) {
      return 'missing-fields'
    }

    const { email, password } = result.data

    const existingUser = await getUserByEmail({ email })
    if (!existingUser) return 'not-registered'

    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    return 'success'
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return 'invalid-credentials'
      }
      return error.message
    }
    return 'Error signin in with password'
  }
}

export async function resetPassword(
  rawInput: EmailInput
): Promise<'invalid-input' | 'not-found' | 'error' | 'success'> {
  try {
    const { email } = await emailSchema.parseAsync(rawInput)
    if (!email) return 'invalid-input'

    const user = await getUserByEmail({ email })
    if (!user) return 'not-found'

    const today = new Date()
    const resetPasswordTokenExpiry = new Date(
      today.setDate(today.getDate() + 1)
    ) // 24 hours from now
    const token = generateSecureToken()
    const userUpdated = await db.user.update({
      where: {
        id: user.id
      },
      data: {
        resetPasswordToken: token,
        resetPasswordTokenExpiry
      }
    })

    const emailSent = await sendEmail(
      email,
      'Reset your password',
      ResetPasswordEmail({ email, token })
    )

    return userUpdated && emailSent ? 'success' : 'error'
  } catch (error) {
    console.error(error)
    return 'error'
  }
}

export async function updatePassword(
  rawInput: UpdatePwdInput
): Promise<'invalid-input' | 'not-found' | 'expired' | 'error' | 'success'> {
  try {
    const validatedInput = updatePwdSchema.safeParse(rawInput)
    const { password, resetPasswordToken } = validatedInput.data!

    const user = await getUserByResetPasswordToken({
      token: resetPasswordToken
    })
    if (!user) return 'not-found'

    const resetPasswordExpiry = user.resetPasswordTokenExpiry as Date
    if (!resetPasswordExpiry || resetPasswordExpiry < new Date())
      return 'expired'

    const passwordHash = await saltAndHashPassword(password)

    const userUpdated = await db.user.update({
      where: {
        id: user.id
      },
      data: {
        password: passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null
      }
    })

    return userUpdated ? 'success' : 'error'
  } catch (error) {
    console.error(error)
    throw new Error('Error updating password')
  }
}
