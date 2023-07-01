import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
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

adminSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this;
  admin.password = await await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const Admin = model<IAdmin>('Admin', adminSchema);
