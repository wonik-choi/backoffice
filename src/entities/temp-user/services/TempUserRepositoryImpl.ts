import { HttpAdaptor, httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import { TempSelfFreeTrialApplicationResponseDto } from '@/entities/temp-user/models/dtos';
import { TempUserRepository, TempUserRequestDto } from '@/entities/temp-user/models/repository';

export class TempUserRepositoryImpl implements TempUserRepository {
  constructor(private readonly httpAdaptor: HttpAdaptor) {}

  public createTempUser = async (request: TempUserRequestDto) => {
    const response = await this.httpAdaptor.post<TempSelfFreeTrialApplicationResponseDto>(
      `back-office/temp-self-free-trial-application`,
      request,
      'ky'
    );

    return response;
  };
}

// singleton
export const tempUserRepository = new TempUserRepositoryImpl(httpAdaptor);
