"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const adminSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
adminSchema.statics.isAdminExist = async function (phoneNumber) {
    return await exports.Admin.findOne({ phoneNumber }, { _id: 1, role: 1, password: 1 });
};
adminSchema.statics.isPasswordValid = async function (givenPassword, savedPassword) {
    return await bcrypt_1.default.compare(givenPassword, savedPassword);
};
adminSchema.pre('save', async function (next) {
    //hasing user password
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const admin = this;
    admin.password = await bcrypt_1.default.hash(admin.password, Number(config_1.default.bcrypt_salt_round));
    next();
});
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
