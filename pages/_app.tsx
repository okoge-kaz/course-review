import React, { FC } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/app.scss'

const App: FC<AppProps> = props => {
  const { Component, pageProps } = props
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="逆評定 - Titech Info : 東工大情報サイト" />
        <meta
          property="og:image"
          content="https://course-review-tmp.titech.info/images/course-review-ogp.png/"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
