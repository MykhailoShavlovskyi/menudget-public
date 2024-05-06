import { BlitzPage } from "@blitzjs/next"
import React, { ReactNode, useState } from "react"
import { AppLayout } from "../../components/app/AppLayout"
import { Bookmarks } from "../../containers/app/Bookmarks"
import { useMount } from "react-use"

const BookmarksPage: BlitzPage = () => {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))

  if (!mounted) return null
  return <Bookmarks />
}

BookmarksPage.getLayout = (page: ReactNode) => <AppLayout title="Menudget">{page}</AppLayout>

export default BookmarksPage
