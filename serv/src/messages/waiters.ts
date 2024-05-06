import { intl } from "../components/cms/IntlProvider"

export const getLblAddNewWaiter = () =>
  intl.formatMessage({
    defaultMessage: "Add new waiter",
    id: "24MyNi",
    description: "tables->AddWaiterCard.tsx->AddWaiterCard",
  })

export const getLblNewWaiter = () =>
  intl.formatMessage({
    defaultMessage: "New waiter",
    id: "kAWdSe",
    description: "tables->WaiterForm.tsx->defaultValues",
  })

export const getMsgNameIsRequired = () =>
  intl.formatMessage({
    defaultMessage: "Name is a required field",
    id: "U7hSS5",
    description: "tables->WaiterForm.tsx->schema",
  })

export const getMsgEmailIsRequired = () =>
  intl.formatMessage({
    defaultMessage: "Email is a required field",
    id: "YTeQmg",
    description: "tables->WaiterForm.tsx->schema",
  })

export const getLblName = () =>
  intl.formatMessage({
    defaultMessage: "Name*",
    id: "UdgZyE",
    description: "tables->WaiterForm.tsx->NameInput",
  })

export const getLblEmail = () =>
  intl.formatMessage({
    defaultMessage: "Email*",
    id: "8abULR",
    description: "tables->WaiterForm.tsx->EmailInput",
  })

export const getLblTables = () =>
  intl.formatMessage({
    defaultMessage: "Tables",
    id: "VWO1sJ",
    description: "tables->WaiterForm.tsx->TablesInput",
  })

export const getLblNotes = () =>
  intl.formatMessage({
    defaultMessage: "Notes",
    id: "8BaINU",
    description: "tables->WaiterForm.tsx->NotesInput",
  })

export const getMsgNecessaryFields = () =>
  intl.formatMessage({
    defaultMessage: "* necessary fields",
    id: "yEpKGh",
    description: "tables->WaiterForm.tsx->WaiterForm",
  })

export const getTitWaiter = () =>
  intl.formatMessage({
    defaultMessage: "Waiters - Menudget",
    id: "fYN9Jk",
    description: "pages/cms/waiters/[restauranId]->[id].tsx->WaiterPage",
  })

export const getTitRestaurantWaiters = () =>
  intl.formatMessage({
    defaultMessage: "Waiters - Menudget",
    id: "BUrQow",
    description: "pages/cms/waiters/[restauranId]->index.tsx->RestaurantWaitersPage",
  })

export const getTitNewWaiter = () =>
  intl.formatMessage({
    defaultMessage: "New Waiter - Menudget",
    id: "I+uLWd",
    description: "pages/cms/waiters/[restauranId]->new.tsx->NewWaiterPage",
  })

export const getTitWaiters = () =>
  intl.formatMessage({
    defaultMessage: "Waiters - Menudget",
    id: "cb9Aox",
    description: "pages/cms/waiters->index.tsx->WaitersPage",
  })

export const getHeaWaiters = () =>
  intl.formatMessage({
    defaultMessage: "Waiters",
    id: "HHj7dJ",
    description: "waiters->WaitersHeading.tsx->WaitersHeading",
  })
