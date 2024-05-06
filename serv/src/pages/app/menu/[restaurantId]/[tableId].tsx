import { BlitzPage } from "@blitzjs/next"
import React, { ReactNode, useState } from "react"
import { AppLayout } from "../../../../components/app/AppLayout"
import { getMenu } from "../../../../db/dishes/dishes"
import { useMount } from "react-use"
import { menuRetrieved } from "../../../../store/app/slice"
import { MenuHeader } from "../../../../containers/app/MenuHeader"
import { MenuSearch } from "../../../../containers/app/MenuSearch"
import { MenuContent } from "../../../../containers/app/MenuContent"
import { MenuSSR } from "../../../../components/app/menu/MenuSSR"

const MenuPage: BlitzPage = (props: Awaited<ReturnType<typeof getMenu>>) => {
  const [mounted, setMounted] = useState(false)
  useMount(() => {
    menuRetrieved(props)
    setMounted(true)
  })

  if (!mounted) return <MenuSSR {...props} />
  return (
    <>
      <MenuHeader />
      <MenuSearch />
      <MenuContent />
      <div style={{ height: "5rem" }} />
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const restaurantId = Number(params?.restaurantId)
  const tableId = Number(params?.tableId)

  const menu = await getMenu(restaurantId, tableId, false)
  return { props: menu }
}

MenuPage.getLayout = (page: ReactNode) => <AppLayout title="Menudget - Menu">{page}</AppLayout>

export default MenuPage
