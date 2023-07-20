import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const getHome = catchAsync(async (req: Request, res: Response) => {
  const result = 'app is running successfully with route';

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'home successfully',
    data: result,
  });
});

export const homeControllar = { getHome };
