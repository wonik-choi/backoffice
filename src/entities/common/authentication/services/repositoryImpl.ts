import { HttpAdaptor, httpAdaptor } from '@/shared/lib/https/HttpAdapter';

// entities
import { AuthenticationRepository, PostLoginRequestDto } from '@/entities/common/authentication/models/repository';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  constructor(private readonly httpAdaptor: HttpAdaptor) {}

  // 임시입니다.
  public postLogin = async (request: PostLoginRequestDto) => {
    const params = new URLSearchParams();
    params.append('username', request.username);
    params.append('password', request.password);

    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}back-office/login`, {
    //   method: 'POST',
    //   body: params.toString(),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    //   credentials: 'include',
    // });
    const response = await this.httpAdaptor.post<{ result: string; error: string }>(
      `back-office/login`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        credentials: 'include',
      }
    );

    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  };

  public postLogout = async () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}back-office/logout`, {
    //   method: 'POST',
    //   credentials: 'include',
    // });
    const response = await this.httpAdaptor.post<{ result: string; error: string }>(`back-office/logout`, {
      credentials: 'include',
    });

    return response;
  };
}

// singleton
export const authenticationRepository = new AuthenticationRepositoryImpl(httpAdaptor);
