//
// class MyDocument extends Document {
//   // Only uncomment if you need to customize this behaviour
//   // static async getInitialProps(ctx: DocumentContext) {
//   //   const initialProps = await Document.getInitialProps(ctx)
//   //   return {...initialProps}
//   // }
//   render() {
//     return (
//       <Html lang="en">
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }
//
// export default MyDocument
import Document, {Head, Html, Main, NextScript} from "next/document"
import {ServerStyleSheet} from "styled-components"

export default class MyDocument extends Document {
  // https://gist.github.com/straxico/77740ef488b6046f8f09c81de70e904e -> enables Styled components for SSR

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
