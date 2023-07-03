"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagionation_1 = require("../../../constants/pagionation");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const cow_constant_1 = require("./cow.constant");
const cow_service_1 = require("./cow.service");
const createCow = (0, catchAsync_1.default)(async (req, res) => {
    const cowData = req.body;
    const result = await cow_service_1.cowService.createCow(cowData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow created successfully',
        data: result,
    });
});
const getCows = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, cow_constant_1.CowFilterableField);
    const paginationOptinos = (0, pick_1.default)(req.query, pagionation_1.paginationFields);
    const result = await cow_service_1.cowService.getCows(filters, paginationOptinos);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow created successfully',
        data: result,
    });
});
const getSingleCow = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const query = req.query;
    console.log(query);
    const result = await cow_service_1.cowService.getSingleCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow retrive successfully',
        data: result,
    });
});
const updateSingleCow = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updateCow = req.body;
    const result = await cow_service_1.cowService.updateSingleCow(id, updateCow);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow update successfully',
        data: result,
    });
});
const deleteCow = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await cow_service_1.cowService.deleteCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow delete successfully',
        data: result,
    });
});
exports.cowController = {
    createCow,
    getCows,
    getSingleCow,
    updateSingleCow,
    deleteCow,
};
