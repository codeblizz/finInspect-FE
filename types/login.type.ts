export type Login = {
  email: string;
  password: string;
};

export interface LoginInterface {
  login: (data:any) => Promise<Login>
}
