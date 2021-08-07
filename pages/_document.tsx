import React, { ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="ja">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lobster" />
        <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta property="og:title" content="逆評定 - Titech Info : 東工大情報サイト"/>
        <meta property="og:image" content="https://course-review-tmp.titech.info/images/course-review-ogp.png/"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
