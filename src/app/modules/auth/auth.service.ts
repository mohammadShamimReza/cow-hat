import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import { Iuser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IUserLogin } from './auth.interface';

const loginUser = async (LoginData: IUserLogin) => {
  const { phoneNumber, password } = LoginData;

  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordValid(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not valid');
  }

  const { _id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const createUser = async (parems: Iuser) => {
  const result = await User.create(parems);

  return result;
};

const refreshToken = async (token: string) => {
  let varifiedToken = null;
  varifiedToken = jwtHelpers.varifyToken(
    token,
    config.jwt.refresh_secret as Secret
  );

  const { _id, role } = varifiedToken;
  const isUserExist = await User.findOne({_id: _id});
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new refresh token

  const newAccessToken = jwtHelpers.createToken(
    { _id: _id, role: role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = { loginUser, createUser, refreshToken };
