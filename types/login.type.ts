import { MainRepositoryInterface } from "types/mainRepository.type";

export type Login = {
  email: string;
  password: string;
};

export interface LoginInterface extends MainRepositoryInterface {
  login: (data:any) => Promise<Login>
}
