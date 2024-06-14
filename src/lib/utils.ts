import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodSchema, z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXTAUTH_URL}${path}`
}

export async function saltAndHashPassword(password: string) {
  return await bcryptjs.hash(password, 10)
}

export function generateSecureToken() {
  return crypto.randomBytes(32).toString('base64url')
}

export function validate<T>(formData: FormData, formSchema: ZodSchema) {
  type FieldValue = z.infer<typeof formSchema>
  type FieldError = {
    [K in keyof FieldValue]: string
  }

  const resullt = formSchema.safeParse(Object.fromEntries(formData))
  const error: FieldError = {}
  // Return early if the form data is invalid
  if (resullt.success === false) {
    const errors = resullt.error.flatten().fieldErrors
    for (const [k, v] of Object.entries(errors)) {
      error[k] = v![0]
    }
  }
  const data: T = resullt.data
  return { data, error, success: resullt.success }
}

export async function sleep(ms = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms, 'done')
  })
}

export function defineFileSchema(
  { size, formats }: { size: number; formats: string },
  adding: boolean = true
) {
  return z
    .instanceof(File)
    .refine((file) => !adding || file.size > 0, {
      message: 'Please select a file'
    })
    .refine((file) => file.size < size * 1024 * 1024, {
      message: `Max file size is ${size} MB`
    })
    .refine(
      (file) => file.size === 0 || formats.includes(file.type.slice(-3)),
      {
        message: `Only support ${formats}`
      }
    )
}
