import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { Iuser, UserModel } from './user.interface';

const userSchema = new Schema<Iuser, UserModel>(
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

userSchema.statics.isUserExist = async function (phoneNumber: string) {
  return await User.findOne({ phoneNumber }, { _id: 1, role: 1, password: 1 });
};
userSchema.statics.isPasswordValid = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  //hasing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const User = model<Iuser, UserModel>('User', userSchema);
