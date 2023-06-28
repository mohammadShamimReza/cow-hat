type IAdminName = {
  firstName: string;
  lastName: string;
};
// type IAdminAddress = {
//   division: string;
//   district: string;
//   area: string;
// };

export type IAdmin = {
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: IAdminName;
  address: string;
};
