import { IUserLogin } from './auth.interface';

const loginUser = (LoginData: IUserLogin) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { phoneNumber, password } = LoginData;
};

export const authService = { loginUser };
