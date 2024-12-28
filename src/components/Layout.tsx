import React from "react";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container m-auto grid grid-cols-3 grid-rows-5">
      <div className="col-span-full">Hello world</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
