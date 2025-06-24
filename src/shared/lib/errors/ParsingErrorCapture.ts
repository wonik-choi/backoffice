import {
  ServerErrorPayload,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  SimplifiedServerErrorPayload,
  UnknownError,
  ServerCustomError,
} from '@/shared/lib/errors/errors';

export class ParsingErrorCapture {
  private statusErrorMap: Record<number, new (payload: any, skipCapture?: boolean) => ServerCustomError> = {
    403: ForbiddenError,
    404: NotFoundError,
    500: InternalServerError,
  };

  /**
   * 서버에서 전달되는 직렬화된 error 를 파싱하고 예외처리를 합니다. (클라이언트 단에서 설정)
   * @param error 서버에서 전달되는 직렬화된 error 입니다.
   */
  public capture = (error: unknown) => {
    // 임시입니다.
    // 401 에러를 예외처리해줍니다.
    if (this.isUnauthorizedError(error)) {
      return new UnauthorizedError(error.error);
    }

    // 전달된 에러가 401도 아니면서 server 내 유형의 에러가 아닐경우 UnknownError 를 던집니다.
    if (!this.isSimplifiedServerError(error)) {
      if (error instanceof Error) {
        return new UnknownError(error, true);
      }
      return new UnknownError(new Error('Unexpected error payload'), true);
    }

    // 전달될 payload 의 타입을 지정합니다.
    const payload = error as ServerErrorPayload;

    // 설정된 에러 클래스를 mapping 합니다.
    const ErrorClass =
      this.statusErrorMap[payload.status] || (payload.status >= 500 ? InternalServerError : ServerCustomError);

    // 에러 클래스를 생성하고 던집니다.
    return payload.status >= 500 ? new ErrorClass(payload, true) : new ErrorClass(payload, false);
  };

  public isServerError(error: unknown): error is ServerErrorPayload {
    return typeof error === 'object' && error !== null && 'debug' in error;
  }

  public isSimplifiedServerError(error: unknown): error is SimplifiedServerErrorPayload {
    return typeof error === 'object' && error !== null && 'status' in error && 'message' in error && 'error' in error;
  }

  public isUnauthorizedError(error: unknown): error is { error: string } {
    return typeof error === 'object' && error !== null && 'error' in error && error.error === 'Unauthorized';
  }
}

export const parsingErrorCapture = new ParsingErrorCapture();
