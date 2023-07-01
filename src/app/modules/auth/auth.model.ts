import { Schema, model } from 'mongoose';
import { IUserLogin } from './auth.interface';

const authSchema = new Schema<IUserLogin>({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


export const Auth = model<IUserLogin>('Auth', authSchema);
