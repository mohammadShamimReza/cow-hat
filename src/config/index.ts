import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_seller_pass: process.env.DEFAULT_SELLER_PASS,
  default_buyer_pass: process.env.DEFAULT_BUYER_PASS,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expire_in: process.env.JWT_EXPIRE_IN,
    refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  },
};
