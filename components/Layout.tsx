import React, { FC, ReactNode } from 'react'
import Header from './Layout/Header'
import Footer from './Layout/Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = props => {
  const { children } = props
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer className="footer mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
