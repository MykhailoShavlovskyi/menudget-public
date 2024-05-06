import { useRouter } from "next/router"

export function useRefresh() {
  const router = useRouter()
  return () => router.replace(router.asPath, undefined, { scroll: false })
}
