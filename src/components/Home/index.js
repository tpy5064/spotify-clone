import React from "react";
import "./styles.scss";

const Home = ({ masterlist, playSong }) => {
  function generateSongs(playlist) {
    let songs = [];
    playlist.forEach((list) => {
      list.forEach((item) => {
        songs.push(
          <div className="song" onDoubleClick={() => {playSong(item.audioSrc)}}>
            <img src={item.albumArtSrc} audioSrc={item.audioSrc}></img>
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
          <div className="song-container">
            {generateSongs(masterlist)}
          </div>
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
