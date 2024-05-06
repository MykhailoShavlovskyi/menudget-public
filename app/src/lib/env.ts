export const appVersion = 200; // 2.0.0

const devEnvironment = {
  BACKEND_URL: 'http://localhost:3000',
  //BACKEND_URL: 'http://192.168.1.59:3000', // home
  //BACKEND_URL: 'http://192.168.11.36:3000', //office
  //BACKEND_URL: 'http://10.53.62.152:3000', //tmp
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
