import { intl } from "../components/cms/IntlProvider"

export const getLblAddNewTable = () =>
  intl.formatMessage({
    defaultMessage: "Add new table",
    id: "n4PJKF",
    description: "tables->AddTableCard.tsx->AddTableCard",
  })

export const getMsgDownloadQRCode = () =>
  intl.formatMessage({
    defaultMessage: "Download QR-code",
    id: "P/Ks9N",
    description: "tables->TableCard.tsx->DownloadButtonLabel",
  })
export const getLblShowQRCode = () =>
  intl.formatMessage({
    defaultMessage: "Show QR-code",
    id: "DDuWKi",
    description: "tables->TableCard.tsx->TableCard",
  })

export const getMsgOccupancy = () =>
  intl.formatMessage({
    defaultMessage: "Occupancy: ",
    id: "ONwtvJ",
    description: "tables->TableCard.tsx->TableCard",
  })

export const getMsgNameIsRequired = () =>
  intl.formatMessage({
    defaultMessage: "Name is a required field",
    id: "hFXTI4",
    description: "tables->TableFrom.tsx->schema",
  })
export const getLblNewTable = () =>
  intl.formatMessage({
    defaultMessage: "New table",
    id: "SExSe1",
    description: "tables->TableFrom.tsx->defaultValues",
  })

export const getLblName = () =>
  intl.formatMessage({
    defaultMessage: "Name*",
    id: "C+e4j8",
    description: "tables->TableFrom.tsx->NameInput",
  })
export const getLblDescription = () =>
  intl.formatMessage({
    defaultMessage: "* necessary field",
    id: "iamxsS",
    description: "tables->TableFrom.tsx->NameInput",
  })
export const getLblWaiter = () =>
  intl.formatMessage({
    defaultMessage: "Waiter",
    id: "cufXoZ",
    description: "tables->TableFrom.tsx->WaiterSelect",
  })

export const getLblOccupancy = () =>
  intl.formatMessage({
    defaultMessage: "Occupancy",
    id: "6WV8PH",
    description: "tables->TableFrom.tsx->OccupancyInput",
  })

export const getMsgTables = () =>
  intl.formatMessage({
    defaultMessage: "Tables",
    id: "OLBeMv",
    description: "tables->TablesHeading.tsx->TablesHeading",
  })

export const getTitTable = () =>
  intl.formatMessage({
    defaultMessage: "Tables - Menudget",
    id: "tF2zsb",
    description: "pages/cms/tables/[restaurantId]->[id].tsx->TablePage",
  })

export const getTitRestaurantTables = () =>
  intl.formatMessage({
    defaultMessage: "Tables - Menudget",
    id: "2OVOVl",
    description: "pages/cms/tables/[restaurantId]->index.tsx->RestaurantTablesPage",
  })

export const getTitNewTable = () =>
  intl.formatMessage({
    defaultMessage: "New Table - Menudget",
    id: "Dh3bgZ",
    description: "pages/cms/tables/[restaurantId]->new.tsx->NewTablePage",
  })

export const getTitTables = () =>
  intl.formatMessage({
    defaultMessage: "Tables - Menudget",
    id: "FZqqdB",
    description: "pages/cms/tables/->index.tsx->TablesPage",
  })
