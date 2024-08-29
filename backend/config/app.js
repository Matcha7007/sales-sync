import dotenv from 'dotenv';

dotenv.config();

const appKey = process.env.APP_KEY;
const tokenExpiresIn = 7600;

const appConfig = {
  appKey,
  tokenExpiresIn,
};

export default appConfig;
