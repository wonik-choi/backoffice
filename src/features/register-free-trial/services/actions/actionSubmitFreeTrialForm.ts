import type { FreeTrialUserRequestDto } from '@/entities/free-trial-user/models/dtos';
import type {
  User,
  FreeTrial,
  Rental,
  Promotion,
  UserInStore,
  FreeTrialInStore,
} from '@/features/register-free-trial/config/schema';

import {
  freeTrialSchema,
  promotionSchema,
  rentalSchema,
  userSchema,
} from '@/features/register-free-trial/config/schema';

interface FreeTrialFormData {
  user: UserInStore;
  freeTrial: FreeTrialInStore;
  rental?: Rental;
  promotion?: Promotion;
}

export async function actionSubmitFreeTrialForm(formData: FreeTrialFormData) {
  const { user, freeTrial, rental, promotion } = formData;

  try {
    // 검증
    const validatedUser = userSchema.parse(user);
    const validatedFreeTrial = freeTrialSchema.parse(freeTrial);
    const validatedRental = rentalSchema.parse(rental);
    const validatedPromotion = promotionSchema.parse(promotion);

    const requestBody: FreeTrialUserRequestDto = {
      user: validatedUser,
      freeTrial: validatedFreeTrial,
      rental: validatedRental,
      promotion: validatedPromotion,
    };
    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // const data = await response.json()

    return { success: true, message: '성공적으로 제출되었습니다.' };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, message: '제출 중 오류가 발생했습니다. 다시 시도해주세요.' };
  }
}
