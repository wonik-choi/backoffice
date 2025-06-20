import { HttpAdaptor, httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import { GetFreeTrialPromotionsResponseDto } from '@/entities/promotion/models/dtos';
import { PromotionRepository } from '@/entities/promotion/models/repository';

export class PromotionRepositoryImpl implements PromotionRepository {
  constructor(private readonly httpAdaptor: HttpAdaptor) {}

  public getPromotions = async () => {
    const response = await this.httpAdaptor.get<GetFreeTrialPromotionsResponseDto>(
      `back-office/free-trial-application/promotions`
    );

    return response.data;
  };
}

// singleton
export const promotionRepository = new PromotionRepositoryImpl(httpAdaptor);
