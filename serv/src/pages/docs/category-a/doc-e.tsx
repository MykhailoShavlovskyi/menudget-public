import { getDocData } from "../../../lib/remark"
import { DocsLayout } from "../../../components/docs/DocsLayout"
import React from "react"

export const DocEPage = ({ data }) => <DocsLayout title="Menudget - Doc E" data={data} />

export async function getStaticProps() {
  const data = await getDocData("doc-e")
  return { props: { data } }
}

export default DocEPage
