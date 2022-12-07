import "./styles.scss";
import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Controls from "../Controls";
import { useState } from "react";

const Layout = ({ playsong, play }) => {


  return (
    <div className="App">
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
      <Controls/>
    </div>
  );
};

export default Layout;
