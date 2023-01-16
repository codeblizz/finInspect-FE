export type errorMsgType = {
    message: string
}

export type errorType = {
    status: string;
    data: errorMsgType;
}

export type errorResponseType = {
    response: errorType;
}

export interface IError {
  error: errorResponseType;
}
