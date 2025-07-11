// File: app/api/login/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// app
import { splitSession } from '@/app/api/splitSession';

// shared
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';
import { ClientCustomError, UnauthorizedError } from '@/shared/lib/errors/errors';

// features
import { loginSchema } from '@/features/authentication/config/schema';

// entities
import { authenticationRepository } from '@/entities/common/authentication/services/repositoryImpl';

export async function POST(request: NextRequest) {
  try {
    // 1) 클라이언트가 보낸 JSON 바디 파싱
    const body = await request.json();

    const validatedBody = loginSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(new ClientCustomError('zod: invalid login form data'));
    }

    // 2) postLoginUsecase 호출
    const result = await authenticationRepository.postLogin(validatedBody.data);

    const session = result.headers.get('set-cookie');

    if (session) {
      const cookieStore = await cookies();

      const { sessionValue, httpOnly, secure, path, sameSite } = splitSession(session);

      if (!sessionValue) {
        const err = new ClientCustomError('session has not found in response');
        return NextResponse.json(err, { status: 401 });
      }

      cookieStore.set('SESSION', sessionValue, {
        httpOnly: httpOnly,
        secure: secure,
        maxAge: 60 * 60 * 24 * 30, // 30일
        path: path,
        sameSite: sameSite as 'lax' | 'strict' | 'none',
      });
    }

    // 3) 결과를 그대로 클라이언트에 반환
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (parsingErrorCapture.isUnauthorizedError(error)) {
      return NextResponse.json(error, { status: 401 });
    }

    if (parsingErrorCapture.isSimplifiedServerError(error)) {
      return NextResponse.json(error, { status: error.status });
    }

    return NextResponse.json(error, { status: 500 });
  }
}
