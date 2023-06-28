type ISellerName = {
  firstName: string;
  lastName: string;
};
type ISellerAddress = {
  division: string;
  district: string;
  area: string;
};

export type Iuser = {
  password: string;
  role: 'buyer' | 'seller';
  name: ISellerName;
  phoneNumber: string;
  address: ISellerAddress;
  budget: number;
  income: number;
};

// export type UserModel = Model<Iuser>;
