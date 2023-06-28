import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagionation';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CowFilterableField } from './cow.constant';
import { cowService } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const cowData = req.body;
  const result = await cowService.createCow(cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});

const getCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CowFilterableField);
  const paginationOptinos = pick(req.query, paginationFields);

  const result = await cowService.getCows(filters, paginationOptinos);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const query = req.query;
  console.log(query);
  const result = await cowService.getSingleCow(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrive successfully',
    data: result,
  });
});

const updateSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateCow = req.body;
  const result = await cowService.updateSingleCow(id, updateCow);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow update successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await cowService.deleteCow(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow delete successfully',
    data: result,
  });
});

export const cowController = {
  createCow,
  getCows,
  getSingleCow,
  updateSingleCow,
  deleteCow,
};
