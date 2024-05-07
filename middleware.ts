'use server'
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';

const publicRoutes = ['/'];

export default async function middleware(req: NextRequest) {
    try {
        const path = req.nextUrl.pathname;
        const sessionCookie = cookies().get('session')?.value;

        const session = await decrypt(sessionCookie);

        if (!session) {
            // If there is no session, redirect to the login page
            return NextResponse.redirect('/', { status: 307 });
        }

        // Construct the protected route dynamically based on the user's ID
        const protectedRoute = `/${session.userId}`;

        if (path !== protectedRoute) {
            // If it's not a protected route, redirect to the user's route
            return NextResponse.redirect(protectedRoute, { status: 307 });
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
