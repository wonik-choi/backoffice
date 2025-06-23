// shared
import { formatISOStringToKoreanTitle } from '@/shared/lib/date-fns/utls';

// entities
import type { TempUserDto } from '@/entities/temp-user/models/dtos';
import { inflowBehavior } from '@/entities/inflow/models/behaviors/InflowBehavior';

// views
import { ExpandedFreeTrialUsersTableRowData } from '@/views/temp-free-trial/models/interface';

export const tempFreeTrialUsersTableBodyConverter = (data: TempUserDto[]): ExpandedFreeTrialUsersTableRowData[] => {
  return data.map((user) => {
    const rowData: ExpandedFreeTrialUsersTableRowData = {
      /** 내부 데이터 */
      id: user.id,
      tempFreeTrialUserDto: user,

      /** 외부 데이터 */
      name: user.studentName,
      grade: user.grade,
      phone: user.callablePhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      createdAt: formatISOStringToKoreanTitle(user.createdAt, 'yyyy-MM-dd'),
      inflow: inflowBehavior.mapInflowToStatus(user.inflow.inflowSource),
    };

    return rowData;
  });
};
