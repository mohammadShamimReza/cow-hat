import { IUserLogin } from './auth.interface';

const loginUser = (LoginData: IUserLogin) => {
  const { phoneNumber, password } = LoginData;
  console.log(phoneNumber, password);
};

export const authService = { loginUser };
