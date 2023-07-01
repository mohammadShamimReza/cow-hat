import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import { User } from '../user/user.model';
import { IUserLogin } from './auth.interface';

const loginUser = async (LoginData: IUserLogin) => {
  const { phoneNumber, password } = LoginData;

  const isAdminExist = await User.isUserExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    isAdminExist.password &&
    !(await User.isPasswordValid(password, isAdminExist?.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not valid');
  }

  const { _id: adminId, role } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { adminId, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { adminId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = { loginUser };
