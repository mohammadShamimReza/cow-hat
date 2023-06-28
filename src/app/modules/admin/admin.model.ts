import { Schema, model } from 'mongoose';
import { IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<IAdmin>('Admin', adminSchema);
