import React from "react";
import { Link, NavLink } from "react-router-dom";
import songifyLogo from "../../assets/img/main_logo.png";
import "./styles.scss";
import createPlaylistIcon from "../../assets/svg/create_playlist.svg";
import homeIcon from "../../assets/svg/home.svg";
import searchIcon from "../../assets/svg/search.svg";
import libraryIcon from "../../assets/svg/library.svg";
import likedSongsIcon from "../../assets/svg/liked_songs.svg";
import { songContext } from "../Contexts/songContext";
import { useContext } from "react";
import uploadIcon from "../../assets/svg/upload.svg";
const Navbar = () => {
  const { songPlaying } = useContext(songContext);
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
          to="/library"
          className="library"
        >
          <img src={libraryIcon} alt="Library Icon" />
          <span>Your Library</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/likes"
          className="liked-songs"
        >
          <img src={likedSongsIcon} alt="Liked Songs Icon" />
          <span>Liked Songs</span>
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/upload"
          className="upload-songs"
        >
          <img src={uploadIcon} alt="Upload Songs Icon" />
          <span>Upload Song</span>
        </NavLink>
        <div className="line" />
      </nav>
      <img
        className="album-cover"
        src={
          songPlaying.albumArtSrc
            ? songPlaying.albumArtSrc
            : "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="
        }
        alt="Current Song Album Cover"
      />
    </div>
  );
};

export default Navbar;
