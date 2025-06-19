// entities
import { PatchFreeTrialUserRequestDto } from '@/entities/free-trial-user/models/repository';

// features
import { PatchFreeTrialSchema } from '@/features/edit-free-trial-student/config/schema';

const pickDefined = <T extends Record<string, any>>(object: T): Partial<T> => {
  // fromEntries 는 ['a', 'b'] -> { a: b } 로 변경해주는 api
  return Object.fromEntries(Object.entries(object).filter(([_, value]) => value !== undefined)) as Partial<T>;
};

export const patchFreeTrialUserRequestDtoConverter = (
  data: Partial<PatchFreeTrialSchema>
): PatchFreeTrialUserRequestDto => {
  const requestDto: PatchFreeTrialUserRequestDto = {};

  if (data.user) {
    const userFields = pickDefined({
      name: data.user.name,
      phoneNumber: data.user.phoneNumber ? data.user.phoneNumber : undefined,
      parentName: data.user.parentName,
      parentPhoneNumber: data.user.parentPhoneNumber,
      grade: data.user.grade,
    });

    if (Object.keys(userFields).length > 0) {
      requestDto.user = userFields;
    }
  }

  if (data.freeTrial) {
    const freeTrialFields = pickDefined({
      startDate: data.freeTrial.startDate,
      schedules: data.freeTrial.schedules,
      semester: data.freeTrial.semester ? data.freeTrial.semester : undefined,
    });

    if (Object.keys(freeTrialFields).length > 0) {
      requestDto.freeTrial = freeTrialFields;
    }
  }

  if (data.rental) {
    const rentalFields = pickDefined({
      zonecode: data.rental.zonecode,
      address: data.rental.address,
      detailAddress: data.rental.detailAddress,
      addressType: data.rental.addressType,
      terms: data.rental.terms,
    });

    if (Object.keys(rentalFields).length > 0) {
      requestDto.rental = rentalFields;
    }
  }

  if (data.inflow) {
    const inflowFields = pickDefined({
      code: data.inflow.code,
    });

    if (Object.keys(inflowFields).length > 0) {
      requestDto.inflow = inflowFields;
    }
  }

  return requestDto;
};
