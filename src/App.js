import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { useState, useRef, useEffect } from "react";
import sth from "./assets/songs/Stairway_to_Heaven.mp3";
import Home from "./components/Home";
import dirwk from "./assets/songs/Do I Really Wanna Know.mp3";
import sugar from "./assets/songs/Sugar-Maroon5.mp3";
import STHART from "./assets/albumart/Stairway_to_Heaven.jpg";
import DIRWKART from "./assets/albumart/Do I Really Wanna Know.jpg";
import SUGARART from "./assets/albumart/Sugar-Maroon5.jpg";

function createSong(
  songName,
  artistName,
  audioSrc,
  albumArtSrc = "",
  lyricsSrc = ""
) {
  this.songName = songName;
  this.artistName = artistName;
  this.audioSrc = audioSrc;
  this.lyricsSrc = lyricsSrc;
  this.albumArtSrc = albumArtSrc;
}

let rockPlaylist = [
  {
    songName: "Stairway to Heaven",
    artistName: "Led Zeppelin",
    audioSrc: sth,
    lyricsSrc: "../../assets/lyrics/Stairway_to_heaven.txt",
    albumArtSrc: STHART,
  },
  {
    songName: "Do I Really Wanna Know",
    artistName: "Arctic Monkeys",
    audioSrc: dirwk,
    lyricsSrc: "../../assets/songs/Do I Really Wanna Know.txt",
    albumArtSrc: DIRWKART,
  },
];

let popPlaylist = [
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    audioSrc: sugar,
    lyricsSrc: "../../assets/lyrics/Sugar-Maroon5.txt",
    albumArtSrc: SUGARART,
  },
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    audioSrc: sugar,
    lyricsSrc: "../../assets/lyrics/Sugar-Maroon5.txt",
    albumArtSrc: SUGARART,
  },
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    audioSrc: sugar,
    lyricsSrc: "../../assets/lyrics/Sugar-Maroon5.txt",
    albumArtSrc: SUGARART,
  },
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    audioSrc: sugar,
    lyricsSrc: "../../assets/lyrics/Sugar-Maroon5.txt",
    albumArtSrc: SUGARART,
  },
  {
    songName: "Sugar",
    artistName: "Maroon 5",
    audioSrc: sugar,
    lyricsSrc: "../../assets/lyrics/Sugar-Maroon5.txt",
    albumArtSrc: SUGARART,
  },
];

let playlist = [rockPlaylist, popPlaylist];

function App() {
  const [playStatus, setPlayStatus] = useState(false);
  const [playPercentage, setPlayPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [homeSongPlayed, setHomeSongPlayed] = useState("");

  function handlePlayClick() {
    console.log(playStatus);
    setPlayStatus(!playStatus);
    console.log(playStatus);
  }

  function handleHomeSongPlayed(audioSrc) {
    setHomeSongPlayed(audioSrc);
    setPlayStatus(true);
  }

  const songRef = useRef();
  useEffect(() => { songRef.current.play(); }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              setPlayPause={handlePlayClick}
              playStatus={playStatus}
              playlist={playlist}
              homeSongPlayed={homeSongPlayed}
            />
          }
        >
          <Route
            index
            element={
              <Home masterlist={playlist} onPlaySong={handleHomeSongPlayed} />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
