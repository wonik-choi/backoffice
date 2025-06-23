import { HttpAdaptor, httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import {
  GetTempFreeTrialUsersResponseDto,
  TempSelfFreeTrialApplicationResponseDto,
} from '@/entities/temp-user/models/dtos';
import {
  DeleteTempUserRequestDto,
  GetTempUsersRequestDto,
  TempUserRepository,
  TempUserRequestDto,
} from '@/entities/temp-user/models/repository';

export class TempUserRepositoryImpl implements TempUserRepository {
  constructor(private readonly httpAdaptor: HttpAdaptor) {}

  public createTempUser = async (request: TempUserRequestDto) => {
    const response = await this.httpAdaptor.post<TempSelfFreeTrialApplicationResponseDto>(
      `back-office/temp-self-free-trial-application`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  };

  public getTempUsers = async (request: GetTempUsersRequestDto, options?: { headers?: Record<string, string> }) => {
    let url = `back-office/temp-free-trial-users?`;
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

    const response = await this.httpAdaptor.get<GetTempFreeTrialUsersResponseDto>(url, {
      ...options,
    });

    return response.data;
  };

  public deleteTempUser = async (request: DeleteTempUserRequestDto, options?: { headers?: Record<string, string> }) => {
    return await this.httpAdaptor.delete(
      `back-office/temp-free-trial-users?tempFreeTrialUserId=${request.tempFreeTrialUserId}`,
      {
        ...options,
      }
    );
  };
}

// singleton
export const tempUserRepository = Object.freeze(new TempUserRepositoryImpl(httpAdaptor));
