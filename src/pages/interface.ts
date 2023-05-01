export interface IFormLogin {
  email: string;
  password: string;
}

export interface ILoginState {
  isUserExisted: boolean;
  user: string;
  accessToken?: string;
}
