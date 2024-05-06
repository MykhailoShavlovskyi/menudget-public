import { intl } from "../components/cms/IntlProvider"

export const getMsgRestaurants = () =>
  intl.formatMessage({
    defaultMessage: "Restaurants",
    id: "YD8SqW",
    description: "Navbar.tsx->RestaurantsLink",
  })

export const getMsgRestaurant = () =>
  intl.formatMessage({
    defaultMessage: "Restaurant",
    id: "Fc0va3",
    description: "Navbar.tsx->RestaurantLink",
  })

export const getMsgDishes = () =>
  intl.formatMessage({
    defaultMessage: "Dishes",
    id: "hRAGMC",
    description: "Navbar.tsx->DishesLink",
  })

export const getMsgTables = () =>
  intl.formatMessage({
    defaultMessage: "Tables",
    id: "DFSr7F",
    description: "Navbar.tsx->TablesLink",
  })

export const getMsgOrders = () =>
  intl.formatMessage({
    defaultMessage: "Orders",
    id: "sD751l",
    description: "Navbar.tsx->OrdersLink",
  })

export const getMsgWaiters = () =>
  intl.formatMessage({
    defaultMessage: "Waiters",
    id: "dPTJv0",
    description: "Navbar.tsx->WaitersLink",
  })
