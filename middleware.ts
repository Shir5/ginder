import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from './lib/session'

// 1. Specify protected and public routes
const publicRoutes = ['/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const cookie = cookies().get('session')?.value;

    // Decrypt the session
    const session = await decrypt(cookie) as { userId: number } | null;

    // If session is not present, redirect to public route
    if (!session && !isPublicRoute) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // Construct the protected route dynamically based on the user's ID
    const protectedRoute = session ? `/${session.userId}` : null;

    // If the requested route doesn't match the protected route, redirect to the user's route
    if (protectedRoute && path !== protectedRoute) {
        return NextResponse.redirect(new URL(protectedRoute, req.nextUrl));
    }

    // If the requested route is a public route or matches the protected route, allow access
    return NextResponse.next();
}


// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
