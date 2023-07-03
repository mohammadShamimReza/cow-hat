"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const user_model_1 = require("../user/user.model");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const createCow = async (cowData) => {
    const ifExists = await user_model_1.User.findById(cowData.seller);
    if (!ifExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    cowData.label = 'for sale';
    const result = await cow_model_1.Cows.create(cowData);
    return result;
};
const getCows = async (filters, paginationOptinos) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.CowSearchAbleField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $option: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptinos);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await cow_model_1.Cows.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = await cow_model_1.Cows.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleCow = async (id) => {
    const result = await cow_model_1.Cows.find({ _id: id });
    return result;
};
const updateSingleCow = async (id, updateCow) => {
    const result = await cow_model_1.Cows.find({ _id: id }, updateCow);
    return result;
};
const deleteCow = async (id) => {
    const ifExist = await cow_model_1.Cows.findById({ _id: id });
    if (!ifExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'cow not found');
    }
    const result = await cow_model_1.Cows.findByIdAndDelete({ _id: id });
    return result;
};
exports.cowService = {
    createCow,
    getCows,
    getSingleCow,
    updateSingleCow,
    deleteCow,
};
