import axios, {AxiosRequestConfig} from 'axios';
import {env} from '../lib/env';

export function FETCH(path: string, init: AxiosRequestConfig = {}) {
  return axios(`${env.BACKEND_URL}/api/${path}`, init)
    .then(v => {
      //console.debug({v: v.data});
      return v.data;
    })
    .catch(e => console.log(e.message));
}

export function GET(path: string) {
  return FETCH(path);
}

export function POST(path: string, data: any, options?: AxiosRequestConfig) {
  return FETCH(path, {method: 'POST', data, ...options});
}

export function getMinAppVersion() {
  return GET('getMinVersion');
}

export async function getMenu(restaurantId: number, tableId: number) {
  return POST(`getMenu/${restaurantId}`, {data: {tableId}});
}

export function submitOrder(data: {
  restaurantId: number;
  dishes: {dishId: number; count: number}[];
  tableId: number;
  notes: string;
  promo: string;
}) {
  return POST(`submitOrder`, data);
}

export async function authorizeSession(key: string) {
  return POST('authorizeSession', {key});
}

export async function login(email: string, password: string) {
  return POST('appLogin', {email, password});
}

export async function getTables(userId: number, key: string) {
  return POST(`getTables/${userId}`, {key});
}

export async function getActiveOrders(restaurantId: number, key: string) {
  return POST(`getActiveOrders/${restaurantId}`, {key});
}

export async function setOrderPayed(id: number, key: string) {
  return POST(`setOrderPayed/${id}`, {key});
}

export async function setOrderDelivered(id: number, key: string) {
  return POST(`setOrderDelivered/${id}`, {key});
}

export async function setTableIdle(id: number, key: string) {
  return POST(`setTableIdle/${id}`, {key});
}
