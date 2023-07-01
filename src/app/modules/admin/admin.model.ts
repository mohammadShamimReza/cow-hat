import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { AdminModel, IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin, AdminModel>(
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

adminSchema.statics.isAdminExist = async function (phoneNumber: string) {
  return await Admin.findOne({ phoneNumber }, { _id: 1, role: 1, password: 1 });
};

adminSchema.statics.isPasswordValid = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre('save', async function (next) {
  //hasing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
