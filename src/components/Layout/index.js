import "./styles.scss";
import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Controls from "../Controls";
import { useState } from "react";

const Layout = ({ setPlayPause, playStatus, playlist, playSong }) => {


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
        playSong={playSong}
      />
    </div>
  );
};

export default Layout;
