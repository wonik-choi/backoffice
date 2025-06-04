import * as Sentry from '@sentry/nextjs';

export interface ServerError {
  status: number;
  message: string;
  error: string;
  debug: {
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
 * @description 서버 내 에러 클래스
 */
export class ServerCustomError extends CustomError {
  public status: number;
  public message: string;
  public error: string;
  public debug: {
    exception: string;
    message: string;
  };

  constructor(payload: ServerError, skipCapture = false) {
    super(payload.debug.message, 'ServerCustomError');
    this.status = payload.status;
    this.message = payload.message;
    this.error = payload.error;
    this.debug = payload.debug;

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
        message: this.debug.message,
        environment: process.env.NODE_ENV,
      },
      level: 'error',
    });
  }
}

export class UnauthorizedError extends ServerCustomError {
  constructor(payload: ServerError) {
    super({ ...payload, status: 401 }, true);
    this.name = 'UnauthorizedError';
    this.message = payload.debug.message;

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug.message,
        environment: process.env.NODE_ENV,
      },
      level: 'warning',
    });
  }
}

export class ForbiddenError extends ServerCustomError {
  constructor(payload: ServerError) {
    super({ ...payload, status: 403 }, true);
    this.name = 'ForbiddenError';
    this.message = payload.debug.message;

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug.message,
        environment: process.env.NODE_ENV,
      },
      level: 'warning',
    });
  }
}

export class NotFoundError extends ServerCustomError {
  constructor(payload: ServerError) {
    super({ ...payload, status: 404 }, true);
    this.name = 'NotFoundError';
    this.message = payload.debug.message;

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug.message,
        environment: process.env.NODE_ENV,
      },
      level: 'info',
    });
  }
}

export class InternalServerError extends ServerCustomError {
  constructor(payload: ServerError) {
    super({ ...payload, status: 500 }, true);
    this.name = 'InternalServerError';
    this.message = payload.debug.message;

    this.captureSentry();
  }

  protected override captureSentry() {
    Sentry.captureException(this, {
      tags: {
        errorType: this.name,
        status: this.status,
        message: this.debug.message,
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
