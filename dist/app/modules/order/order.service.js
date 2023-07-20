"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const makeOrder = async (orderData) => {
    const { cow, buyer } = orderData;
    const [cowExist, buyerExist] = await Promise.all([
        cow_model_1.Cows.findById(cow).populate('seller').exec(),
        user_model_1.User.findOne({ _id: buyer, role: 'buyer' }, 'budget'),
    ]);
    if (!cowExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
    if (cowExist.label === 'sold out') {
        throw new ApiError_1.default(400, 'Cow is already sold');
    }
    if (!buyerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Buyer not found');
    }
    const buyerBudget = buyerExist.budget;
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        if (cowExist.price <= buyerBudget) {
            const price = cowExist.price;
            await Promise.all([
                user_model_1.User.findByIdAndUpdate(cowExist.seller, { $inc: { income: price } }, { session }),
                user_model_1.User.findByIdAndUpdate(buyer, { $inc: { budget: -price } }, { session }),
            ]);
            const result = await order_model_1.Order.create([orderData], { session });
            await cow_model_1.Cows.findByIdAndUpdate(cow, { label: 'sold out' }, { session });
            await session.commitTransaction();
            await session.endSession();
            return result;
        }
        else {
            throw new ApiError_1.default(400, 'Buyer does not have enough money');
        }
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};
const getOrder = async () => {
    const result = await order_model_1.Order.find({});
    return result;
};
const getSingleOrder = async (orderId, token) => {
    const id = token?._id;
    const role = token?.role;
    let result;
    if (role === 'admin') {
        result = await order_model_1.Order.findById(orderId).populate(['cow', 'seller', 'buyer']);
        return result;
    }
    const ifExists = await user_model_1.User.findById(id);
    if (!ifExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (role !== ifExists.role && role !== 'admin') {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'you are not authorized');
    }
    if (role === 'buyer') {
        console.log(role, id);
        result = await order_model_1.Order.find({ buyer: id }).populate([
            'cow',
            'seller',
            'buyer',
        ]);
    }
    else if (role === 'seller') {
        result = await order_model_1.Order.find({ seller: id }).populate([
            'cow',
            'seller',
            'buyer',
        ]);
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'you are not allowed ');
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'not found');
    }
    console.log(result);
    return result;
};
exports.OrderService = { makeOrder, getOrder, getSingleOrder };
