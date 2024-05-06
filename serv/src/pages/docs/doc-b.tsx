import { getDocData } from "../../lib/remark"
import { DocsLayout } from "../../components/docs/DocsLayout"
import React from "react"

export const DocBPage = ({ data }) => <DocsLayout title="Menudget - Doc A" data={data} />

export async function getStaticProps() {
  const data = await getDocData("doc-b")
  return { props: { data } }
}

export default DocBPage
