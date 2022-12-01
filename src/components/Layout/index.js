import "./styles.scss";
import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Controls from "../Controls";
import { useRef, useState } from "react";

const Layout = ({ setPlayPause, playStatus, playlist }) => {

  return (
    <div className="App">
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
      <Controls
        setPlayPause={setPlayPause}
        playStatus={playStatus}
        playlist={playlist}
      />
    </div>
  );
};

export default Layout;
