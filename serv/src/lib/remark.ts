import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export async function getDocData(name: string) {
  const fullPath = path.join("docs", `${name}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const matterResult = matter(fileContents)
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    contentHtml,
    ...matterResult.data,
  }
}
