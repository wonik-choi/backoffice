import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('SESSION');

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/free-trial', '/free-trial/:path*'],
};
