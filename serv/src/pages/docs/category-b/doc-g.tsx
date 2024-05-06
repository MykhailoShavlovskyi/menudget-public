import { getDocData } from "../../../lib/remark"
import { DocsLayout } from "../../../components/docs/DocsLayout"
import React from "react"

export const DocGPage = ({ data }) => <DocsLayout title="Menudget - Doc G" data={data} />

export async function getStaticProps() {
  const data = await getDocData("doc-g")
  return { props: { data } }
}

export default DocGPage
