// TODO: 현 위치 내에서 schema 가 정의되어야 할지 고민중
// request 에 대한 schema 정의가 필요할지, 아닐지...
export interface PostLoginRequestDto {
  username: string;
  password: string;
}

export interface AuthenticationRepository {
  postLogin: (request: PostLoginRequestDto) => Promise<Response>;
  postLogout: () => Promise<Response>;
}
