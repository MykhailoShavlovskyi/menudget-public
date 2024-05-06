import { getDocData } from "../../../lib/remark"
import { DocsLayout } from "../../../components/docs/DocsLayout"
import React from "react"

export const DocCPage = ({ data }) => <DocsLayout title="Menudget - Doc C" data={data} />

export async function getStaticProps() {
  const data = await getDocData("doc-c")
  return { props: { data } }
}

export default DocCPage
