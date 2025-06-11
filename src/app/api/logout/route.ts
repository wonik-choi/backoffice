// File: app/api/login/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// app
import { splitSession } from '@/app/api/splitSession';

// shared
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';
import { ClientCustomError } from '@/shared/lib/errors/errors';

// features
import { loginSchema } from '@/features/authentication/config/schema';

// entities
import { authenticationRepository } from '@/entities/common/authentication/services/repositoryImpl';

export async function POST(request: NextRequest) {
  try {
    // 2) postLoginUsecase 호출
    const result = await authenticationRepository.postLogout();

    const session = result.headers.get('set-cookie');

    if (session) {
      console.log('session', session);
      const cookieStore = await cookies();

      const { sessionValue, httpOnly, secure, path, sameSite } = splitSession(session);

      if (!sessionValue) {
        const err = new ClientCustomError('session has not found in response');
        return NextResponse.json(err, { status: 401 });
      }

      cookieStore.set('SESSION', sessionValue, {
        httpOnly: httpOnly,
        secure: secure,
        maxAge: 0, // 즉시 삭제
        path: path,
        sameSite: sameSite as 'lax' | 'strict' | 'none',
      });
    } else {
      const cookieStore = await cookies();
      console.log('cookieStore', cookieStore);
      cookieStore.delete('SESSION');
    }

    // 3) 결과를 그대로 클라이언트에 반환
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (parsingErrorCapture.isServerError(error)) {
      const serverError = parsingErrorCapture.capture(error);
      return NextResponse.json(serverError);
    }

    return NextResponse.json(error, { status: 500 });
  }
}
