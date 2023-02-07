import { EnumTypes } from 'enums/repo-type.enums';
import axiosClient from 'helpers/httpClient/axiosClient';
import serverClient from 'helpers/httpClient/serverClient';
import MainRepository from 'repository';
import { Login } from 'types/login.type';

class LoginRepository extends MainRepository<Login> {
  constructor() {
    super(EnumTypes.LOGIN);
  }

  async login(payload: any) {
    return await axiosClient.post('/api/auth/login', { ...payload });
  }
}

export default LoginRepository;
