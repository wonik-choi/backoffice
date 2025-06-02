import { HttpAdaptor, httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import {
  FreeTrialApplicationsResponseDto,
  GetFreeTrialPromotionsResponseDto,
  GetFreeTrialUsersResponseDto,
} from '@/entities/free-trial-user/models/dtos';
import {
  FreeTrialUserRepository,
  FreeTrialUserRequestDto,
  GetFreeTrialUsersRequestDto,
} from '@/entities/free-trial-user/models/repository';

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

  public getFreeTrialUsers = async (request: GetFreeTrialUsersRequestDto) => {
    let url = `back-office/free-trial-users?`;

    if (request.periodType) {
      url += `periodType=${request.periodType}&`;
    }

    if (request.baseDate) {
      url += `baseDate=${request.baseDate}&`;
    }

    if (request.timeZone) {
      url += `timeZone=${request.timeZone}&`;
    }

    if (request.page) {
      url += `page=${request.page}&`;
    }

    if (request.size) {
      url += `size=${request.size}&`;
    }

    const response = await this.httpAdaptor.get<GetFreeTrialUsersResponseDto>(url, 'ky');

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
