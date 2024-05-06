import Layout from "../common/Layout"
import styled from "styled-components"
import { PropsWithChildren } from "react"

const StyledContainer = styled.div`
  display: flex;

  aside {
    border-right: 1px solid black;
    height: 100vh;
    padding: 1rem;
    width: 11rem;
    position: fixed;

    h3 {
      margin-bottom: 0.25rem;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0.25rem 0 0;
    }

    li {
      margin-bottom: 0.25rem;
    }
  }

  & > div {
    width: 10rem;
  }

  main {
    flex: 1;
    padding: 2rem;
  }
`

export const DocsLayout = ({
  title,
  data,
  children,
}: PropsWithChildren<{
  title: string
  data?: any
}>) => (
  <Layout title={title}>
    <StyledContainer>
      <aside>
        <h3>Documentation</h3>
        <ul>
          <li>
            <a href={"/docs"}>Home</a>
          </li>
          <li>
            <a href={"/docs/doc-a"}>Doc A</a>
          </li>
          <li>
            <a href={"/docs/doc-b"}>Doc B</a>
          </li>
          <li>
            Category A
            <ul>
              <li>
                <a href={"/docs/category-a/doc-c"}>Doc B</a>
              </li>
              <li>
                <a href={"/docs/category-a/doc-d"}>Doc D</a>
              </li>
              <li>
                <a href={"/docs/category-a/doc-e"}>Doc E</a>
              </li>
            </ul>
          </li>
          <li>
            Category B
            <ul>
              <li>
                <a href={"/docs/category-b/doc-f"}>Doc B</a>
              </li>
              <li>
                <a href={"/docs/category-b/doc-g"}>Doc D</a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <div />
      <main>
        {data && (
          <>
            {data.title}
            {data.title && <br />}
            {data.id}
            {data.id && <br />}
            {data.date}
            {data.date && <br />}
            <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
          </>
        )}
        {children}
      </main>
    </StyledContainer>
  </Layout>
)
