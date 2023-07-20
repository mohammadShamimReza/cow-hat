"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllar = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const makeOrder = (0, catchAsync_1.default)(async (req, res) => {
    const orderData = req.body;
    console.log(orderData);
    const result = await order_service_1.OrderService.makeOrder(orderData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orderd successfully',
        data: result,
    });
});
const getOrder = (0, catchAsync_1.default)(async (req, res) => {
    const result = await order_service_1.OrderService.getOrder();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orderd retrived successfully',
        data: result,
    });
});
const getSingleOrder = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.user;
    const orderId = req.params.id;
    const result = await order_service_1.OrderService.getSingleOrder(orderId, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orderd information retrived  successfully',
        data: result,
    });
});
exports.OrderControllar = { makeOrder, getOrder, getSingleOrder };
