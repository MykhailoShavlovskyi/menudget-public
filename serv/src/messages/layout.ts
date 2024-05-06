import { intl } from "../components/cms/IntlProvider"

export const getMsgErr403 = () =>
  intl.formatMessage({
    defaultMessage: "You are not allowed to view this page",
    id: "lluTvc",
    description: "layout->cmsNav.tsx->Error403",
  })
