import { HttpAdaptor, httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import { AuthenticationRepository, PostLoginRequestDto } from '@/entities/common/authentication/models/repository';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  constructor(private readonly httpAdaptor: HttpAdaptor) {}

  public postLogin = async (request: PostLoginRequestDto) => {
    const response = await this.httpAdaptor.post<{ result: string }>(`back-office/login`, request, 'fetch');

    return response;
  };

  public postLogout = async () => {
    const response = await this.httpAdaptor.post<{ result: string }>(`back-office/logout`, {}, 'fetch');

    return response;
  };
}

// singleton
export const authenticationRepository = new AuthenticationRepositoryImpl(httpAdaptor);
