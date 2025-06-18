import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import type {
  DeleteFreeTrialUserRequestDto,
  PatchFreeTrialUserRequestDto,
} from '@/entities/free-trial-user/models/repository';

import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';
import { ClientCustomError } from '@/shared/lib/errors/errors';

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const requestDto: PatchFreeTrialUserRequestDto = await request.json();
    const freeTrialUserId = searchParams.get('freeTrialUserId') as string;

    const session = request.cookies.get('SESSION')?.value;

    if (!session) {
      const err = new ClientCustomError('session 이 존재하지 않습니다');
      return NextResponse.json(err, { status: 401 });
    }

    const headers = {
      'Content-Type': 'application/json',
      Cookie: `SESSION=${session}`,
      'Cache-Control': 'no-store',
    };

    const result = await freeTrialUserRepository.patchFreeTrialUser(requestDto, freeTrialUserId, { headers });

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const requestDto: DeleteFreeTrialUserRequestDto = {
      freeTrialUserId: searchParams.get('freeTrialUserId') as string,
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

    const result = await freeTrialUserRepository.deleteFreeTrialUser(requestDto, { headers });

    // 3) 결과를 그대로 클라이언트에 반환
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.log('error', error);
    if (parsingErrorCapture.isUnauthorizedError(error)) {
      return NextResponse.json(error, { status: 401 });
    }

    if (parsingErrorCapture.isSimplifiedServerError(error)) {
      return NextResponse.json(error, { status: error.status });
    }

    return NextResponse.json(error, { status: 500 });
  }
}
