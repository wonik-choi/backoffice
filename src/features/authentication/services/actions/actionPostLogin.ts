'use server';

import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// features
import { LoginSchema } from '@/features/authentication/config/schema';
import { postLoginUsecase } from '@/features/authentication/services/usecase/postLoginUsecase';

// entities
import { authenticationRepository } from '@/entities/common/authentication/services/repositoryImpl';

export const parseSessionCookie = async (sessionCookie: string) => {
  const [value, ...options] = sessionCookie.split(';').map((option) => option.trim());
  const optionsMap: Partial<ResponseCookie> = {
    maxAge: 60 * 60 * 24 * 30,
  };

  options.forEach((option) => {
    const [key, value] = option.split('=').map((item) => item.trim());

    switch (key.toLowerCase()) {
      case 'httponly':
        optionsMap.httpOnly = true;
        break;
      case 'secure':
        optionsMap.secure = true;
        break;
      case 'samesite':
        optionsMap.sameSite = value.toLowerCase() as 'lax' | 'strict' | 'none';
        break;
      case 'path':
        optionsMap.path = value;
        break;
    }
  });

  return {
    name: value.split('=')[0],
    value: value.split('=')[1],
    ...optionsMap,
  };
};

/**
 * @description
 * login 요청 액션
 * @param formData login form
 */
export async function actionPostLogin(formData: LoginSchema) {
  const response = await postLoginUsecase(formData, authenticationRepository);

  const responseHeaders = response.headers;

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // headers 에 담겨있는 seesion cookie 를 브라우저에 저장하려고 합니다.
  const sessionCookie = responseHeaders.get('Set-Cookie');

  if (sessionCookie) {
    const parsedSessionCookie = await parseSessionCookie(sessionCookie);

    const cookieStore = await cookies();
    cookieStore.set(parsedSessionCookie.name, parsedSessionCookie.value, {
      httpOnly: parsedSessionCookie.httpOnly,
      secure: parsedSessionCookie.secure,
      maxAge: parsedSessionCookie.maxAge,
      path: parsedSessionCookie.path,
      sameSite: parsedSessionCookie.sameSite,
    });
  }

  return response.json();
}
