import { createIntl, createIntlCache } from "@formatjs/intl"
import { IntlShape, RawIntlProvider } from "react-intl"
import { useMount } from "react-use"
import { PropsWithChildren, useState } from "react"

function loadLocaleData(locale: string) {
  switch (locale) {
    case "nl":
      return import("../../../compiled-lang/nl.json")
    case "de":
      return import("../../../compiled-lang/de.json")
    case "chi":
      return import("../../../compiled-lang/chi.json")
    case "chi-en":
      return import("../../../compiled-lang/chi-en.json")
    case "eng":
      return import("../../../compiled-lang/en.json")
    default:
      return import("../../../compiled-lang/en.json")
  }
}

// A single cache instance can be shared for all locales
const intlCache = createIntlCache()

export let intl: IntlShape
export const localeKey = "menudget-locale"

async function initIntl(locale: string) {
  const messages = (await loadLocaleData(locale)) as any
  intl = createIntl({ locale, messages }, intlCache)
}

export const IntlProvider = ({ children }: PropsWithChildren<{}>) => {
  const [mounted, setMounted] = useState(false)
  useMount(async () => {
    await initIntl(localStorage.getItem(localeKey) ?? "eng")
    setMounted(true)
  })

  if (!mounted) return null
  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>
}
