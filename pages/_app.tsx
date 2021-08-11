import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/app.scss'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

const App: FC<AppProps> = props => {
  const { Component, pageProps } = props
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <Layout>
      <Head>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
