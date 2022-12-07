import React from "react";
import "./styles.scss";
import { useContext, useRef } from "react";
import { songContext } from "../Contexts/songContext";
import plusIcon from "../../assets/svg/plus_icon.svg";
import heartIcon from "../../assets/svg/liked_songs.svg";

const Library = () => {
  const {
    queue,
    setQueue,
    likedList,
    setLikedList,
    masterlist,
    handlePlayingAudio,
    setSongPlaying,
    setPlayStatus,
    libraryList,
    setLibraryList,
    currentList,
    setCurrentList,
    updateRecents
  } = useContext(songContext);

  const libraryRef = useRef();

  const handleDoubleClick = (song) => {
    handlePlayingAudio(song.audioSrc);
    setSongPlaying(song);
    setPlayStatus(true);
    setCurrentList(libraryList);
    updateRecents(song);
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

  const handleLikeSong = (e, song) => {
    song.isLiked = true;
    console.log("liked!");
    for (let i = 0; i < likedList.length; i++) {
      if (likedList[i].songName === song.songName) return;
    }
    setLikedList([...likedList, song]);
    e.target.style.filter = "brightness(0) saturate(100%)";
    e.target.style.filter =
      "invert(43%) sepia(34%) saturate(7275%) hue-rotate(340deg) brightness(96%) contrast(91%)";
  };

  const handleAddQueue = (e, song) => {
    setQueue([...queue, song]);
    e.target.style.filter = "brightness(0) saturate(100%)";
    e.target.style.filter =
      "invert(52%) sepia(62%) saturate(568%) hue-rotate(88deg) brightness(97%) contrast(93%)";
    const p = new Promise((r) => setTimeout(r, 250));
    e.target.style.filter = "brightness(0) saturate(100%)";
    e.target.style.filter =
      "invert(89%) sepia(6%) saturate(108%) hue-rotate(325deg) brightness(86%) contrast(93%)";
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
            <button
              title="Add To Queue"
              onClick={(e) => {
                handleAddQueue(e, playlist[i]);
              }}
            >
              <img src={plusIcon} alt="Add To Playlist Icon" className="btn" />
            </button>
            <button
              title="Like Song"
              onClick={(e) => {
                handleLikeSong(e, playlist[i]);
              }}
            >
              <img
                src={heartIcon}
                alt="Add To Playlist Icon"
                className="btn"
                style={
                  playlist[i].isLiked
                    ? {
                        filter:
                          "invert(43%) sepia(34%) saturate(7275%) hue-rotate(340deg) brightness(96%) contrast(91%)",
                      }
                    : {}
                }
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
