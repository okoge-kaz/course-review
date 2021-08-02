import React, { ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="ja">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lobster" />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
