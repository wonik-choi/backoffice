// shared
import { formatISOStringToKoreanTitle, getDifferenceInDays } from '@/shared/lib/date-fns/utls';

// entities
import type { FreeTrialUserDto } from '@/entities/free-trial-user/models/dtos';
import { inflowBehavior } from '@/entities/inflow/models/behaviors/InflowBehavior';
import { eventHistoryBehavior } from '@/entities/event-history/models/behaviors/EventHistoryBehavior';

// views
import { ExpandedFreeTrialUsersTableRowData } from '@/views/free-trial/models/interface';

export const freeTrialUsersTableBodyConverter = (data: FreeTrialUserDto[]): ExpandedFreeTrialUsersTableRowData[] => {
  const now = new Date();

  return data.map((user) => {
    const rowData: ExpandedFreeTrialUsersTableRowData = {
      /** 내부 데이터 */
      id: user.id,
      freeTrialUserDto: user,
      daysLeft: 0,

      /** 외부 데이터 */
      name: user.name,
      status: eventHistoryBehavior.mapFreeTrialUserEventToStatus(user.latestEventHistory.userEvent),
      phone: user.parentPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      latestRecord: formatISOStringToKoreanTitle(user.latestEventHistory.createdAt, 'yyyy-MM-dd'),
      registrationDate: formatISOStringToKoreanTitle(user.createdAt, 'yyyy-MM-dd'),
      inflow: inflowBehavior.mapInflowToStatus(user.inflow.inflowSource),
      period: {
        startDate: formatISOStringToKoreanTitle(user.freeTrial.startDate, 'yyyy-MM-dd'),
        endDate: formatISOStringToKoreanTitle(user.freeTrial.endDate, 'yyyy-MM-dd'),
        duration: `${user.freeTrial.trialDays}일`,
        status: '',
        daysLeft: '',
      },
    };

    // 체험 기간 상태 계산
    const periodStart = new Date(user.freeTrial.startDate);
    const periodEnd = new Date(user.freeTrial.endDate);

    if (periodStart > now) {
      rowData.period.status = '미시작';
    } else if (periodEnd > now) {
      rowData.period.status = '진행중';
    } else {
      rowData.period.status = '종료';
    }

    // 시작일까지 남은 일수 계산
    const daysLeft = getDifferenceInDays(periodStart, now);
    rowData.daysLeft = daysLeft;
    if (daysLeft > 0) {
      rowData.period.daysLeft = `${daysLeft}일`;
    } else if (daysLeft === 0) {
      rowData.period.daysLeft = '오늘';
    } else {
      rowData.period.daysLeft = '초과';
    }

    return rowData;
  });
};
