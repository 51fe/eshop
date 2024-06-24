import NextAuth from 'next-auth'
import authConfig from '@/config/auth'

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: '/admin/:path*'
}
