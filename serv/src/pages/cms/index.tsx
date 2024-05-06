import { BlitzPage, Routes } from "@blitzjs/next"

const CmsHomePage: BlitzPage = () => null

export const getServerSideProps = () => ({
  redirect: { destination: Routes.LoginPage().href, permanent: false },
})

export default CmsHomePage
