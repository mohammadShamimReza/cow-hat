import { Schema, model } from 'mongoose';
import { Iuser } from './user.interface';

const userSchema = new Schema<Iuser>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: false,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      division: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<Iuser>('User', userSchema);
