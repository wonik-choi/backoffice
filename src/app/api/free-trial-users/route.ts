import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import type { GetFreeTrialUsersRequestDto } from '@/entities/free-trial-user/models/repository';

import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';
import { PeriodType } from '@/entities/free-trial-user/models/enums';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';
import { ClientCustomError } from '@/shared/lib/errors/errors';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const requestDto: GetFreeTrialUsersRequestDto = {
      periodType: searchParams.get('periodType') as PeriodType,
      baseDate: searchParams.get('baseDate') as string,
      timeZone: searchParams.get('timeZone') as string,
      page: Number(searchParams.get('page')),
      size: Number(searchParams.get('size')),
    };

    const session = request.cookies.get('SESSION')?.value;
    console.log('free-trial-users', session);

    if (!session) {
      return NextResponse.json(new ClientCustomError('session 이 존재하지 않습니다'));
    }

    const headers = {
      'Content-Type': 'application/json',
      Cookie: `SESSION=${session}`,
    };

    const result = await freeTrialUserRepository.getFreeTrialUsers(requestDto, { headers });

    // 3) 결과를 그대로 클라이언트에 반환
    return NextResponse.json(result);
  } catch (error: any) {
    if (parsingErrorCapture.isServerError(error)) {
      const serverError = parsingErrorCapture.capture(error);
      return NextResponse.json(serverError);
    }

    return NextResponse.json(error);
  }
}
