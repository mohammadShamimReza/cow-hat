type IUserName = {
  firstName: string;
  lastName: string;
};
type IUserAddress = {
  division: string;
  district: string;
  area: string;
};

export type Iuser = {
  password: string;
  role: 'buyer' | 'seller';
  name: IUserName;
  phoneNumber: string;
  address: IUserAddress;
  budget: number;
  income: number;
};

// export type UserModel = Model<Iuser>;
