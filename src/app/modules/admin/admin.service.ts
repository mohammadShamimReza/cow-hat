import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (adminData: IAdmin) => {
  console.log(adminData);
  const result = await Admin.create(adminData);
  return result;
};

export const adminService = { createAdmin };
