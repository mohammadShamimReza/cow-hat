import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const LoginData = req.body;
  const result = await authService.loginUser(LoginData);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = { loginUser };
