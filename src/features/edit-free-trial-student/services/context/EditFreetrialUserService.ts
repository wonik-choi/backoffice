import { PatchFreeTrialSchema } from '@/features/edit-free-trial-student/config/schema';

export class EditFreeTrialUserService {
  /**
   * @description 초기값과 현재값을 비교하여 변경된 필드를 기반으로 객체를 생성합니다.
   * @param {PatchFreeTrialSchema} initialValues 초기값
   * @param {PatchFreeTrialSchema} currentValues 현재값
   *
   */
  public getDirtyFields = (
    initialValues: PatchFreeTrialSchema,
    currentValues: PatchFreeTrialSchema
  ): Partial<PatchFreeTrialSchema> => {
    // diff 를 활용해서 변경된 부분에 한하여 객체 생성
    return this.diff(initialValues, currentValues);
  };

  /**
   * @description 객체간의 비교를 통해 변경된 부분을 부분객체로 추출합니다.
   * @param initialValues
   * @param currentValues
   * @returns 부분객체
   */
  public diff = <T extends object>(initialValues: T, currentValues: T): Partial<T> => {
    const result: Partial<T> = {};

    for (const key of Object.keys(initialValues) as Array<keyof T>) {
      // 초기값과 현재값을 비교한다.
      const initValue = initialValues[key];
      const currentValue = currentValues[key];

      // id 는 초기값과 현재값이 같아도 patch 에 포함시켜주어야 하는 규칙
      if (key === 'id') {
        result[key] = initValue;
        continue;
      }

      // (원시값) 같다면 그냥 통과
      if (initValue === currentValue) {
        continue;
      }

      // 배열일 경우
      if (Array.isArray(initValue) && Array.isArray(currentValue)) {
        // 배열의 요소를 비교한다.
        if (JSON.stringify(initValue) !== JSON.stringify(currentValue)) {
          result[key] = currentValue;
          continue;
        }
      }

      // 객체일 경우
      if (initValue && currentValue && initValue instanceof Object && currentValue instanceof Object) {
        const diffResult = this.diff(initValue as object, currentValue as object) as Partial<T[typeof key]>;
        // 만일 return 값의 객체가 비어있지 않으면
        if (Object.keys(diffResult).length > 0) {
          // id 가 유일한 키라면 통과
          if (Object.keys(diffResult).length === 1 && 'id' in diffResult) {
            continue;
          }
          result[key] = diffResult as any;
        }
        // 적용시킨 뒤 다음으로 넘어간다.
        continue;
      }

      // 원시값일 경우
      result[key] = currentValue;
    }

    // id 가 유일한 키라면 빈 객체 반환
    if (Object.keys(result).length === 1 && 'id' in result) {
      return {};
    }

    return result;
  };
}

export const editFreeTrialUserService = new EditFreeTrialUserService();
