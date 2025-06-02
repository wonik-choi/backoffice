import { HttpAdaptor, httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import {
  FreeTrialApplicationsResponseDto,
  GetFreeTrialPromotionsResponseDto,
} from '@/entities/free-trial-user/models/dtos';
import { FreeTrialUserRepository, FreeTrialUserRequestDto } from '@/entities/free-trial-user/models/repository';

export class FreeTrialUserRepositoryImpl implements FreeTrialUserRepository {
  constructor(private readonly httpAdaptor: HttpAdaptor) {}

  public createFreeTrialUser = async (request: FreeTrialUserRequestDto) => {
    const response = await this.httpAdaptor.post<FreeTrialApplicationsResponseDto>(
      `back-office/free-trial-application`,
      request,
      'ky'
    );

    return response.data;
  };

  public getPromotions = async () => {
    const response = await this.httpAdaptor.get<GetFreeTrialPromotionsResponseDto>(
      `back-office/free-trial-application/promotions`,
      'ky'
    );

    return response.data;
  };
}

// singleton
export const freeTrialUserRepository = new FreeTrialUserRepositoryImpl(httpAdaptor);
