import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import { ILogin } from '../../../interface/login';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (adminData: IAdmin) => {
  const result = await Admin.create(adminData);

  return result;
};

const loginAdmin = async (LoginData: ILogin) => {
  const { phoneNumber, password } = LoginData;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordValid(password, isAdminExist?.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not valid');
  }

  const { _id, role } = isAdminExist;
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

export const adminService = { createAdmin, loginAdmin };
