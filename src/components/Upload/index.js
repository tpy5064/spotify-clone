import React from "react";
import "./styles.scss";
import { songContext } from "../Contexts/songContext";
import { useRef, useContext } from "react";

const Upload = () => {
  const uploadSongName = useRef();
  const uploadArtistName = useRef();
  const uploadAlbumName = useRef();
  const uploadAudioSrc = useRef();
  const uploadAlbumArtSrc = useRef();
  const uploadLyricsSrc = useRef();

  const { masterlist, setMasterlist, libraryList, setLibraryList } =
    useContext(songContext);

  function createSong(
    songName,
    artistName,
    albumName,
    audioSrc,
    albumArtSrc = "",
    lyricsSrc = ""
  ) {
    return {
      songName: songName,
      artistName: artistName,
      albumName: albumName,
      audioSrc: audioSrc,
      lyricsSrc: lyricsSrc,
      albumArtSrc: albumArtSrc,
      dateAdded: today(),
    };
  }

  function today() {
    const tdy = new Date();
    const year = tdy.getFullYear();
    let month = tdy.getMonth() + 1;
    let day = tdy.getDate();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const formatted = month + "/" + day + "/" + year;
    return formatted;
  }

  const handleSubmit = () => {
    console.log(URL.createObjectURL(uploadAudioSrc.current.files[0]));

    const createdSong = createSong(
      uploadSongName.current.value,
      uploadArtistName.current.value,
      uploadAlbumName.current.value,
      URL.createObjectURL(uploadAudioSrc.current.files[0]),
      URL.createObjectURL(uploadAlbumArtSrc.current.files[0]),
      URL.createObjectURL(uploadLyricsSrc.current.files[0])
    );
    console.log(createdSong);
    setLibraryList([...libraryList, createdSong]);
  };

  return (
    <div className="upload-page">
      <div className="upload-title">
        <h1>Upload Song</h1>
      </div>
      <div className="upload-section">
        <form
          className="upload-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="text-input-area">
            <label>Song Name</label>
            <br />
            <input
              type="text"
              className="text-input"
              ref={uploadSongName}
              required
            />
            <br />
            <label>Artist Name</label>
            <br />
            <input
              type="text"
              className="text-input"
              ref={uploadArtistName}
              required
            />
            <br />
            <label>Album Name</label>
            <br />
            <input
              type="text"
              className="text-input"
              ref={uploadAlbumName}
              required
            />
          </div>
          <div className="file-upload-area">
            <label className="file-upload">
              <input type="file" ref={uploadAudioSrc} required />
              Audio Source
            </label>
            <br />

            <label className="file-upload">
              <input type="file" ref={uploadAlbumArtSrc} />
              Album Art
            </label>
            <br />

            <label className="file-upload">
              <input type="file" ref={uploadLyricsSrc} />
              Lyrics
            </label>
            <br />
            <input type="submit" value="Upload Song" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
