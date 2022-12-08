import React from "react";
import "./styles.scss";
import { useContext, useRef, useState } from "react";
import { songContext } from "../Contexts/songContext";
//import crossIcon from "../../assets/svg/cross.svg";

const Likes = () => {
  const {
    likedList,
    setLikedList,
    handlePlayingAudio,
    setSongPlaying,
    setPlayStatus,
    setCurrentList,
  } = useContext(songContext);

  //const likedRef = useRef();

  const handleDoubleClick = (song) => {
    handlePlayingAudio(song.audioSrc);
    setSongPlaying(song);
    setPlayStatus(true);
    setCurrentList(likedList);
  };

  // const handleRemove = (e, song) => {
  //   e.preventDefault();
  //   song.isLiked = false;
  //   for (let i = 0; i < likedList.length; i++) {
  //     if (likedList[i].songName === song.songName) {
  //       setLikedList(
  //         likedList.filter((item) => item.songName === song.songName)
  //       );
  //     }
  //   }
  //   likedRef.current.forceUpdate();
  // };

  const generateSongs = (playlist) => {
    let songs = [];
    for (let i = 0; i < playlist.length; i++) {
      songs.push(
        <div
          className="song"
          key={i}
          onDoubleClick={() => {
            handleDoubleClick(playlist[i]);
          }}
        >
          <div className="song-num">
            <span>{i + 1}</span>
          </div>
          <div className="song-info">
            <img src={playlist[i].albumArtSrc} />
            <div className="text-info">
              <p className="song-title">{playlist[i].songName}</p>
              <p className="artist">{playlist[i].artistName}</p>
            </div>
          </div>
          {/* <div className="btn-container">
            <button
              className="btn"
              title="Remove Like"
              onClick={(e) => {
                handleRemove(e, playlist[i]);
              }}
            >
              <img src={crossIcon} alt="Remove Liked Song Icon" />
            </button>
          </div> */}
          <div className="song-album">
            <span>{playlist[i].albumName}</span>
          </div>
          <div className="song-date">
            <span>{playlist[i].dateAdded}</span>
          </div>
        </div>
      );
    }
    return songs;
  };

  return (
    <div className="liked-page">
      <div className="liked-title">
        <h1>Your Liked Songs</h1>
      </div>
      <div className="songlist">
        <div className="description">
          <div className="number">#</div>
          <div className="title">TITLE</div>
          <div className="album">ALBUM</div>
          <div className="date-added">DATE ADDED</div>
        </div>
        {likedList.length > 0 ? (
          generateSongs(likedList)
        ) : (
          <h2 className="no-liked">Your Liked List is Currently Empty!</h2>
        )}
      </div>
    </div>
  );
};

export default Likes;
