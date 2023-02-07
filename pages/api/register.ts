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
  try {
    const result = await serverClient.post(url, { ...req.body.params });
    return res.send({ message: result.data.message, status: result.status });
  } catch (error: any) {
    return res.send({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export default registerHandler;
