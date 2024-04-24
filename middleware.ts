'use server'
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';

// Specify protected and public routes
const protectedRoutes = ['/MainPage'];
const publicRoutes = ['/'];

export default async function middleware(req: NextRequest) {
    try {
        const path = req.nextUrl.pathname;
        const isProtectedRoute = protectedRoutes.includes(path);
        const isPublicRoute = publicRoutes.includes(path);

        const cookie = cookies().get('session')?.value;
        const session = cookie ? await decrypt(cookie) : null;

        if (isProtectedRoute && !session?.userId) {
            return NextResponse.redirect(new URL('/', req.nextUrl))
        }

        if (
            isPublicRoute &&
            session?.userId &&
            !req.nextUrl.pathname.startsWith('/MainPage')
        ) {
            return NextResponse.redirect(new URL('/MainPage', req.nextUrl))
        }
    } catch (error) {
        console.error('Error in middleware:', error);
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
