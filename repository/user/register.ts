import { EnumTypes } from 'enums/repo-type.enums';
import axiosClient from 'helpers/httpClient/axiosClient';
import MainRepository from 'repository';
import { RegisterProps } from 'types/register.type';

class RegisterRepository extends MainRepository<RegisterProps> {
  constructor() {
    super(EnumTypes.REGISTER);
  }

  // async registerUser(data: any) {
  //   return await axiosClient.post('/api/register', { data });
  // }

}

export default RegisterRepository;
