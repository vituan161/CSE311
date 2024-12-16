import React from "react";
import "./layout.scss";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Header />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
