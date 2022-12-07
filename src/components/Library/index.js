import React from "react";
import "./styles.scss";
import { useContext, useRef } from "react";
import { songContext } from "../Contexts/songContext";
import plusIcon from "../../assets/svg/plus_icon.svg";
import heartIcon from "../../assets/svg/liked_songs.svg"

const Library = () => {
  const {
    queue,
    masterlist,
    handlePlayingAudio,
    setSongPlaying,
    setPlayStatus,
    libraryList,
    setLibraryList,
  } = useContext(songContext);

  const libraryRef = useRef();

  const handleDoubleClick = (song) => {
    handlePlayingAudio(song.audioSrc);
    setSongPlaying(song);
    setPlayStatus(true);
  };

  const handleSearch = (val) => {
    if (val) {
      setLibraryList(libraryList.filter((item) => item.songName.includes(val)));
      libraryRef.current.forceUpdate();
    } else {
      setLibraryList(masterlist);
      libraryRef.current.forceUpdate();
    }
  };

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
            <button></button>
          </div>
          <div className="btn-container">
              <button title="Add To Queue">
                <img
                  src={plusIcon}
                  alt="Add To Playlist Icon"
                  className="btn"
                />
              </button>
              <button title="Like Song">
                <img
                  src={heartIcon}
                  alt="Add To Playlist Icon"
                  className="btn"
                />
              </button>
            </div>
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
    <div className="library-page">
      <div className="library-title">
        <h1>Your Library</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className="songlist" ref={libraryRef}>
        <div className="description">
          <div className="number">#</div>
          <div className="title">TITLE</div>
          <div className="album">ALBUM</div>
          <div className="date-added">DATE ADDED</div>
        </div>
        {generateSongs(libraryList)}
      </div>
    </div>
  );
};

export default Library;
