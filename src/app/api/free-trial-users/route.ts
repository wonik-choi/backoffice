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

    /**
     * session 존재 여부에 따라 message 와 status 를 직접적으로 반환
     */
    if (!session) {
      const err = new ClientCustomError('session 이 존재하지 않습니다');
      return NextResponse.json(err, { status: 401 });
    }

    const headers = {
      'Content-Type': 'application/json',
      Cookie: `SESSION=${session}`,
      'Cache-Control': 'no-store',
    };

    const result = await freeTrialUserRepository.getFreeTrialUsers(requestDto, { headers });

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
