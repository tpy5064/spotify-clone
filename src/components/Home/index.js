import React from "react";
import "./styles.scss";
import { useContext } from "react";
import { songContext } from "../Contexts/songContext";

const Home = () => {
  const {
    queue,
    songPlaying,
    setSongPlaying,
    setPlayStatus,
    handlePlayingAudio,
    masterlist,
    currentList,
    setCurrentList,
    updateRecents
  } = useContext(songContext);

  function generateSongs(playlist, isQueue = false) {
    let songs = [];
    for (let i = 0; i < playlist.length; i++) {
      songs.push(
        <div
          className="song"
          key={i}
          onClick={() => {
            setSongPlaying(playlist[i]);
            handlePlayingAudio(playlist[i].audioSrc);
            setPlayStatus(true);
            isQueue ? setCurrentList(queue) : setCurrentList(masterlist);
          }}
        >
          <img src={playlist[i].albumArtSrc}></img>
          <p>{playlist[i].songName}</p>
          <p>{playlist[i].artistName}</p>
        </div>
      );
    }
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
        <div className="queue">
          <span>Your Queue</span>
          <div className="song-container">
            {queue.length > 0 ? (
              generateSongs(queue, true)
            ) : (
              <h2 className="queue-empty">Your queue is currently empty!</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
