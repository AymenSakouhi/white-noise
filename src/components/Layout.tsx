import React from 'react'
type LayoutProps = {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container m-auto grid grid-cols-4 mt-8 gap-y-4">
      <div className="col-span-full text-sky-200 text-2xl text-center">
        Choose your best comination
      </div>
      <div className="col-span-full grid grid-cols-4">{children}</div>
    </div>
  )
}

export default Layout
