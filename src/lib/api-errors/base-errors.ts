import { constants } from 'node:http2';

export class BaseError<DetailsType = never, MetaType = never> {
  errorCode: string;
  message: string;
  statusCode: number;

  details?: DetailsType;
  metadata?: MetaType;

  constructor(
    message: string,
    errorCode: string,
    statusCode: number,
    details?: DetailsType,
    metadata?: MetaType
  ) {
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.details = details;
    this.metadata = metadata;
  }
}

export class ServerError<DetailsType = never> extends BaseError<DetailsType> {
  constructor(message: string, errorCode: string, details?: DetailsType) {
    super(
      message,
      errorCode,
      constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      details
    );
  }
}
