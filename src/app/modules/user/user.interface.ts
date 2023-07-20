import { Model } from 'mongoose';

type IUserName = {
  firstName: string;
  lastName: string;
};


export type Iuser = {
  password: string;
  role: 'buyer' | 'seller';
  name: IUserName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = {
  isUserExist(phoneNumber: string): any;
  isPasswordValid(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<Iuser>;
