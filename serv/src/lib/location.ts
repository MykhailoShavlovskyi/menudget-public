export function replaceParam(key: string, value: string | number, uri?: string) {
  if (typeof window === "undefined") {
    return ""
  }

  uri ??= window.location.href

  // Create a regular expression to match the parameter key
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i")
  const separator = uri.indexOf("?") !== -1 ? "&" : "?"

  if (uri.match(re)) {
    // If the parameter exists, replace it with the new value
    return uri.replace(re, "$1" + key + "=" + value + "$2")
  } else {
    // If the parameter doesn't exist, add it to the URL
    return uri + separator + key + "=" + value
  }
}
