import NextAuth from 'next-auth'
import bcryptjs from 'bcryptjs'
import authConfig from './config/auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './lib/actions/user'
import { signInSchema } from './lib/validations/auth'

export const { auth, handlers, signIn, signOut } = NextAuth({
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
            const passwordIsValid = await bcryptjs.compare(
              password,
              user.password
            )
            if (passwordIsValid) return user
          }
        }
        return null
      }
    })
  ]
})
