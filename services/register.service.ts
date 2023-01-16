import { EnumTypes } from '../enums/repo-type.enums';
import RepositoryFactory from '../repository/repositoryFactory';
import axiosClient from 'helpers/httpClient/axiosClient';
import { RegisterInterface } from 'types/register.type';

class RegisterService {
    private static instance: RegisterService;
    private api: RegisterInterface;
    private constructor() {
      this.api = RepositoryFactory.get(EnumTypes.REGISTER) as unknown as RegisterInterface;
    }
  
    public static getInstance(): RegisterService {
      if (!RegisterService.instance) RegisterService.instance = new RegisterService();
      return RegisterService.instance;
    }

    public async getCountryCode() {
      const { data } = await axiosClient.get(`/api/country`);
      return data;
    } 

    public async registration(payload:any) {
      return this.api.create(payload);
    }

}

export default RegisterService.getInstance();