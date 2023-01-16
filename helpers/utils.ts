import getConfig from 'next/config';
import { IError } from 'types/error.type';
const { publicRuntimeConfig } = getConfig();

const utils = {
  formatError: ({ error }: IError) => {
    const status = error.response.status;
    const msg = error.response.data.message;
    return {
      status,
      msg,
    };
  },
  moveUpSelectOptions: (options: any, value: any) => {
    options.unshift(
      options.splice(
        options.findIndex((item: any) => item?.value == value),
        1
      )[0]
    );
    return options;
  },
};

export default utils;
