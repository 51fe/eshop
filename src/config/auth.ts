import { type NextAuthConfig } from 'next-auth'

export default {
  pages: {
    signIn: '/login'
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isProtected = nextUrl.pathname.startsWith('/admin')
      if (isProtected) {
        return !!auth?.user
      }
      return true
    }
  }
} satisfies NextAuthConfig
