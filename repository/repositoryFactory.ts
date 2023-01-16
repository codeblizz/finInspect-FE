import LoginRepository from 'repository/user/login';
import RegisterRepository from 'repository/user/register';
import { EnumTypes } from './../enums/repo-type.enums';

class RepositoryFactory {
  get(name: EnumTypes) {
    switch (name) {
      case EnumTypes.REGISTER:
        return new RegisterRepository();
      case EnumTypes.LOGIN: 
        return new LoginRepository();
      case EnumTypes.DASHBOARD:
        return '/dashboard';
      default:
        break;
    }
  }
}

export default new RepositoryFactory();
