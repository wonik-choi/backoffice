import { GetFreeTrialPromotionsResponseDto } from './dtos';

/** repository */

export interface PromotionRepository {
  getPromotions: () => Promise<GetFreeTrialPromotionsResponseDto>;
}
