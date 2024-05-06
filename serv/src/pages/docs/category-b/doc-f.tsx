import { getDocData } from "../../../lib/remark"
import { DocsLayout } from "../../../components/docs/DocsLayout"
import React from "react"

export const DocFPage = ({ data }) => <DocsLayout title="Menudget - Doc F" data={data} />

export async function getStaticProps() {
  const data = await getDocData("doc-f")
  return { props: { data } }
}

export default DocFPage
