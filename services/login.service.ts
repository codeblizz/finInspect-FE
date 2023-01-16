import LoginRepository from "repository/user/login";
import RepositoryFactory from "repository/repositoryFactory";
import { EnumTypes } from "enums/repo-type.enums";
import { LoginInterface } from "types/login.type";

class LoginService {
    private static instance: LoginService;
    private api: LoginInterface;
    private constructor () {
        this.api = RepositoryFactory.get(EnumTypes.LOGIN) as unknown as LoginInterface
    }

    public static getInstance(): LoginService {
        if(!LoginService.instance) LoginService.instance = new LoginService();
        return LoginService.instance;
    }

    public async login(credentials:any) {
        return await this.api.login(credentials);
    }
}

export default LoginService.getInstance();