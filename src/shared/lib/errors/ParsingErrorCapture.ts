import {
  ServerError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  ServerCustomError,
} from '@/shared/lib/errors/errors';

export class ParsingErrorCapture {
  public capture = (error: ServerError) => {
    // 파싱된 에러를 캡쳐해준다.
    switch (error.status) {
      case 401:
        throw new UnauthorizedError(error);
      case 403:
        throw new ForbiddenError(error);
      case 404:
        throw new NotFoundError(error);
      case 500:
        throw new InternalServerError(error);
      default:
        if (error.status >= 500) {
          throw new InternalServerError(error);
        }
        throw new ServerCustomError(error);
    }
  };
}

export const parsingErrorCapture = new ParsingErrorCapture();
