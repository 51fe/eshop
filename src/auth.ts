import NextAuth from 'next-auth'
import { compare } from 'bcrypt-ts'
import authConfig from './config/auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './lib/actions/user'
import { signInSchema } from './lib/validations/auth'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials)
        if (email && password) {
          const user = await getUserByEmail({
            email
          })
          if (user?.password) {
            const passwordIsValid = await compare(password, user.password)
            if (passwordIsValid) return user
          }
        }
        return null
      }
    })
  ]
})
