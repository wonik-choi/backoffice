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
  DeleteFreeTrialUserRequestDto,
} from '@/entities/free-trial-user/models/repository';

export class FreeTrialUserRepositoryImpl implements FreeTrialUserRepository {
  constructor(private readonly httpAdaptor: HttpAdaptor) {}

  public createFreeTrialUser = async (request: FreeTrialUserRequestDto) => {
    const response = await this.httpAdaptor.post<FreeTrialApplicationsResponseDto>(
      `back-office/free-trial-application`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    return response.data;
  };

  public getFreeTrialUsers = async (
    request: GetFreeTrialUsersRequestDto,
    options?: { headers?: Record<string, string> }
  ) => {
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

    console.log('url', url);

    const response = await this.httpAdaptor.get<GetFreeTrialUsersResponseDto>(url, {
      ...options,
    });

    return response.data;
  };

  public getPromotions = async () => {
    const response = await this.httpAdaptor.get<GetFreeTrialPromotionsResponseDto>(
      `back-office/free-trial-application/promotions`
    );

    return response.data;
  };

  public deleteFreeTrialUser = async (
    request: DeleteFreeTrialUserRequestDto,
    options?: { headers?: Record<string, string> }
  ) => {
    const response = await this.httpAdaptor.delete(
      `back-office/free-trial-application?freeTrialUserId=${request.freeTrialUserId}`,
      {
        ...options,
      }
    );

    return response.data;
  };
}

// singleton
export const freeTrialUserRepository = new FreeTrialUserRepositoryImpl(httpAdaptor);
