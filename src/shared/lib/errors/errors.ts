import * as Sentry from '@sentry/nextjs';

export interface SimplifiedServerErrorPayload {
  status: number;
  message: string;
  error: string;
}

export interface ServerErrorPayload extends SimplifiedServerErrorPayload {
  debug?: {
    exception: string;
    message: string;
  };
}

export abstract class CustomError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }

  protected abstract captureSentry(): void;
}

/**
 * @description 간략화 된 서버 에러 클래스
 */
export class SimplifiedServerCustomError extends CustomError {
  public readonly status: number;
  public readonly error: string;

  constructor(payload: SimplifiedServerErrorPayload, skipCapture = false) {
    super(payload.message, 'SimplifiedServerCustomError');
    this.status = payload.status;
    this.error = payload.error;

    if (!skipCapture) {
      this.captureSentry();
    }
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        error: this.error,
        message: this.message,
        environment: process.env.NODE_ENV,
      },
      level: 'error',
    });
  }
}

/**
 * @description 서버 내 에러 클래스
 */
export class ServerCustomError extends SimplifiedServerCustomError {
  public readonly debug?: {
    exception: string;
    message: string;
  };

  constructor(payload: ServerErrorPayload, skipCapture = false) {
    // SlimplifiedServerCustomError의 생성자 호출
    super(
      {
        status: payload.status,
        message: payload.message,
        error: payload.error,
      },
      skipCapture
    );

    // ServerCustomError만의 추가 속성
    this.debug = payload.debug;
    this.name = 'ServerCustomError'; // 이름 재정의
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        error: this.error,
        message: this.debug ? this.debug.message : this.message, // debug.message 사용
        environment: process.env.NODE_ENV,
      },
      level: 'error',
    });
  }
}

export class UnauthorizedError extends ServerCustomError {
  constructor(payload: string) {
    super({ status: 401, error: payload, message: payload }, true);
    this.name = 'UnauthorizedError';

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug ? this.debug.message : this.message,
        environment: process.env.NODE_ENV,
      },
      level: 'warning',
    });
  }
}

export class ForbiddenError extends ServerCustomError {
  constructor(payload: ServerErrorPayload) {
    super({ ...payload, status: 403 }, true);
    this.name = 'ForbiddenError';

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug ? this.debug.message : this.message,
        environment: process.env.NODE_ENV,
      },
      level: 'warning',
    });
  }
}

export class NotFoundError extends ServerCustomError {
  constructor(payload: ServerErrorPayload) {
    super({ ...payload, status: 404 }, true);
    this.name = 'NotFoundError';

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug ? this.debug.message : this.message,
        environment: process.env.NODE_ENV,
      },
      level: 'info',
    });
  }
}

export class InternalServerError extends ServerCustomError {
  constructor(payload: ServerErrorPayload) {
    super({ ...payload, status: 500 }, true);
    this.name = 'InternalServerError';

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug ? this.debug.message : this.message,
        environment: process.env.NODE_ENV,
      },
      level: 'error',
    });
  }
}

export class ClientCustomError extends CustomError {
  constructor(message: string, skipCapture = false) {
    super(message, 'ClientCustomError');

    if (!skipCapture) {
      this.captureSentry();
    }
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        message: this.message,
        environment: process.env.NODE_ENV,
      },
      level: 'error',
    });
  }
}

export class UnknownError extends CustomError {
  constructor(payload: Error, skipCapture = false) {
    super(payload.message, 'UnknownError');

    if (!skipCapture) {
      this.captureSentry();
    }
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        message: this.message,
        environment: process.env.NODE_ENV,
      },
      level: 'error',
    });
  }
}
