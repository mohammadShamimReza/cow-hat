import { Request, Response } from 'express';
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


export const AdminController = { createAdmin };
