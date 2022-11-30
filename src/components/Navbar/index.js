import React from "react";
import { Link, NavLink } from "react-router-dom";
import songifyLogo from "../../assets/img/main_logo.png";
import "./styles.scss";
import createPlaylistIcon from "../../assets/svg/create_playlist.svg";
import homeIcon from "../../assets/svg/home.svg";
import searchIcon from "../../assets/svg/search.svg";
import libraryIcon from "../../assets/svg/library.svg";
import likedSongsIcon from "../../assets/svg/liked_songs.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img src={songifyLogo} alt="Songify Logo" className="songify-logo" />
      </Link>
      <nav>
        <NavLink exact="true" activeclassname="active" to="/" className="home">
          <img src={homeIcon} alt="Home Icon" />
          <span>Home</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          className="search"
        >
          <img src={searchIcon} alt="Search Icon" />
          <span>Search</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          className="library"
        >
          <img src={libraryIcon} alt="Library Icon" />
          <span>Your Library</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          className="create-playlist"
        >
          <img src={createPlaylistIcon} alt="Create Playlist Icon" />
          <span>Create Playlist</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          className="liked-songs"
        >
          <img src={likedSongsIcon} alt="Liked Songs Icon"/>
          <span>Liked Songs</span>
        </NavLink>
        <div className="line" />
      </nav>
    </div>
  );
};

export default Navbar;
