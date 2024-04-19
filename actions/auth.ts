import { NextRequest, NextResponse } from 'next/server';
import { parseCookies } from 'nookies';
export function authMiddleware(req: NextRequest, res: NextResponse) {
  const { token } = parseCookies({ req });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Check if the token is valid and associated with a user in your database
  // You can use the token to fetch the user's information from your database

  // Continue with the request if the user is authenticated
  return NextResponse.next();
}
