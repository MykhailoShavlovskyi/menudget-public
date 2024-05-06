export const appVersion = 200; // 2.0.0

const devEnvironment = {
  BACKEND_URL: 'http://localhost:3000',
  DEV_MODE: true,
};

const testEnvironment = {
  BACKEND_URL: 'https://d31t95zge1f2me.cloudfront.net',
  DEV_MODE: false,
};

const prodEnvironment = {
  BACKEND_URL: 'https://d39mxyzelllsdr.cloudfront.net',
  DEV_MODE: false,
};

//export const env = devEnvironment;
export const env = testEnvironment;
//export const env = prodEnvironment;
