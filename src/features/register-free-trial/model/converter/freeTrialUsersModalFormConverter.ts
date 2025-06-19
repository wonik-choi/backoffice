import { PromotionTermCode } from '@/entities/promotion/models/enums';
import { RentalTermCode } from '@/entities/rental/models/enums';
import { FreeTrialUserRequestDto } from '@/entities/free-trial-user/models/repository';

import { FreeTrialInOptional, FreeTrialUserRequestBody } from '@/features/register-free-trial/config/schema';
import { ClientCustomError } from '@/shared/lib/errors/errors';

export const freeTrialUsersModalFormConverter = (data: FreeTrialInOptional): FreeTrialUserRequestDto => {
  if (!data.user.grade || !data.freeTrial.semester || !data.inflow.code) {
    throw new ClientCustomError('학년과 학기, 유입경로는 필수 입력 항목입니다.');
  }

  const requestBody: FreeTrialUserRequestDto = {
    user: {
      name: data.user.name,
      parentName: data.user.parentName,
      parentPhoneNumber: data.user.parentPhoneNumber,
      phoneNumber: data.user.phoneNumber,
      grade: data.user.grade,
    },
    freeTrial: {
      startDate: data.freeTrial.startDate,
      semester: data.freeTrial.semester,
      schedules: data.freeTrial.schedules.map((schedule) => {
        // 하루 학습량 설정
        const todayLearningTime = Number(schedule.todayLearningTime);
        const hour = Number(schedule.startAt.hour);
        const minute = Number(schedule.startAt.minute);

        return {
          dayOfWeek: schedule.dayOfWeek,
          startAt: {
            hour: hour,
            minute: minute,
            timezone: schedule.startAt.timezone,
          },
          todayLearningTime: todayLearningTime,
        };
      }),
    },
    inflow: {
      code: data.inflow.code,
    },
  };

  // 약관 자동 동의
  // rental 존재 시
  if (data.rental && data.rental.address !== '') {
    const rental = {
      address: data.rental.address,
      detailAddress: data.rental.detailAddress,
      zonecode: data.rental.zonecode,
      addressType: data.rental.addressType,
      terms: [
        {
          termCode: RentalTermCode.RENTAL_001,
          agreed: true,
        },
      ],
    };
    requestBody.rental = rental;
  }

  // promotion 존재 시 (현재는 동아사이언스 프로모션만 존재)
  if (data.promotions && data.promotions[0].optionIds.length > 0) {
    const promotions = data.promotions.map((promotion) => {
      return {
        promotionCode: 'DONGASCIENCE_001', // 지정값을 받을 예정,
        optionIds: [Number(promotion.optionIds)],
        terms: [
          {
            termCode: PromotionTermCode.PROMOTION_001,
            agreed: true,
          },
        ],
      };
    });
    requestBody.promotions = promotions;
  }

  return requestBody;
};
