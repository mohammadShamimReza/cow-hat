import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { User } from '../user/user.model';
import { CowSearchAbleField } from './cow.constant';
import { ICow, ICowFilter } from './cow.interface';
import { Cows } from './cow.model';

const createCow = async (cowData: ICow) => {
  const ifExists = await User.findById(cowData.seller);
  if (!ifExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  cowData.label = 'for sale';
  const result = await Cows.create(cowData);
  return result;
};

const getCows = async (
  filters: ICowFilter,
  paginationOptinos: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: CowSearchAbleField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $option: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptinos);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cows.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Cows.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleCow = async (id: string) => {
  const result = await Cows.find({ _id: id });
  return result;
};
const updateSingleCow = async (id: string, updateCow: Partial<ICow>) => {
  const result = await Cows.find({ _id: id }, updateCow);
  return result;
};

const deleteCow = async (id: string) => {
  const ifExist = await Cows.findById({ _id: id });

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cow not found');
  }

  const result = await Cows.findByIdAndDelete({ _id: id });
  return result;
};

export const cowService = {
  createCow,
  getCows,
  getSingleCow,
  updateSingleCow,
  deleteCow,
};
