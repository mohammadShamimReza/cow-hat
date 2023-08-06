import { Model, Types } from 'mongoose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barisal'
    | 'Sylhet'
    | 'Rangpur'
    | 'Mymensingh';
  breed:
    | 'Brahman'
    | 'Nellore'
    | 'Sahiwal'
    | 'Gir'
    | 'Indigenous'
    | 'Tharparkar'
    | 'Kankrej';
  weight: number;
  label: 'for sale' | 'sold out';
  category: 'Dairy' | 'Beef' | 'DualPurpose';
  seller: Types.ObjectId;
};
export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilter = {
  searchTerm?: string;
  name?: string;
  age?: number;
  price?: number;
  location?: string;
  breed?: string;
  weight?: number;
  lable?: string;
  category?: string;
};
