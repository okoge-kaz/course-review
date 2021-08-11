import React, { ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '../lib/gtag'

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:title" content="逆評定 - Titech Info : 東工大情報サイト" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="og:image"
            content="https://course-review-tmp.titech.info/images/course-review-ogp.png"
          />
          <meta property="og:title" content="Titech Info" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-touch-icon-144-precomposed.png"
          />
          {/* font */}
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lobster" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
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
