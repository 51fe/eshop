import crypto from 'crypto'
import { hash } from 'bcrypt-ts'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXTAUTH_URL}/${path}`
}

export async function saltAndHashPassword(password: string) {
  return await hash(password, 10)
}

export function generateSecureToken() {
  return crypto.randomBytes(32).toString('base64url')
}

export function defineFileSchema({
  size,
  formats
}: {
  size: number
  formats: string
}) {
  return z
    .instanceof(File, { message: 'Please select a file' })
    .refine((file) => file.size > 0, {
      message: 'Please select a file'
    })
    .refine((file) => file.size < size * 1024 * 1024, {
      message: `Max file size is ${size} MB`
    })
    .refine(
      (file) => file.size === 0 || formats.includes(file.name.slice(-3)),
      {
        message: `Only support ${formats}`
      }
    )
}
