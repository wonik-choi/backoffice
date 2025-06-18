// shared
import { decodeISOString } from '@/shared/lib/date-fns/utls';

// features
import { PatchFreeTrialSchema } from '@/features/edit-free-trial-student/config/schema';

// view
import { ExpandedFreeTrialUsersTableRowData } from '@/views/free-trial/models/interface';

export const initialEditDialogFormConverter = (rowData: ExpandedFreeTrialUsersTableRowData) => {
  const initialValues: PatchFreeTrialSchema = {
    user: {
      name: rowData.name,
      parentName: rowData.freeTrialUserDto.parentName,
      parentPhoneNumber: rowData.freeTrialUserDto.parentPhoneNumber,
      grade: rowData.freeTrialUserDto.grade,
      phoneNumber: rowData.freeTrialUserDto.phoneNumber,
    },
    freeTrial: {
      startDate: rowData.freeTrialUserDto.freeTrial.startDate,
      schedules: rowData.freeTrialUserDto.freeTrial.schedules.map((schedule) => {
        const startDate = decodeISOString(schedule.startTime);
        const startHour = startDate.getHours();
        const startMinute = startDate.getMinutes();

        return {
          dayOfWeek: schedule.dayOfWeek,
          startAt: {
            hour: startHour,
            minute: startMinute,
            timezone: 'Asia/Seoul',
          },
          todayLearningTime: schedule.todayLearningTime,
        };
      }),
      semester: rowData.freeTrialUserDto.freeTrial.semester,
    },
    rental: {
      address: '',
      zonecode: '',
      addressType: 'R',
      detailAddress: '',
      terms: [],
    },
    inflow: {
      code: rowData.freeTrialUserDto.inflow.code,
    },
  };

  // rental 존재
  if (rowData.freeTrialUserDto.rental) {
    initialValues.rental = {
      address: rowData.freeTrialUserDto.rental.address,
      detailAddress: rowData.freeTrialUserDto.rental.detailAddress,
      zonecode: rowData.freeTrialUserDto.rental.zonecode,
      addressType: rowData.freeTrialUserDto.rental.addressType,
      terms: [],
    };
  }

  return initialValues;
};
