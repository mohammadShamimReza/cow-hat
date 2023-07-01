import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const LoginData = req.body;
  const result = await authService.loginUser(LoginData);
  const { accessToken, refreshToken } = result;
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('userRefreshToken', refreshToken, cookieOption);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: {
      accessToken: accessToken,
    },
  });
});

export const AuthController = { loginUser };
