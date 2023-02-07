export type errorMsgType = {
    message: string
    status?: boolean
}

export type errorType = {
    status: boolean;
    data: errorMsgType;
}

export type errorResponseType = {
    data: errorMsgType;
    response: errorType;
}

export interface IError {
  error: errorResponseType;
}
