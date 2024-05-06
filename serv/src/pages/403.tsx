import Head from "next/head"
import { ErrorComponent } from "@blitzjs/next"

export default function Page403() {
  const statusCode = 403
  const title = "This page could not be displayed"
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <ErrorComponent id={"error-403"} statusCode={statusCode} title={title} />
    </>
  )
}
