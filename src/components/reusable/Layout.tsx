import React from 'react'
import Header from './Header'
type LayoutProps = {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container m-auto grid grid-cols-4 mt-8 gap-y-4">
        <div className="col-span-full grid grid-cols-4">{children}</div>
      </div>
    </>
  )
}

export default Layout
