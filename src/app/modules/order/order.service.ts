import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cows } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const makeOrder = async (orderData: IOrder) => {
  const { cow, buyer } = orderData;
  const [cowExist, buyerExist] = await Promise.all([
    Cows.findById(cow).populate('seller').exec(),
    User.findOne({ _id: buyer, role: 'buyer' }, 'budget'),
  ]);

  if (!cowExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }
  if (cowExist.label === 'sold out') {
    throw new ApiError(400, 'Cow is already sold');
  }
  if (!buyerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found');
  }
  const buyerBudget = buyerExist.budget;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (cowExist.price <= buyerBudget) {
      const price = cowExist.price;
      await Promise.all([
        User.findByIdAndUpdate(
          cowExist.seller,
          { $inc: { income: price } },
          { session }
        ),
        User.findByIdAndUpdate(
          buyer,
          { $inc: { budget: -price } },
          { session }
        ),
      ]);

      const result = await Order.create([orderData], { session });

      await Cows.findByIdAndUpdate(cow, { label: 'sold out' }, { session });

      await session.commitTransaction();
      await session.endSession();

      return result;
    } else {
      throw new ApiError(400, 'Buyer does not have enough money');
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getOrder = async () => {
  const result = await Order.find({});
  return result;
};

const getSingleOrder = async (orderId: string, token: JwtPayload | null) => {
  const id = token?._id;
  const role = token?.role;

  let result;

  if (role === 'admin') {
    result = await Order.findById(orderId).populate(['cow', 'seller', 'buyer']);
    return result;
  }
  const ifExists = await User.findById(id);

  if (!ifExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (role !== ifExists.role && role !== 'admin') {
    throw new ApiError(httpStatus.NOT_FOUND, 'you are not authorized');
  }

  if (role === 'buyer') {
    console.log(role, id);
    result = await Order.find({ buyer: id }).populate([
      'cow',
      'seller',
      'buyer',
    ]);
  } else if (role === 'seller') {
    result = await Order.find({ seller: id }).populate([
      'cow',
      'seller',
      'buyer',
    ]);
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'you are not allowed ');
  }

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'not found');
  }
  console.log(result);
  return result;
};

export const OrderService = { makeOrder, getOrder, getSingleOrder };
