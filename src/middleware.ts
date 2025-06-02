import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get('SESSION')?.value;

  /**
   * 백오피스 (server)경로는 세션 검사를 하지 않습니다.
   */
  if (pathname.startsWith('/backoffice')) {
    return NextResponse.next();
  }

  /**
   * 보호가 필요한 경로 목록은 다음과 같습니다.
   * 전달받은 patchname 이 해당 경로에 해당하는지 확인합니다.
   *  */
  const protectedRoutes = ['/home', '/free-trial'];
  const isProtected =
    protectedRoutes.some((route) => pathname === route) ||
    protectedRoutes.some((route) => pathname.startsWith(`${route}/`));

  /**
   * 세션이 없는 경우에는 로그인 페이지로 리다이렉트 합니다.
   */
  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  /**
   * 세션이 존재하지만 login 페이지에 접근하였을 경우 home 으로 리다이렉트 합니다.
   */
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  /**
   * 나머지의 경우 통과합니다.
   */
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
