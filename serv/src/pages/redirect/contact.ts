import { BlitzPage } from "@blitzjs/next"

const RedirectContactPage: BlitzPage = () => null

export const getServerSideProps = () => ({
  redirect: { destination: "https://menudget.app/", permanent: false },
})

export default RedirectContactPage
