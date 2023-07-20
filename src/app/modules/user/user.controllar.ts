import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    // meta: result.meta,
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.user;

  const result = await UserService.getSingleUser(req.params.id, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    // meta: result.meta,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const token = req.user;
  const result = await UserService.updateUser(id, updatedData, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    // meta: result.meta,
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const token = req.user;
  const result = await UserService.deleteUser(id, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User DELETED successfully',
    // meta: result.meta,
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization;
  const result = await UserService.getProfile(accessToken as string);
  // const result = accessToken;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrived successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization;
  const userUpdateData = req.body;
  const result = await UserService.updateProfile(
    accessToken as string,
    userUpdateData
  );
  // const result = accessToken;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's profile update successfully",
    data: result,
  });
});

export const UserController = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,

  // profile
  getProfile,
  updateProfile,
};
