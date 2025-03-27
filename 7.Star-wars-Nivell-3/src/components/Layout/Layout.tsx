import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import User from "./User";

const Layout = () => {
  return (
    <>
      <User />
      <div className="flex flex-col h-screen">
        <Header />
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
