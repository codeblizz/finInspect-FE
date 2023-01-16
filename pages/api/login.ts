import serverClient from 'helpers/httpClient/serverClient';
import { EnumTypes } from '../../enums/repo-type.enums';
import utils from '../../helpers/utils';
import MainRepository from 'repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const loginHandler = nc<NextApiRequest, NextApiResponse>();
const url = `/api/auth/${EnumTypes.LOGIN}`;
const api = new MainRepository(url);

loginHandler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('request body', req.body);
  try {
    const result: any = await serverClient.post(url, { ...req.body });
    return res.send(result.data);
  } catch (error: any) {
    return utils.formatError(error);
  }
});
