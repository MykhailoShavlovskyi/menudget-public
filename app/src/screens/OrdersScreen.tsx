import {useSortedOrders, useUserRestaurantId} from '../store/selectors';
import {useSessionKey} from '../lib/storage';
import {usePolling} from '../lib/usePolling';
import {
  getActiveOrders,
  setOrderDelivered,
  setOrderPayed,
  setTableIdle,
} from '../api/api';
import {setOrders} from '../store/slice';
import React, {useCallback} from 'react';
import {ActiveOrder} from '../store/models';
import {Orders} from '../components/orders/Orders';
import {env} from '../lib/env';
import {OrderState} from '../lib/OrderState';

function useOrdersPolling() {
  const restaurantId = useUserRestaurantId();
  const {sessionKey} = useSessionKey();

  const action = useCallback(() => {
    if (restaurantId != null && sessionKey != null)
      getActiveOrders(restaurantId, sessionKey)
        .then(setOrders)
        .catch((e: Error) => console.debug(e.message));
  }, [restaurantId, sessionKey]);

  usePolling(action);
}

const date = new Date(2022, 1, 1, 15, 44);

const testOrders: ActiveOrder[] = [
  {
    id: 1,
    tableId: 10,
    tableName: 'Today',
    tableIdle: false,
    createdAt: date,
    state: OrderState.Done,
    payed: false,
    delivered: false,
    dishes: [
      {
        id: 1,
        name: 'Vietnam Soup Extra',
        price: 62.75,
        count: 1,
        imageKeys: [],
      },
    ],
  },
  {
    id: 2,
    tableId: 10,
    tableName: 'Today',
    tableIdle: false,
    createdAt: date,
    state: OrderState.Done,
    payed: true,
    delivered: false,
    dishes: [
      {
        id: 1,
        name: 'Vietnam Soup Extra',
        price: 62.75,
        count: 1,
        imageKeys: [],
      },
    ],
  },
  {
    id: 3,
    tableId: 31,
    tableName: '31.12.21',
    tableIdle: false,
    createdAt: date,
    state: OrderState.InProgress,
    payed: false,
    delivered: false,
    dishes: [
      {
        id: 1,
        name: 'Vietnam Soup Extra',
        price: 62.75,
        count: 1,
        imageKeys: [],
      },
    ],
  },
  {
    id: 25,
    tableId: 31,
    tableName: '31.12.21',
    tableIdle: false,
    createdAt: date,
    state: OrderState.Pending,
    payed: false,
    delivered: false,
    dishes: [
      {
        id: 1,
        name: 'Vietnam Soup Extra',
        price: 62.75,
        count: 1,
        imageKeys: [],
      },
      {id: 2, name: 'Something else', price: 62.75, count: 1, imageKeys: []},
    ],
  },
  {
    id: 26,
    tableId: 31,
    tableName: '31.12.21',
    tableIdle: false,
    createdAt: date,
    state: OrderState.InProgress,
    payed: true,
    delivered: false,
    dishes: [
      {
        id: 1,
        name: 'Vietnam Soup Extra',
        price: 62.75,
        count: 1,
        imageKeys: [],
      },
      {id: 2, name: 'Something else', price: 62.75, count: 1, imageKeys: []},
    ],
  },
];

export const OrdersScreen = () => {
  useOrdersPolling();
  const orders = env.DEV_MODE ? testOrders : useSortedOrders();

  const {sessionKey} = useSessionKey();

  const handleSetPayed = useCallback(
    async (id: number) => {
      if (sessionKey == null) return sessionKey;
      const orders = await setOrderPayed(id, sessionKey);
      setOrders(orders);
    },
    [sessionKey],
  );

  const handleSetDelivered = useCallback(
    async (id: number) => {
      if (sessionKey == null) return sessionKey;
      const orders = await setOrderDelivered(id, sessionKey);
      setOrders(orders);
    },
    [sessionKey],
  );

  const handleSetIdle = useCallback(
    async (id: number) => {
      if (sessionKey == null) return sessionKey;
      const orders = await setTableIdle(id, sessionKey);
      setOrders(orders);
    },
    [sessionKey],
  );

  return (
    <Orders
      orders={orders}
      onSetPayed={handleSetPayed}
      onSetDelivered={handleSetDelivered}
      onSetIdle={handleSetIdle}
    />
  );
};
