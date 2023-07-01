import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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

export const UserService = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
