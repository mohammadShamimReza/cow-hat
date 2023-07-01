import { ILogin } from '../../../interface/login';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (adminData: IAdmin) => {
  const result = await Admin.create(adminData);
  return result;
};

const loginAdmin = async (LoginData: ILogin) => {
  const { phoneNumber, password } = LoginData;
  const result = await Admin.find({ phoneNumber: phoneNumber });

  console.log(phoneNumber, password);
  return result;
};

export const adminService = { createAdmin, loginAdmin };
