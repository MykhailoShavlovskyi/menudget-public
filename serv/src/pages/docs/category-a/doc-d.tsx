import { getDocData } from "../../../lib/remark"
import { DocsLayout } from "../../../components/docs/DocsLayout"
import React from "react"

export const DocDPage = ({ data }) => <DocsLayout title="Menudget - Doc D" data={data} />

export async function getStaticProps() {
  const data = await getDocData("doc-d")
  return { props: { data } }
}

export default DocDPage
