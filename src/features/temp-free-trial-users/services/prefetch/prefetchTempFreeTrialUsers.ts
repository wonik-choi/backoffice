// shared
import { formatKoreanTitle } from '@/shared/lib/date-fns/utls';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';

// entities
import { PeriodType } from '@/entities/free-trial-user/models/enums';
import { tempUserRepository } from '@/entities/temp-user/services/TempUserRepositoryImpl';

/**
 * @description 초기 필터
 */
export const prefetchTempFreeTrialUsersInitialFilter = {
  periodType: PeriodType.MONTH,
  baseDate: formatKoreanTitle(new Date(), 'yyyy-MM-dd'),
  timeZone: 'Asia/Seoul',
  page: 0,
  size: 10,
};

/**
 * @description 서버사이드 내 직접 호출
 * @param session - session
 * @returns GetTempFreeTrialUsersResponseDto
 */
export const prefetchTempFreeTrialUsers = async (session: string) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `SESSION=${session}`,
    },
  };

  try {
    const result = await tempUserRepository.getTempUsers(prefetchTempFreeTrialUsersInitialFilter, options);
    return result;
  } catch (error) {
    const customError = parsingErrorCapture.capture(error);
    throw customError;
  }
};
