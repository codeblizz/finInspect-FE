import serverClient from 'helpers/httpClient/serverClient';
import utils from './../../helpers/utils';
import MainRepository from 'repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { EnumTypes } from 'enums/repo-type.enums';

const registerHandler = nc<NextApiRequest, NextApiResponse>();
const url = `/api/auth/${EnumTypes.REGISTER}`;
const api = new MainRepository(url);

registerHandler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('next connect handler', req.body.params);
  try {
    const result:any = await serverClient.post(url, { ...req.body.params });
    return res.send(result.data);
  } catch (error:any) {
    return utils.formatError(error);
  }
});

export default registerHandler;
