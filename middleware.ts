import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from './lib/session'

// 1. Specify protected and public routes
const protectedRoutes = ['/MainPage']
const publicRoutes = ['/']

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Decrypt the session from the cookie
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)

    // 5. Redirect to  if the user is not authenticated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    // 6. Redirect to /MainPage if the user is authenticated
    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/MainPage')
    ) {
        
        return NextResponse.redirect(new URL('/MainPage', req.nextUrl))
    }
    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}