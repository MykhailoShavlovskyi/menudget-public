import { useMedia } from "react-use"

export function useIsComputer() {
  return useMedia("(min-width: 1366px)", false)
}
