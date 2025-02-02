import React from 'react'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="bg-gray-800 m-auto grid grid-cols-4 pt-8 gap-y-4">
        <div className="col-span-full grid grid-cols-4">{children}</div>
      </div>
      <Footer />
    </>
  )
}

export default Layout
