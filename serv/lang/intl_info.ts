import { defineMessages, defineMessage } from "react-intl"
import { FormattedMessage, useIntl, injectIntl } from "react-intl"
import { ForgotPasswordForm } from "../src/components/cms/auth/ForgotPasswordForm"
import { formatMessage } from "@formatjs/intl"

// Predefined messages for later consumption (less recommended)

const msg1 = defineMessage({
  id: "NeTxCG",
  defaultMessage: "message",
  description: "ffffff",
})

const msg2 = defineMessage({
  defaultMessage: "sdff",
  id: "2i2oqq",
  description: "sdfsdf",
})

const msg4 = defineMessage({
  defaultMessage: "sdf",
  id: "W/iMsv",
  description: "sddf",
})

const msg3 = defineMessage({
  description: "A message",
  defaultMessage: "My name is {name}",
  id: "5VpL9Z",
})

const a = msg3

// Usage
/*
intl.formatMessage(msg1)
intl.formatMessage(msg2)
intl.formatMessage(msg3, {name: 'John'})


<FormattedMessage
  {...msg1}
/>


<FormattedMessage
  {...msg2}
/>


<FormattedMessage
  {...msg3}
  values={{
    name: 'John',
  }}
/>

*/

// Using imperative API intl.formatMessage
/*

intl.formatMessage(
  {
    description: 'A message', // Description should be a string literal
    defaultMessage: 'My name is {name}', // Message should be a string literal
  },
  {
    name: 'John',
  } // Values should be an object literal, but not necessarily every value inside
)


// Using React API <FormattedMessage/>

<FormattedMessage
  description="A message" // Description should be a string literal
  defaultMessage="My name is {name}" // Message should be a string literal
  values={
    {
      name: 'John',
    } // Values should be an object literal, but not necessarily every value inside
  }
/>

*/

// Node Initialise locale
/*

import {createIntl, createIntlCache} from '@formatjs/intl'

function loadLocaleData(locale: string): Promise<Record<string, string>> {
  switch (locale) {
    case 'fr':
      return import('compiled-lang/fr.json')
    default:
      return import('compiled-lang/en.json')
  }
}

// A single cache instance can be shared for all locales
const intlCache = createIntlCache()

async function bootstrapApplication(locale) {
  const messages = await loadLocaleData(locale)
  const intl = createIntl({locale, messages}, intlCache)
  // Now the intl object is localized and ready to use
}


*/

// React Initialise locale
/*

import {IntlProvider} from 'react-intl'

function loadLocaleData(locale: string) {
  switch (locale) {
    case 'fr':
      return import('compiled-lang/fr.json')
    default:
      return import('compiled-lang/en.json')
  }
}

function App(props) {
  return (
    <IntlProvider
      locale={props.locale}
      defaultLocale="en"
      messages={props.messages}
    >
      <MainApp />
    </IntlProvider>
  )
}

async function bootstrapApplication(locale, mainDiv) {
  const messages = await loadLocaleData(locale)
  ReactDOM.render(<App locale={locale} messages={messages} />, mainDiv)
}

*/
