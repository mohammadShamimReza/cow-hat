import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cows } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const makeOrder = async (orderData: IOrder) => {
  const { cow, buyer } = orderData;
  console.log(cow, buyer);
  const [cowExist, buyerExist] = await Promise.all([
    Cows.findById(cow).populate('seller').exec(),
    User.findOne({ _id: buyer, role: 'buyer' }, 'budget'),
  ]);

  console.log(cowExist);
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
    console.log(cowExist.price, buyerBudget);
    if (cowExist.price <= buyerBudget) {
      console.log('Go ahead with the purchase');
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

      const result = await Order.create(orderData, { session });

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

export const OrderService = { makeOrder, getOrder };
