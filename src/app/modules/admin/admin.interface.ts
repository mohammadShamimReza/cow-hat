import { Model } from 'mongoose';

type IAdminName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: IAdminName;
  address: string;
};

export type AdminModel = {
  isAdminExist(id: string): any;
  isPasswordValid(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
