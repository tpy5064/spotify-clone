import React from "react";
import "./styles.scss";

const Home = ({ masterlist, onPlaySong }) => {
  function generateSongs(playlist) {
    let songs = [];
    playlist.forEach((list) => {
      list.forEach((item) => {
        songs.push(
          <div
            className="song"
            onDoubleClick={() => {
              onPlaySong(item.audioSrc);
            }}
          >
            <img src={item.albumArtSrc}></img>
            <p>{item.songName}</p>
            <p>{item.artistName}</p>
          </div>
        );
      });
    });
    return songs;
  }

  return (
    <div className="home-page">
      <div className="home-title">
        <h1>Welcome to Songify</h1>
      </div>
      <div className="recents">
        <div className="recent-songs">
          <span>Your Recent Songs</span>
          <div className="song-container">{generateSongs(masterlist)}</div>
        </div>
        <div className="created-playlists">
          <span>Your Playlists</span>
          <div className="playlist-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
