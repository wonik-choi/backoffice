// shared
import { formatISOStringToKoreanTitle } from '@/shared/lib/date-fns/utls';

// entities
import type { FreeTrialUserDto } from '@/entities/free-trial-user/models/dtos';
import { freeTrialUserBehavior } from '@/entities/free-trial-user/models/behaviors/FreeTrialUserBehavior';

// views
import { ExpandedFreeTrialUsersTableRowData } from '@/views/free-trial/models/interface';

export const freeTrialUsersTableBodyConverter = (data: FreeTrialUserDto[]): ExpandedFreeTrialUsersTableRowData[] => {
  const now = new Date();

  return data.map((user) => {
    const {
      id,
      name,
      parentPhoneNumber: phone,
      latestEventHistory: { userEvent: latestEvent, createdAt: latestRecordAt },
      createdAt: registrationAt,
      inflow: { inflowSource },
      freeTrial: { startDate: trialStart, endDate: trialEnd, trialDays },
    } = user;

    const periodStart = new Date(trialStart);
    const periodEnd = new Date(trialEnd);

    let periodStatus: string;
    if (periodStart > now) {
      periodStatus = '미시작';
    } else if (periodEnd > now) {
      periodStatus = '진행중';
    } else {
      periodStatus = '종료';
    }

    if (user.rental) {
      const rentalStart = new Date(user.rental.rentalStartDate);
      const rentalEnd = new Date(user.rental.rentalReturnDate);

      let rentalStatus: string;
      if (rentalStart > now) {
        rentalStatus = '미대여';
      } else if (rentalEnd > now) {
        rentalStatus = '대여중';
      } else {
        rentalStatus = '반납기일 지남';
      }
    }

    return {
      id,
      name,
      phone: phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      status: freeTrialUserBehavior.mapFreeTrialUserEventToStatus(latestEvent),
      latestRecord: formatISOStringToKoreanTitle(latestRecordAt, 'yyyy-MM-dd'),
      registrationDate: formatISOStringToKoreanTitle(registrationAt, 'yyyy-MM-dd'),
      inflow: freeTrialUserBehavior.mapFreeTrialUserInflowToStatus(inflowSource),
      period: {
        startDate: formatISOStringToKoreanTitle(trialStart, 'yyyy-MM-dd'),
        endDate: formatISOStringToKoreanTitle(trialEnd, 'yyyy-MM-dd'),
        duration: `${trialDays}일`,
        status: periodStatus,
      },
    };
  });
};
