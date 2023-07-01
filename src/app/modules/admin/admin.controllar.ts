import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { adminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminData = req.body;
  const result = await adminService.createAdmin(adminData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Admin created successfully',
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const LoginData = req.body;
  const result = await adminService.loginAdmin(LoginData);
  const { accessToken, refreshToken } = result;
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('adminRefreshToken', refreshToken, cookieOption);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: {
      accessToken: accessToken,
    },
  });
});

export const AdminController = { createAdmin, loginAdmin };
