import React, { FC } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/app.scss'

const App: FC<AppProps> = props => {
  const { Component, pageProps } = props
  return (
    <Layout>
      <Head>{}</Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
