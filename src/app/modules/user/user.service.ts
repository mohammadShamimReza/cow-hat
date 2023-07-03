import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import { Iuser } from './user.interface';
import { User } from './user.model';

const createUser = async (parems: Iuser) => {
  const result = await User.create(parems);

  return result;
};

const getUsers = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.find({ _id: id });
  return result;
};
const updateUser = async (id: string, updatedData: Partial<Iuser>) => {
  const ifExists = await User.findOne({ _id: id });
  if (!ifExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const ifExists = await User.findOne({ _id: id });
  if (!ifExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await User.findOneAndDelete({ _id: id });
  return result;
};

const getProfile = async (accessToekn: string) => {
  const accessInfo = jwtHelpers.varifyToken(
    accessToekn,
    config.jwt.secret as Secret
  );
  const { _id, role } = accessInfo;

  const result = await User.find(
    { _id, role },
    { password: 0, _id: 0, createdAt: 0, updatedAt: 0 }
  );
  return result;
};

const updateProfile = async (
  accessToekn: string,
  updateUserData: Partial<Iuser>
) => {
  const accessInfo = jwtHelpers.varifyToken(
    accessToekn,
    config.jwt.secret as Secret
  );
  const { _id, role } = accessInfo;

  const result = await User.findOneAndUpdate({ _id, role }, updateUserData, {
    projection: {
      password: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
    },
    new: true,
  });
  return result;
};

export const UserService = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,

  //profile

  getProfile,
  updateProfile,
};
