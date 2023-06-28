import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const makeOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  console.log(orderData);
  const result = await OrderService.makeOrder(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orderd successfully',
    data: result,
  });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrder();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orderd retrived successfully',
    data: result,
  });
});

export const OrderControllar = { makeOrder, getOrder };
