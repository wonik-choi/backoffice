// shared
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import { FreeTrialApplicationsResponseDto } from '@/entities/free-trial-user/models/dtos';

import { freeTrialUserRequestBodySchema } from '@/features/register-free-trial/config/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedBody = freeTrialUserRequestBodySchema.safeParse(body);

    // 만일 schema 검증에 실패한다면 에러를 반환한다.
    if (!validatedBody.success) {
      return NextResponse.json({ errors: validatedBody.error.format() }, { status: 400 });
    }

    // 검증에 성공한다면 서버에 제출해준다.
    const response = await httpAdaptor.post<FreeTrialApplicationsResponseDto>(
      `back-office/free-trial-applications`,
      validatedBody.data,
      'fetch'
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // 추후 에러처리
    throw error;
  }
}
